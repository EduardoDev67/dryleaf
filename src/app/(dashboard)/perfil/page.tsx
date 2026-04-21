/**
 * PAGINA DE PERFIL
 * ================
 */

import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, Mail, Phone, Crown } from 'lucide-react'

export default async function PerfilPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session!.user.id)
    .single()

  const planLabels: Record<string, { name: string; color: string }> = {
    free: { name: 'Free', color: 'bg-gray-100 text-gray-800' },
    premium: { name: 'Premium', color: 'bg-dryleaf-green text-white' },
    pro: { name: 'Pro', color: 'bg-dryleaf-yellow text-dryleaf-green' },
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Meu Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informacoes Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-dryleaf-green text-white">
                {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-lg">{profile?.full_name || 'Usuario'}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                {session?.user.email}
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Nome completo</Label>
                <Input defaultValue={profile?.full_name || ''} />
              </div>
              <div className="space-y-2">
                <Label>Telefone</Label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <Input defaultValue={profile?.phone || ''} placeholder="(11) 99999-9999" />
                </div>
              </div>
            </div>

            <Button type="submit" className="bg-dryleaf-green hover:bg-dryleaf-green-dark">
              Salvar alteracoes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${planLabels[profile?.plan_type || 'free'].color}`}>
                {planLabels[profile?.plan_type || 'free'].name}
              </span>
            </div>
            <a href="/pricing">
              <Button variant="outline">Mudar plano</Button>
            </a>
          </div>
        </CardContent>
      </Card>

      {profile?.plan_type === 'pro' && (
        <Card>
          <CardHeader>
            <CardTitle>Configuracao WhatsApp</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Numero WhatsApp para envio de dietas</Label>
              <Input
                defaultValue={profile?.whatsapp_number || ''}
                placeholder="+55 11 99999-9999"
              />
              <p className="text-sm text-gray-500">
                Formato internacional: +55 DDD numero
              </p>
            </div>
            <Button className="bg-dryleaf-green hover:bg-dryleaf-green-dark">
              Salvar numero
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
