/**
 * API ROUTE: ENVIAR WHATSAPP
 * ===========================
 * Endpoint para enviar dieta via WhatsApp.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendWhatsAppMessage, formatDietForWhatsApp } from '@/lib/twilio'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
    }

    const { dietId } = await request.json()

    const { data: profile } = await supabase
      .from('profiles')
      .select('whatsapp_number, plan_type')
      .eq('id', session.user.id)
      .single()

    if (!profile?.whatsapp_number) {
      return NextResponse.json(
        { error: 'Numero de WhatsApp nao configurado' },
        { status: 400 }
      )
    }

    if (profile.plan_type !== 'pro') {
      return NextResponse.json(
        { error: 'Recurso disponivel apenas no plano Pro' },
        { status: 403 }
      )
    }

    const { data: diet } = await supabase
      .from('diets')
      .select('*')
      .eq('id', dietId)
      .single()

    if (!diet) {
      return NextResponse.json({ error: 'Dieta nao encontrada' }, { status: 404 })
    }

    const message = formatDietForWhatsApp(diet)
    const result = await sendWhatsAppMessage(profile.whatsapp_number, message)

    await supabase.from('whatsapp_logs').insert({
      user_id: session.user.id,
      diet_id: dietId,
      message_type: 'daily_plan',
      content: message,
      status: result.success ? 'sent' : 'failed',
      twilio_message_sid: result.messageSid,
      error_message: result.error,
      sent_at: result.success ? new Date().toISOString() : null,
    })

    if (!result.success) {
      return NextResponse.json(
        { error: 'Falha ao enviar mensagem: ' + result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, messageSid: result.messageSid })

  } catch (error) {
    console.error('Erro:', error)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
