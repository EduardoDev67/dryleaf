/**
 * CONFIGURACAO STRIPE
 * ===================
 * Cliente Stripe para processar pagamentos.
 */

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

export const STRIPE_PRICES = {
  premium: process.env.STRIPE_PRICE_PREMIUM!,
  pro: process.env.STRIPE_PRICE_PRO!,
}

export const PRICE_TO_PLAN: Record<string, string> = {
  [STRIPE_PRICES.premium]: 'premium',
  [STRIPE_PRICES.pro]: 'pro',
}
