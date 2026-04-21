/**
 * HEADER
 * ======
 * Cabecalho moderno com navegacao e menu do usuario.
 * Design responsivo com animacoes suaves.
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import {
  Leaf,
  Menu,
  X,
  User,
  LogOut,
  Home,
  MessageSquare,
  Utensils,
  CreditCard,
  Crown
} from 'lucide-react'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dieta', label: 'Minha Dieta', icon: Utensils },
  { href: '/chat', label: 'Chat IA', icon: MessageSquare },
]

export function Header() {
  const { user, signOut } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [planType, setPlanType] = useState<string>('free')

  // Detect scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Busca o plano do usuário
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const { data } = await supabase
          .from('profiles')
          .select('plan_type')
          .eq('id', user.id)
          .single()
        if (data) {
          setPlanType(data.plan_type || 'free')
        }
      }
    }
    fetchProfile()
  }, [user])

  const getPlanLabel = () => {
    if (planType === 'pro') return { label: 'Pro', color: 'bg-dryleaf-yellow text-dryleaf-green' }
    if (planType === 'premium') return { label: 'Premium', color: 'bg-blue-500 text-white' }
    return { label: 'Free', color: 'bg-gray-200 text-gray-700' }
  }

  const plan = getPlanLabel()

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-md border-b border-dryleaf-green-100'
          : 'bg-dryleaf-green text-white'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-all ${
              scrolled ? 'bg-dryleaf-green group-hover:bg-dryleaf-green-dark' : 'bg-white'
            }`}
            >
              <Leaf className={`w-5 h-5 transition-colors ${
                scrolled ? 'text-white' : 'text-dryleaf-green'
              }`} />
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold text-xl transition-colors ${
                scrolled ? 'text-dryleaf-green' : 'text-white'
              }`}>
                DryLeaf
              </span>
              {planType !== 'free' && (
                <Badge className={`${plan.color} text-xs font-semibold`}>
                  <Crown className="w-3 h-3 mr-1" />
                  {plan.label}
                </Badge>
              )}
            </div>
          </Link>

          {/* Navegacao Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    scrolled
                      ? isActive
                        ? 'bg-dryleaf-green-100 text-dryleaf-green font-medium'
                        : 'text-gray-600 hover:bg-dryleaf-green-50 hover:text-dryleaf-green'
                      : isActive
                        ? 'bg-white/20 text-white font-medium'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Menu do Usuario */}
          <div className="flex items-center gap-2">
            {/* Upgrade Button - apenas para free */}
            {planType === 'free' && (
              <Link href="/pricing" className="hidden sm:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`items-center gap-1.5 ${
                    scrolled ? 'text-dryleaf-yellow hover:bg-dryleaf-yellow/10' : 'text-dryleaf-yellow hover:bg-white/10'
                  }`}
                >
                  <Crown className="w-4 h-4" />
                  Upgrade
                </Button>
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`relative h-10 w-10 rounded-full p-0 ${
                  scrolled ? 'hover:bg-dryleaf-green-100' : 'hover:bg-white/10'
                }`}
              >
                <Avatar className="h-9 w-9 border-2 border-dryleaf-yellow">
                  <AvatarFallback className={`font-semibold ${
                    scrolled ? 'bg-dryleaf-green text-white' : 'bg-dryleaf-yellow text-dryleaf-green'
                  }`}
                  >
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-dryleaf-green text-white font-semibold"
                    >
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm font-medium truncate max-w-[160px]">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {planType === 'free' ? 'Plano Free' : `Plano ${plan.label}`}
                    </p>
                  </div>
                </div>

                <Link href="/perfil" className="flex items-center">
                  <DropdownMenuItem className="cursor-pointer py-2.5">
                    <User className="mr-2 h-4 w-4 text-dryleaf-green" />
                    Meu Perfil
                  </DropdownMenuItem>
                </Link>

                <Link href="/pricing" className="flex items-center">
                  <DropdownMenuItem className="cursor-pointer py-2.5">
                    <CreditCard className="mr-2 h-4 w-4 text-dryleaf-green" />
                    Assinatura
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer text-red-600 py-2.5 focus:text-red-600"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair da conta
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu Mobile Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${scrolled ? 'hover:bg-dryleaf-green-100' : 'hover:bg-white/10'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className={`h-5 w-5 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <Menu className={`h-5 w-5 ${scrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className={`py-4 border-t ${
            scrolled ? 'border-gray-100' : 'border-white/20'
          }`}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      scrolled
                        ? isActive
                          ? 'bg-dryleaf-green-100 text-dryleaf-green font-medium'
                          : 'text-gray-700 hover:bg-dryleaf-green-50'
                        : isActive
                          ? 'bg-white/20 text-white font-medium'
                          : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
              {planType === 'free' && (
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    scrolled
                      ? 'text-dryleaf-green hover:bg-dryleaf-green-50 font-medium'
                      : 'text-dryleaf-yellow hover:bg-white/10 font-medium'
                  }`}
                >
                  <Crown className="w-5 h-5" />
                  Fazer Upgrade
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
