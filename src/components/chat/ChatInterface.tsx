/**
 * INTERFACE DE CHAT
 * =================
 * Componente completo de chat com historico e input.
 */

'use client'

import { useRef, useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import { ChatInputWithVoice } from './ChatInputWithVoice'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Leaf } from 'lucide-react'

export function ChatInterface() {
  const { messages, loading, sendMessage } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-white">
      <div className="p-4 border-b bg-dryleaf-green text-white rounded-t-lg">
        <div className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-dryleaf-yellow" />
          <h2 className="font-semibold">Assistente DryLeaf</h2>
        </div>
        <p className="text-sm text-white/80">
          Tire suas duvidas sobre nutricao e saude
        </p>
      </div>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Leaf className="w-12 h-12 mx-auto mb-4 text-dryleaf-green/50" />
            <p>Ola! Sou seu assistente de nutricao.</p>
            <p className="text-sm mt-2">
              Pergunte sobre alimentacao, dietas ou saude.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <Avatar className={message.role === 'assistant' ? 'bg-dryleaf-green' : 'bg-gray-200'}>
                  <AvatarFallback className={message.role === 'assistant' ? 'text-white' : ''}>
                    {message.role === 'assistant' ? '🌿' : '👤'}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-dryleaf-green text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <Avatar className="bg-dryleaf-green">
                  <AvatarFallback className="text-white">🌿</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-dryleaf-green rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-dryleaf-green rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-dryleaf-green rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <ChatInputWithVoice onSend={sendMessage} disabled={loading} />
    </div>
  )
}
