/**
 * CARDS DE PRECOS
 * ===============
 * Exibe planos disponiveis com design moderno e profissional.
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Loader2, Sparkles } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '0',
    period: '/mês',
    description: 'Comece sua jornada de saúde',
    features: [
      'Chat com IA (5 msgs/dia)',
      'Dicas de nutrição diárias',
      'Calculadora de IMC',
      'Blog e conteúdos',
    ],
    plan: 'free',
    buttonText: 'Começar Grátis',
    buttonVariant: 'outline' as const,
  },
  {
    name: 'Premium',
    price: '29',
    period: '/mês',
    description: 'Dietas personalizadas com IA',
    features: [
      'Tudo do Free',
      'Dietas ilimitadas com IA',
      'Chat ilimitado 24/7',
      'Progresso semanal',
      'Exportar dietas em PDF',
      'Suporte por email',
    ],
    plan: 'premium',
    buttonText: 'Assinar Premium',
    buttonVariant: 'default' as const,
    popular: true,
  },
  {
    name: 'Pro',
    price: '59',
    period: '/mês',
    description: 'Tudo + WhatsApp + Prioritário',
    features: [
      'Tudo do Premium',
      'Envio de dietas por WhatsApp',
      'Lembretes diários no WhatsApp',
      'Suporte prioritário',
      'Análise de fotos de refeições',
      'Relatórios mensais detalhados',
    ],
    plan: 'pro',
    buttonText: 'Assinar Pro',
    buttonVariant: 'default' as const,
  },
]

export function PricingCards() {
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: string) => {
    if (plan === 'free') {
      window.location.href = '/signup'
      return
    }

    setLoading(plan)
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={`relative rounded-2xl p-8 transition-all duration-300 ${
            plan.popular
              ? 'bg-dryleaf-green text-white scale-105 shadow-2xl shadow-dryleaf-green/30'
              : 'bg-white border-2 border-dryleaf-green-100 hover:border-dryleaf-green-200 hover:shadow-xl'
          }`}
        >
          {plan.popular && (
            <>
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-dryleaf-yellow text-dryleaf-green font-bold text-sm px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  MAIS POPULAR
                </div>
              </div>
              {/* Shine Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            </>
          )}

          {/* Plan Header */}
          <div className="mb-6">
            <h3 className={`text-lg font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-dryleaf-green'}`}>
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-sm">R$</span>
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                {plan.period}
              </span>
            </div>
            <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'}`}>
              {plan.description}
            </p>
          </div>

          {/* Features List */}
          <ul className="space-y-4 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  plan.popular ? 'bg-dryleaf-yellow' : 'bg-dryleaf-green-100'
                }`}>
                  <Check className={`w-3 h-3 ${plan.popular ? 'text-dryleaf-green' : 'text-dryleaf-green'}`} />
                </div>
                <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          {plan.plan === 'free' ? (
            <Link href="/signup" className="block w-full">
              <Button
                variant="outline"
                className={`w-full h-12 rounded-xl font-semibold ${
                  plan.popular
                    ? 'border-2 border-white/30 text-white hover:bg-white/10'
                    : 'border-2 border-dryleaf-green text-dryleaf-green hover:bg-dryleaf-green hover:text-white'
                }`}
              >
                {plan.buttonText}
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => handleSubscribe(plan.plan)}
              disabled={!!loading}
              className={`w-full h-12 rounded-xl font-semibold transition-all ${
                plan.popular
                  ? 'bg-dryleaf-yellow text-dryleaf-green hover:bg-dryleaf-yellow-dark shadow-lg'
                  : 'bg-dryleaf-green text-white hover:bg-dryleaf-green-dark shadow-lg shadow-dryleaf-green/20'
              }`}
            >
              {loading === plan.plan ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                plan.buttonText
              )}
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
