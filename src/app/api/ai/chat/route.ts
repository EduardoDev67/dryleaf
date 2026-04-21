/**
 * API ROUTE: CHAT COM IA
 * ======================
 * Recebe mensagem do usuario e retorna resposta da IA.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { chatWithAI } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      )
    }

    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem invalida' },
        { status: 400 }
      )
    }

    // Verifica limite de mensagens para plano free
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan_type')
      .eq('id', session.user.id)
      .single()

    if (profile?.plan_type === 'free') {
      const { count } = await supabase
        .from('chat_messages')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', session.user.id)
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())

      if (count && count >= 5) {
        return NextResponse.json(
          { error: 'Limite diario atingido. Assine o Premium para mensagens ilimitadas.' },
          { status: 403 }
        )
      }
    }

    const { data: history } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    const formattedHistory = (history || []).reverse().map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.content,
    }))

    const response = await chatWithAI(message, formattedHistory)

    await supabase.from('chat_messages').insert([
      {
        user_id: session.user.id,
        content: message,
        role: 'user',
      },
      {
        user_id: session.user.id,
        content: response,
        role: 'assistant',
      },
    ])

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Erro no chat:', error)
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    )
  }
}
