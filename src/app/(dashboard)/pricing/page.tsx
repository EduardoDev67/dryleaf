/**
 * PAGINA DE PRECOS
 * ================
 */

import { PricingCards } from '@/components/pricing/PricingCards'

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Escolha seu Plano</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comece gratuitamente e evolua conforme suas necessidades.
          Cancele a qualquer momento.
        </p>
      </div>

      <PricingCards />
    </div>
  )
}
