/**
 * CONFIGURACAO TWILIO
 * ===================
 * Cliente para enviar mensagens via WhatsApp.
 */

import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER

export async function sendWhatsAppMessage(
  to: string,
  message: string
): Promise<{ success: boolean; messageSid?: string; error?: string }> {
  try {
    const formattedTo = to.startsWith('whatsapp:') ? to : `whatsapp:${to}`
    const formattedFrom = WHATSAPP_NUMBER?.startsWith('whatsapp:')
      ? WHATSAPP_NUMBER
      : `whatsapp:${WHATSAPP_NUMBER}`

    const result = await client.messages.create({
      body: message,
      from: formattedFrom,
      to: formattedTo,
    })

    return {
      success: true,
      messageSid: result.sid,
    }
  } catch (error: any) {
    console.error('Erro Twilio:', error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export function formatDietForWhatsApp(diet: {
  title: string
  week_plan: Array<{
    day: string
    meals: Array<{ name: string; foods: string[] }>
    total_calories: number
  }>
}): string {
  let message = `*${diet.title}*\\n\\n`
  message += `Sua dieta personalizada do DryLeaf!\\n\\n`

  const today = diet.week_plan[0]
  if (today) {
    message += `*${today.day}*\\n`
    message += `${today.total_calories} calorias\\n\\n`

    today.meals.forEach((meal) => {
      message += `*${meal.name}*\\n`
      meal.foods.forEach((food) => {
        message += `- ${food}\\n`
      })
      message += '\\n'
    })
  }

  message += `Acesse o app para ver a dieta completa!`

  return message
}
