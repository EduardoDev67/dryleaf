/**
 * CLIENTE SUPABASE PARA O SERVIDOR
 * ================================
 * Cliente Supabase que roda no servidor.
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Verifica se esta em ambiente de build/static generation
const isBuildTime = () => {
  return process.env.NEXT_PHASE === 'phase-production-build' ||
         process.env.CI === 'true' && !process.env.VERCEL_ENV
}

export async function createClient() {
  // Durante o build, retorna um cliente mock que nao depende de cookies
  if (isBuildTime()) {
    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'anon',
      {
        cookies: {
          get() { return undefined },
          set() {},
          remove() {},
        },
      }
    )
  }

  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
