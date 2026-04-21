/**
 * CONFIGURACAO OPENAI
 * ===================
 * Cliente configurado para comunicar com a API da OpenAI.
 */

import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

/**
 * Gera uma dieta personalizada baseada nos dados do usuario
 */
export async function generateDiet(userData: {
  age: number
  gender: string
  height: number
  weight: number
  goal: string
  activityLevel: string
  restrictions: string[]
  preferences: string[]
}) {
  const prompt = `
Voce e um nutricionista especialista em criar dietas personalizadas.
Crie um plano alimentar semanal completo e detalhado com base nos seguintes dados:

DADOS DO PACIENTE:
- Idade: ${userData.age} anos
- Genero: ${userData.gender}
- Altura: ${userData.height}cm
- Peso: ${userData.weight}kg
- Objetivo: ${userData.goal}
- Nivel de atividade: ${userData.activityLevel}
${userData.restrictions.length > 0 ? `- Restricoes alimentares: ${userData.restrictions.join(', ')}` : ''}
${userData.preferences.length > 0 ? `- Preferencias: ${userData.preferences.join(', ')}` : ''}

IMPORTANTE:
1. Calcule as calorias diarias necessarias usando a formula de Harris-Benedict
2. Distribua macros: proteinas 30%, carboidratos 40%, gorduras 30%
3. Inclua 6 refeicoes diarias (cafe da manha, lanche da manha, almoco, lanche da tarde, jantar, ceia)
4. Para cada refeicao, liste alimentos especificos com quantidades
5. Inclua horarios sugeridos para cada refeicao
6. Adapte as restricoes alimentares
7. Forneca variacoes para cada dia da semana

Responda APENAS em formato JSON valido:
{
  "title": "Titulo da dieta",
  "description": "Descricao breve",
  "dailyCalories": numero,
  "macros": { "protein": gramas, "carbs": gramas, "fats": gramas },
  "weekPlan": [
    {
      "day": "Segunda-feira",
      "date": "YYYY-MM-DD",
      "meals": [
        { "name": "Cafe da Manha", "time": "07:00", "foods": ["alimento 1", "alimento 2"], "calories": numero, "protein": numero, "carbs": numero, "fats": numero }
      ],
      "totalCalories": numero,
      "waterGoal": 8
    }
  ]
}
`

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'Voce e um assistente nutricional especializado. Sempre responda em JSON valido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Resposta vazia da IA')
    }

    const jsonString = content.replace(/```json\\n?|```\\n?/g, '').trim()
    const diet = JSON.parse(jsonString)

    return diet
  } catch (error) {
    console.error('Erro ao gerar dieta:', error)
    throw new Error('Falha ao gerar dieta. Tente novamente.')
  }
}

/**
 * Responde perguntas de saude/nutricao
 */
export async function chatWithAI(
  message: string,
  history: { role: 'user' | 'assistant'; content: string }[] = []
) {
  const systemPrompt = `
Voce e um assistente virtual de saude e nutricao chamado "DryLeaf".

DIRETRIZES:
1. Forneca informacoes gerais sobre nutricao e saude
2. NUNCA substitua um medico ou nutricionista
3. Sempre recomende consultar profissionais para diagnosticos
4. Use linguagem simples e acessivel
5. Seja encorajador e positivo
6. Se nao souber algo, admita honestamente

AVISO MEDICO: "Esta informacao e apenas educacional.
Consulte um profissional de saude para orientacao personalizada."
`

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: message }
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    return response.choices[0]?.message?.content || 'Desculpe, nao consegui processar sua pergunta.'
  } catch (error) {
    console.error('Erro no chat:', error)
    throw new Error('Falha ao processar mensagem.')
  }
}

export { openai }
