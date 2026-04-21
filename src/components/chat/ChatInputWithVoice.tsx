/**
 * INPUT DE CHAT COM VOZ
 * =====================
 * Componente de input que permite digitar ou falar.
 */

'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { Mic, MicOff, Send } from 'lucide-react'

interface ChatInputWithVoiceProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInputWithVoice({ onSend, disabled }: ChatInputWithVoiceProps) {
  const [inputValue, setInputValue] = useState('')
  const { isListening, transcript, startListening, stopListening, supported } = useVoiceInput()

  useEffect(() => {
    if (transcript) {
      setInputValue(prev => prev + transcript)
    }
  }, [transcript])

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t bg-white">
      <div className="flex-1 relative">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta..."
          disabled={disabled || isListening}
          className="pr-12"
        />

        {isListening && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>

      {supported && (
        <Button
          type="button"
          variant={isListening ? 'destructive' : 'outline'}
          size="icon"
          onClick={isListening ? stopListening : startListening}
          disabled={disabled}
          className={isListening ? 'animate-pulse' : ''}
        >
          {isListening ? (
            <MicOff className="h-4 w-4" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}

      <Button
        onClick={handleSend}
        disabled={disabled || !inputValue.trim() || isListening}
        className="bg-dryleaf-green hover:bg-dryleaf-green-dark"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
