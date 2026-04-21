/**
 * PAGINA DE LOGIN
 * ===============
 * Server Component que renderiza o formulario de login.
 */

import { LoginForm } from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dryleaf-green-50 to-dryleaf-yellow-50 p-4">
      <LoginForm />
    </div>
  )
}
