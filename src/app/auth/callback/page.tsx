/**
 * AUTH CALLBACK
 * ===============
 * Pagina de callback apos confirmacao de email ou OAuth.
 * Redireciona para o dashboard apos processar o token.
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: { code?: string; next?: string }
}) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect(searchParams.next || '/dashboard')
  }

  // Se nao tem sessao, tenta trocar o code por sessao
  if (searchParams.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code)

    if (!error) {
      redirect(searchParams.next || '/dashboard')
    }
  }

  // Se chegou aqui, algo deu errado
  redirect('/login?error=auth')
}
