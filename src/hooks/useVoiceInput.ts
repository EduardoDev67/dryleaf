/**
 * HOOK DE ENTRADA DE VOZ
 * =======================
 * Hook que usa Web Speech API para transcrever audio em texto.
 */

'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

interface UseVoiceInputReturn {
  isListening: boolean
  transcript: string
  startListening: () => void
  stopListening: () => void
  error: string | null
  supported: boolean
}

export function useVoiceInput(): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [supported, setSupported] = useState(true)

  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSupported(false)
      setError('Seu navegador nao suporta reconhecimento de voz.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'pt-BR'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript
        } else {
          interimTranscript += transcript
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript)
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Erro de reconhecimento:', event.error)
      setError(`Erro: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  const startListening = useCallback(() => {
    if (!recognitionRef.current || !supported) return

    setError(null)
    setTranscript('')

    try {
      recognitionRef.current.start()
      setIsListening(true)
    } catch (err) {
      console.error('Erro ao iniciar:', err)
    }
  }, [supported])

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return

    recognitionRef.current.stop()
    setIsListening(false)
  }, [])

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    error,
    supported,
  }
}

// Type definitions for Web Speech API
interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
  item(index: number): SpeechRecognitionResult
}

interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent {
  error: string
}

interface SpeechRecognition {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
  start(): void
  stop(): void
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor
    webkitSpeechRecognition: SpeechRecognitionConstructor
  }
}
