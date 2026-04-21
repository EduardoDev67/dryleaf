/**
 * DASHBOARD
 * =========
 * Pagina principal do usuario autenticado.
 */

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Leaf, Utensils, MessageSquare, Droplets, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  // Busca perfil e dieta ativa
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session!.user.id)
    .single()

  const { data: activeDiet } = await supabase
    .from('diets')
    .select('*')
    .eq('user_id', session!.user.id)
    .eq('is_active', true)
    .single()

  const planLabels: Record<string, string> = {
    free: 'Free',
    premium: 'Premium',
    pro: 'Pro',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ola, {profile?.full_name?.split(' ')[0] || 'Visitante'}! 👋
          </h1>
          <p className="text-gray-600">
            Bem-vindo de volta ao seu acompanhamento de saude.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-dryleaf-yellow text-dryleaf-green text-sm font-medium rounded-full">
            Plano {planLabels[profile?.plan_type || 'free']}
          </span>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calorias Hoje
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-dryleaf-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeDiet?.daily_calories || 0}
            </div>
            <p className="text-xs text-gray-500">
              Meta diaria
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consumo de Agua
            </CardTitle>
            <Droplets className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/8</div>
            <p className="text-xs text-gray-500">
              copos
            </p>
            <Progress value={50} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Progresso
            </CardTitle>
            <Leaf className="h-4 w-4 text-dryleaf-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-gray-500">
              Esta semana
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Secao Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dieta Atual */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-dryleaf-green" />
              Sua Dieta Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeDiet ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{activeDiet.title}</h3>
                  <p className="text-gray-600">{activeDiet.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-500">Calorias</span>
                    <p className="font-semibold">{activeDiet.daily_calories} kcal</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-500">Proteinas</span>
                    <p className="font-semibold">{activeDiet.macros?.protein}g</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-500">Carboidratos</span>
                    <p className="font-semibold">{activeDiet.macros?.carbs}g</p>
                  </div>
                  <div className="bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-500">Gorduras</span>
                    <p className="font-semibold">{activeDiet.macros?.fats}g</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link href={`/dieta/${activeDiet.id}`}>
                    <Button className="bg-dryleaf-green hover:bg-dryleaf-green-dark">
                      Ver Dieta Completa
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-4">
                  Voce ainda nao tem uma dieta ativa.
                </p>
                {profile?.plan_type !== 'free' ? (
                  <Link href="/dieta">
                    <Button className="bg-dryleaf-green hover:bg-dryleaf-green-dark">
                      Criar Minha Dieta
                    </Button>
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Assine o plano Premium para gerar dietas personalizadas.
                    </p>
                    <Link href="/pricing">
                      <Button variant="outline">Ver Planos</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Chat Rapido */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-dryleaf-green" />
              Assistente IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Tire suas duvidas sobre nutricao e saude com nosso assistente virtual.
            </p>
            <Link href="/chat" className="w-full">
              <Button variant="outline" className="w-full">Iniciar Conversa</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
