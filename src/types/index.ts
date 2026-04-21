/**
 * TIPOS TYPESCRIPT DO DRYLEAF
 * ===========================
 * Define a estrutura de dados usada em toda a aplicacao.
 */

// Plano de assinatura do usuario
export type PlanType = 'free' | 'premium' | 'pro'

// Nivel de atividade fisica
export type ActivityLevel = 'sedentario' | 'leve' | 'moderado' | 'intenso'

// Objetivo do usuario
export type GoalType = 'emagrecer' | 'manter' | 'ganhar_musculo'

// Perfil completo do usuario
export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  birth_date: string | null
  gender: 'masculino' | 'feminino' | 'outro' | null
  height_cm: number | null
  weight_kg: number | null
  goal: GoalType | null
  activity_level: ActivityLevel | null
  plan_type: PlanType
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  whatsapp_enabled: boolean
  whatsapp_number: string | null
  created_at: string
  updated_at: string
}

// Refeicao individual
export interface Meal {
  name: string
  time: string
  foods: string[]
  calories: number
  protein: number
  carbs: number
  fats: number
}

// Dia da dieta
export interface DietDay {
  day: string
  date: string
  meals: Meal[]
  total_calories: number
  water_goal: number
}

// Plano de dieta completo
export interface Diet {
  id: string
  user_id: string
  title: string
  description: string | null
  week_plan: DietDay[]
  daily_calories: number
  macros: {
    protein: number
    carbs: number
    fats: number
  }
  restrictions: string[]
  preferences: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// Mensagem do chat
export interface ChatMessage {
  id: string
  user_id: string
  content: string
  role: 'user' | 'assistant'
  context: Record<string, unknown> | null
  created_at: string
}

// Progresso diario
export interface DietProgress {
  id: string
  user_id: string
  diet_id: string
  date: string
  meals_completed: Record<string, boolean>
  water_intake: number
  notes: string | null
  weight_logged: number | null
  mood: string | null
  created_at: string
  updated_at: string
}

// Dados para geracao de dieta
export interface DietGenerationData {
  age: number
  gender: string
  height: number
  weight: number
  goal: string
  activityLevel: string
  restrictions: string[]
  preferences: string[]
}
