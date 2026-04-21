/**
 * FORMULARIO DE CADASTRO
 * ======================
 * Componente moderno e responsivo para tela de signup.
 * Design profissional com validacao em tempo real.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Loader2, Leaf, ArrowRight, Mail, Lock, User, Check, CheckCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export function SignupForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState('')
  const { signUp, loading, error } = useAuth()
  const router = useRouter()

  // Password strength calculation
  const getPasswordStrength = () => {
    let strength = 0
    if (password.length >= 6) strength += 25
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25
    return strength
  }

  const getStrengthColor = () => {
    const strength = getPasswordStrength()
    if (strength <= 25) return 'bg-red-500'
    if (strength <= 50) return 'bg-yellow-500'
    if (strength <= 75) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError('')

    if (password !== confirmPassword) {
      setValidationError('As senhas não coincidem')
      return
    }

    if (password.length < 6) {
      setValidationError('A senha deve ter pelo menos 6 caracteres')
      return
    }

    await signUp(email, password, fullName)
    if (!error) {
      router.push('/login?registered=true')
    }
  }

  const passwordRequirements = [
    { label: 'Mínimo 6 caracteres', met: password.length >= 6 },
    { label: 'Letra maiúscula', met: /[A-Z]/.test(password) },
    { label: 'Número ou símbolo', met: /[0-9!@#$%^&*]/.test(password) },
  ]

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl shadow-dryleaf-green/5 border border-dryleaf-green-100 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-dryleaf-green to-dryleaf-green-dark p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-dryleaf-yellow" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Criar conta
          </h1>
          <p className="text-white/80">
            Comece sua jornada de saúde hoje mesmo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Error Alert */}
          {(error || validationError) && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error || validationError}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-5">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-700 font-medium">
                Nome completo
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-dryleaf-green transition-colors" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="João Silva"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-dryleaf-green focus:ring-dryleaf-green/20 transition-all"
                />
              </div>
            </div>

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
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Senha
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-dryleaf-green transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="pl-11 pr-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-dryleaf-green focus:ring-dryleaf-green/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {password && (
                <div className="space-y-2 animate-fade-in">
                  <Progress
                    value={getPasswordStrength()}
                    className={`h-1 ${getStrengthColor()}`}
                  />
                  <ul className="space-y-1">
                    {passwordRequirements.map((req, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
                          req.met ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        <Check className={`w-3 h-3 transition-opacity ${req.met ? 'opacity-100' : 'opacity-0'}`} />
                        {req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                Confirmar senha
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-dryleaf-green transition-colors" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className={`pl-11 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-dryleaf-green/20 transition-all ${
                    confirmPassword && password !== confirmPassword
                      ? 'border-red-300 focus:border-red-500'
                      : confirmPassword && password === confirmPassword
                        ? 'border-green-300 focus:border-green-500'
                        : 'focus:border-dryleaf-green'
                  }`}
                />
                {confirmPassword && password === confirmPassword && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500">As senhas não coincidem</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-dryleaf-green focus:ring-dryleaf-green cursor-pointer"
              />
              <Label htmlFor="terms" className="text-sm text-gray-600 font-normal leading-relaxed cursor-pointer">
                Concordo com os{' '}
                <Link href="#" className="text-dryleaf-green hover:underline">Termos de Uso</Link>{' '}
                e{' '}
                <Link href="#" className="text-dryleaf-green hover:underline">Política de Privacidade</Link>
              </Label>
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
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta gratuita
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
              Já tem conta?{' '}
              <Link
                href="/login"
                className="text-dryleaf-green font-semibold hover:text-dryleaf-green-dark hover:underline"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-3">✓ Setup em 2 minutos • ✓ Cancele quando quiser</p>
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
