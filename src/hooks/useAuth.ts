/**
 * HOOK DE AUTENTICACAO
 * ====================
 * Hook personalizado do React para gerenciar login/logout.
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: string, session: { user: any } | null) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      const errorMessages: Record<string, string> = {
        'Invalid login credentials': 'Email ou senha incorretos',
        'Email not confirmed': 'Confirme seu email antes de entrar',
      }
      setError(errorMessages[error.message] || error.message)
    }

    setLoading(false)
  }, [supabase])

  const signUp = useCallback(async (email: string, password: string, fullName: string) => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined,
      },
    })

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }, [supabase])

  const signOut = useCallback(async () => {
    setLoading(true)
    await supabase.auth.signOut()
    setLoading(false)
  }, [supabase])

  const resetPassword = useCallback(async (email: string) => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/auth/reset-password` : undefined,
    })

    if (error) {
      setError(error.message)
    }

    setLoading(false)
  }, [supabase])

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }
}
