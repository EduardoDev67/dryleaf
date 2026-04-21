/**
 * PAGINA DE VISUALIZACAO DE DIETA
 * ================================
 * Mostra detalhes de uma dieta especifica.
 */

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Clock, Flame, Droplets } from 'lucide-react'

export default async function DietaDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const { data: diet } = await supabase
    .from('diets')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', session!.user.id)
    .single()

  if (!diet) {
    notFound()
  }

  const diasSemana = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo']

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{diet.title}</h1>
          <p className="text-gray-600">{diet.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-dryleaf-green">
            <Flame className="w-3 h-3 mr-1" />
            {diet.daily_calories} kcal
          </Badge>
          {diet.is_active && (
            <Badge className="bg-dryleaf-green">Ativa</Badge>
          )}
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">{diet.macros?.protein}g</div>
            <p className="text-sm text-gray-500">Proteinas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-amber-600">{diet.macros?.carbs}g</div>
            <p className="text-sm text-gray-500">Carboidratos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-600">{diet.macros?.fats}g</div>
            <p className="text-sm text-gray-500">Gorduras</p>
          </CardContent>
        </Card>
      </div>

      {/* Plano Semanal */}
      <Tabs defaultValue="0" className="w-full">
        <TabsList className="grid grid-cols-7">
          {diasSemana.map((dia, index) => (
            <TabsTrigger key={index} value={index.toString()}>
              {dia}
            </TabsTrigger>
          ))}
        </TabsList>

        {diet.week_plan?.map((day: any, index: number) => (
          <TabsContent key={index} value={index.toString()}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{day.day}</span>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      <Flame className="w-3 h-3 mr-1" />
                      {day.total_calories} kcal
                    </Badge>
                    <Badge variant="outline" className="text-blue-500">
                      <Droplets className="w-3 h-3 mr-1" />
                      {day.water_goal} copos
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {day.meals?.map((meal: any, mealIndex: number) => (
                  <div key={mealIndex} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{meal.name}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {meal.time}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {meal.calories} kcal
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {meal.foods?.map((food: string, foodIndex: number) => (
                        <li key={foodIndex} className="text-sm text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-dryleaf-green rounded-full"></span>
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
