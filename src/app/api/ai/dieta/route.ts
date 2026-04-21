/**
 * API ROUTE: GERAR DIETA
 * ======================
 * Endpoint que recebe dados do usuario e retorna dieta da IA.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateDiet } from '@/lib/openai'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json(
        { error: 'Nao autenticado' },
        { status: 401 }
      )
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('plan_type')
      .eq('id', session.user.id)
      .single()

    if (!profile || profile.plan_type === 'free') {
      return NextResponse.json(
        { error: 'Recurso disponivel apenas para assinantes Premium' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const {
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
      restrictions = [],
      preferences = [],
    } = body

    if (!age || !gender || !height || !weight || !goal || !activityLevel) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      )
    }

    const diet = await generateDiet({
      age,
      gender,
      height,
      weight,
      goal,
      activityLevel,
      restrictions,
      preferences,
    })

    const { data: savedDiet, error: dbError } = await supabase
      .from('diets')
      .insert({
        user_id: session.user.id,
        title: diet.title,
        description: diet.description,
        week_plan: diet.weekPlan,
        daily_calories: diet.dailyCalories,
        macros: diet.macros,
        restrictions,
        preferences,
        is_active: true,
      })
      .select()
      .single()

    if (dbError) {
      throw dbError
    }

    return NextResponse.json({
      success: true,
      diet: savedDiet,
    })

  } catch (error) {
    console.error('Erro ao gerar dieta:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
