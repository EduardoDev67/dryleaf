/**
 * GERADOR DE DIETA
 * ================
 * Componente completo para coletar dados e gerar dieta personalizada.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Loader2, Utensils, AlertCircle } from 'lucide-react'

const COMMON_RESTRICTIONS = [
  'Gluten',
  'Lactose',
  'Acucar',
  'Frutos do mar',
  'Amendoim',
  'Ovo',
  'Soja',
  'Carne vermelha',
]

const COMMON_PREFERENCES = [
  'Vegetariano',
  'Vegano',
  'Mediterranea',
  'Low Carb',
  'Sem processados',
  'Comida brasileira',
  'Comida japonesa',
  'Comida italiana',
]

export function GeradorDieta() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    restrictions: [] as string[],
    preferences: [] as string[],
  })

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: 'restrictions' | 'preferences', item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/ai/dieta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: parseInt(formData.age),
          gender: formData.gender,
          height: parseInt(formData.height),
          weight: parseFloat(formData.weight),
          goal: formData.goal,
          activityLevel: formData.activityLevel,
          restrictions: formData.restrictions,
          preferences: formData.preferences,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar dieta')
      }

      router.push(`/dieta/${data.diet.id}`)
      router.refresh()

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-dryleaf-green">
          <Utensils className="w-6 h-6" />
          Gerar Minha Dieta Personalizada
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-dryleaf-green">Dados Pessoais</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade *</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="30"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                  required
                  min="10"
                  max="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Genero *</Label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  required
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm) *</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => handleChange('height', e.target.value)}
                  required
                  min="100"
                  max="250"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={formData.weight}
                  onChange={(e) => handleChange('weight', e.target.value)}
                  required
                  min="30"
                  max="300"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-dryleaf-green">Seu Objetivo</h3>

            <div className="space-y-2">
              <Label htmlFor="goal">O que voce quer alcancar? *</Label>
              <select
                id="goal"
                value={formData.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Selecione seu objetivo</option>
                <option value="emagrecer">Perder peso</option>
                <option value="manter">Manter peso</option>
                <option value="ganhar_musculo">Ganhar massa muscular</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Nivel de atividade fisica *</Label>
              <select
                id="activity"
                value={formData.activityLevel}
                onChange={(e) => handleChange('activityLevel', e.target.value)}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Selecione</option>
                <option value="sedentario">Sedentario (sem exercicio)</option>
                <option value="leve">Leve (1-2x/semana)</option>
                <option value="moderado">Moderado (3-4x/semana)</option>
                <option value="intenso">Intenso (5+ x/semana)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-dryleaf-green">Restricoes Alimentares</h3>
            <p className="text-sm text-gray-600">Selecione todas que se aplicam:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_RESTRICTIONS.map((restriction) => (
                <Badge
                  key={restriction}
                  variant={formData.restrictions.includes(restriction) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    formData.restrictions.includes(restriction)
                      ? 'bg-dryleaf-green'
                      : 'hover:bg-dryleaf-green/10'
                  }`}
                  onClick={() => toggleArrayItem('restrictions', restriction)}
                >
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-dryleaf-green">Preferencias</h3>
            <p className="text-sm text-gray-600">Estilos que voce prefere:</p>
            <div className="flex flex-wrap gap-2">
              {COMMON_PREFERENCES.map((pref) => (
                <Badge
                  key={pref}
                  variant={formData.preferences.includes(pref) ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    formData.preferences.includes(pref)
                      ? 'bg-dryleaf-yellow text-dryleaf-green'
                      : 'hover:bg-dryleaf-yellow/20'
                  }`}
                  onClick={() => toggleArrayItem('preferences', pref)}
                >
                  {pref}
                </Badge>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-dryleaf-green hover:bg-dryleaf-green-dark"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gerando dieta com IA...
              </>
            ) : (
              'Gerar Minha Dieta'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
