/**
 * LAYOUT DE AUTENTICACAO
 * ======================
 * Layout compartilhado entre paginas de login/cadastro.
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="auth-layout">
      {children}
    </div>
  )
}
