import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Leaf,
  MessageSquare,
  Utensils,
  Smartphone,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Star,
  CheckCircle2
} from 'lucide-react'
import { PricingCards } from '@/components/pricing/PricingCards'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-dryleaf-green-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="p-2 bg-dryleaf-green rounded-xl">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-dryleaf-green">DryLeaf</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-dryleaf-green transition-colors">
                Funcionalidades
              </Link>
              <Link href="#como-funciona" className="text-gray-600 hover:text-dryleaf-green transition-colors">
                Como Funciona
              </Link>
              <Link href="#precos" className="text-gray-600 hover:text-dryleaf-green transition-colors">
                Preços
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:flex">
                <Button variant="ghost" className="text-dryleaf-green hover:text-dryleaf-green-dark hover:bg-dryleaf-green-50">
                  Entrar
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-dryleaf-green hover:bg-dryleaf-green-dark text-white">
                  Começar Grátis
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-dryleaf-green-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-dryleaf-yellow-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-dryleaf-green-50 border border-dryleaf-green-200 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-dryleaf-green" />
              <span className="text-sm font-medium text-dryleaf-green">Novo: Integração com WhatsApp</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Sua saúde em{' '}
              <span className="relative">
                <span className="relative z-10 text-dryleaf-green">boas mãos</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-dryleaf-yellow -z-0" viewBox="0 0 200 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8 T200,8" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Assistente pessoal de nutrição com IA. Dietas personalizadas,
              acompanhamento semanal e respostas instantâneas 24/7.
            </p>

            <p className="text-sm text-dryleaf-green-muted mb-10">
              ✓ Comece grátis • ✓ Cancele quando quiser • ✓ Suporte humano
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-dryleaf-green hover:bg-dryleaf-green-dark text-white h-14 px-8 text-lg rounded-xl shadow-lg shadow-dryleaf-green/20 hover:shadow-xl hover:shadow-dryleaf-green/30 transition-all"
                >
                  Experimente Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-dryleaf-green-200 text-dryleaf-green hover:bg-dryleaf-green-50 h-14 px-8 text-lg rounded-xl"
                >
                  Ver Demonstração
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {[
                { value: '10K+', label: 'Usuários ativos' },
                { value: '50K+', label: 'Dietas geradas' },
                { value: '4.9', label: 'Avaliação média' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-dryleaf-green">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-dryleaf-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tudo que você precisa para{' '}
              <span className="text-dryleaf-green">cuidar da sua saúde</span>
            </h2>
            <p className="text-gray-600">
              Ferramentas inteligentes que fazem o trabalho pesado por você
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                title: 'Chat com IA 24/7',
                description: 'Tire dúvidas sobre nutrição a qualquer hora. Nosso assistente responde instantaneamente sobre dietas, receitas e muito mais.',
                color: 'dryleaf-green'
              },
              {
                icon: Utensils,
                title: 'Dietas Personalizadas',
                description: 'Receba planos alimentares únicos criados pela IA baseados nos seus objetivos, preferências e restrições alimentares.',
                color: 'dryleaf-yellow'
              },
              {
                icon: Smartphone,
                title: 'No seu WhatsApp',
                description: 'Receba suas dietas, lembretes e dicas diretamente no celular. Acompanhe sua rotina sem abrir outro aplicativo.',
                color: 'dryleaf-green'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-dryleaf-green-100 hover:border-dryleaf-green-200"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  feature.color === 'dryleaf-yellow'
                    ? 'bg-dryleaf-yellow text-dryleaf-green'
                    : 'bg-dryleaf-green text-white'
                }`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-dryleaf-green transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="como-funciona" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Como funciona
            </h2>
            <p className="text-gray-600">
              Três passos simples para transformar sua alimentação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Crie sua conta',
                description: 'Cadastre-se gratuitamente e preencha seu perfil com objetivos e preferências alimentares.'
              },
              {
                step: '02',
                title: 'Gere sua dieta',
                description: 'Nossa IA analisa seus dados e cria um plano alimentar personalizado em segundos.'
              },
              {
                step: '03',
                title: 'Acompanhe e evolua',
                description: 'Receba no WhatsApp, tire dúvidas no chat e ajuste sua dieta conforme sua evolução.'
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-dryleaf-green-100 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px">
                    <div className="w-full h-px bg-dashed border-t-2 border-dryleaf-green-200 border-dashed" />
                    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 text-dryleaf-green-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-dryleaf-green text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Por que escolher o DryLeaf?
              </h2>
              <p className="text-white/80 mb-8 text-lg">
                Tecnologia de ponta combinada com conhecimento nutricional para
                te ajudar a alcançar seus objetivos de forma saudável e sustentável.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Zap, text: 'Respostas instantâneas com IA avançada' },
                  { icon: Shield, text: 'Seus dados estão sempre protegidos' },
                  { icon: Clock, text: 'Disponível 24 horas por dia, 7 dias por semana' },
                  { icon: Star, text: 'Recomendado por nutricionistas profissionais' }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-dryleaf-yellow/20 flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-dryleaf-yellow" />
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-dryleaf-yellow flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-dryleaf-green" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 text-gray-700 max-w-sm">
                    <p className="text-sm">Oi! Sou o assistente DryLeaf. Estou aqui para te ajudar com sua alimentação. Qual é o seu objetivo hoje? 💪</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6 justify-end">
                  <div className="bg-dryleaf-green-light rounded-2xl rounded-tr-none p-4 text-white max-w-sm">
                    <p className="text-sm">Quero emagrecer 5kg de forma saudável</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-dryleaf-yellow flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-dryleaf-green" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-none p-4 text-gray-700 max-w-sm">
                    <p className="text-sm">Perfeito! Vou criar um plano personalizado para você. Com base no seu perfil, recomendo começarmos com uma dieta de 1800 calorias. Posso gerar isso agora? 🥗</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-dryleaf-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano ideal para você
            </h2>
            <p className="text-gray-600">
              Comece gratuitamente e evolua conforme suas necessidades
            </p>
          </div>

          <PricingCards />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que nossos usuários dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Ana Silva',
                role: 'Perdeu 8kg em 3 meses',
                content: 'Consegui organizar minha alimentação de forma simples. O chat me ajuda muito quando tenho dúvidas sobre o que comer.',
                rating: 5
              },
              {
                name: 'Carlos Mendes',
                role: 'Ganhou massa muscular',
                content: 'As dietas são realmente personalizadas e saborosas. Recebo tudo no WhatsApp, então nunca esqueço o que preciso comer.',
                rating: 5
              },
              {
                name: 'Juliana Costa',
                role: 'Nutricionista',
                content: 'Recomendo para meus pacientes como ferramenta de apoio. A IA é precisa e os planos são bem equilibrados nutricionalmente.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-dryleaf-yellow text-dryleaf-yellow" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-dryleaf-green">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dryleaf-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perguntas frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: 'O DryLeaf substitui um nutricionista?',
                a: 'Não. O DryLeaf é uma ferramenta de apoio para organizar sua alimentação. Sempre consulte um profissional de saúde para orientação personalizada.'
              },
              {
                q: 'Posso cancelar a assinatura quando quiser?',
                a: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. Seus dados permanecem seguros.'
              },
              {
                q: 'Como funciona a integração com WhatsApp?',
                a: 'Após configurar seu número, você recebe dietas, lembretes e pode tirar dúvidas diretamente pelo WhatsApp, sem precisar abrir o app.'
              },
              {
                q: 'As dietas são realmente personalizadas?',
                a: 'Sim! Nossa IA analisa seu perfil, objetivos, restrições alimentares e preferências para criar um plano único para você.'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dryleaf-green flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-dryleaf-green to-dryleaf-green-dark rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Pronto para transformar sua saúde?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto text-lg">
              Junte-se a milhares de pessoas que já estão cuidando melhor da alimentação.
              Comece gratuitamente hoje.
            </p>
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-dryleaf-yellow text-dryleaf-green hover:bg-dryleaf-yellow-dark h-14 px-10 text-lg rounded-xl font-semibold"
              >
                Criar Conta Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-4">
              Sem cartão de crédito • Setup em 2 minutos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-dryleaf-green rounded-lg">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">DryLeaf</span>
              </div>
              <p className="text-gray-400 max-w-sm">
                Assistente pessoal de nutrição com IA. Dietas personalizadas,
                acompanhamento e respostas instantâneas para suas dúvidas sobre saúde.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Funcionalidades</Link></li>
                <li><Link href="#precos" className="hover:text-white transition-colors">Preços</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Ajuda</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 DryLeaf. Todos os direitos reservados.
            </p>
            <p className="text-gray-600 text-xs">
              Esta aplicação não substitui orientação médica ou nutricional profissional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
