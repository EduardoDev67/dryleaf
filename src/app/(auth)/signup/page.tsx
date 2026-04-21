/**
 * PAGINA DE CADASTRO
 * ==================
 */

import { SignupForm } from '@/components/auth/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dryleaf-green-50 to-dryleaf-yellow-50 p-4">
      <SignupForm />
    </div>
  )
}
