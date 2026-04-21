/**
 * HOOK DE CHAT
 * ============
 * Gerencia estado do chat e comunicacao com API.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { ChatMessage } from '@/types'

export function useChat() {
  const supabase = createClient()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadMessages = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: true })
        .limit(50)

      if (error) {
        console.error('Erro ao carregar mensagens:', error)
        return
      }

      setMessages(data || [])
    }

    loadMessages()
  }, [supabase])

  const sendMessage = useCallback(async (content: string) => {
    setLoading(true)
    setError(null)

    try {
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        user_id: '',
        content,
        role: 'user',
        context: null,
        created_at: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])

      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      })

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem')
      }

      const data = await response.json()

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user_id: '',
        content: data.response,
        role: 'assistant',
        context: null,
        created_at: new Date().toISOString(),
      }

      setMessages(prev => [...prev, aiMessage])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  return {
    messages,
    loading,
    error,
    sendMessage,
  }
}
