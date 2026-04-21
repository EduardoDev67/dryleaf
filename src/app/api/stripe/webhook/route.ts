/**
 * WEBHOOK STRIPE
 * ==============
 * Recebe eventos do Stripe.
 */

import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_TO_PLAN } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook error:', err.message)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object

      const userId = session.metadata?.user_id
      const subscriptionId = session.subscription as string

      if (userId && subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const priceId = subscription.items.data[0].price.id
        const planType = PRICE_TO_PLAN[priceId]

        if (planType) {
          await supabase
            .from('profiles')
            .update({
              plan_type: planType,
              stripe_subscription_id: subscriptionId,
            })
            .eq('id', userId)
        }
      }
      break
    }

    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      const subscription = event.data.object
      const userId = subscription.metadata?.user_id

      if (userId) {
        // Verifica se a assinatura foi cancelada
        if (subscription.status === 'canceled' || subscription.cancel_at_period_end) {
          await supabase
            .from('profiles')
            .update({
              plan_type: 'free',
              stripe_subscription_id: null,
            })
            .eq('id', userId)
        }
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
