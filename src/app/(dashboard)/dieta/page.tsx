/**
 * PAGINA DE DIETA
 * ===============
 * Listagem e geracao de dietas.
 */

import { createClient } from '@/lib/supabase/server'
import { GeradorDieta } from '@/components/dieta/GeradorDieta'
import { redirect } from 'next/navigation'

export default async function DietaPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan_type')
    .eq('id', session!.user.id)
    .single()

  if (profile?.plan_type === 'free') {
    redirect('/pricing')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <GeradorDieta />
    </div>
  )
}
