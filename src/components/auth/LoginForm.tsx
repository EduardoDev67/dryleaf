/**
 * FORMULARIO DE LOGIN
 * ===================
 * Componente moderno e responsivo para tela de login.
 * Design profissional com animacoes CSS.
 */

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Leaf, ArrowRight, Mail, Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, loading, error } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get('registered')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
    if (!error) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      {/* Success Message */}
      {registered && (
        <div className="mb-6 animate-slide-down">
          <Alert className="bg-green-50 border-green-200 text-green-800">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Conta criada com sucesso! Faça login para continuar.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl shadow-dryleaf-green/5 border border-dryleaf-green-100 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-dryleaf-green to-dryleaf-green-dark p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-dryleaf-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-white/80">
            Entre para continuar sua jornada de saúde
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-dryleaf-green transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-dryleaf-green focus:ring-dryleaf-green/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-dryleaf-green hover:text-dryleaf-green-dark hover:underline"
                >
                  Esqueceu?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-dryleaf-green transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-dryleaf-green focus:ring-dryleaf-green/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-dryleaf-green hover:bg-dryleaf-green-dark text-white font-semibold rounded-xl shadow-lg shadow-dryleaf-green/20 hover:shadow-xl hover:shadow-dryleaf-green/30 transition-all duration-300"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-8 pb-8 pt-0">
          <div className="text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Não tem conta?{' '}
              <Link
                href="/signup"
                className="text-dryleaf-green font-semibold hover:text-dryleaf-green-dark hover:underline"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-3">Seguro e confiável</p>
        <div className="flex items-center justify-center gap-4 text-gray-400">
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span>SSL Seguro</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <CheckCircle className="w-4 h-4" />
            <span>LGPD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
