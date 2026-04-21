# 🍃 DryLeaf - Assistente de Nutrição com IA

Plataforma SaaS completa para geração de dietas personalizadas com inteligência artificial, chatbot de nutrição e integração com WhatsApp.

## ✨ Funcionalidades

- 🤖 **Chat com IA 24/7** - Tire dúvidas sobre nutrição a qualquer hora
- 🍽️ **Dietas Personalizadas** - Planos alimentares únicos gerados por IA
- 📱 **Integração WhatsApp** - Receba dietas e lembretes no celular
- 🎯 **Acompanhamento de Progresso** - Monitore sua evolução semanal
- 🔐 **Autenticação Segura** - Login com email/senha via Supabase
- 💳 **Pagamentos** - Assinaturas via Stripe (Premium e Pro)

## 🛠️ Stack Tecnológico

| Componente | Tecnologia |
|------------|------------|
| Framework | Next.js 14 (App Router) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| UI Components | shadcn/ui |
| Banco de Dados | Supabase (PostgreSQL) |
| IA | OpenAI GPT-4o |
| Pagamentos | Stripe |
| WhatsApp | Twilio |

## 🚀 Como Executar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias.

### 3. Execute o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Build para Produção

```bash
npm run build
npm start
```

## 🎨 Cores do Brand

- **Verde Principal:** #2D5016
- **Verde Claro:** #4a7c2a
- **Amarelo Destaque:** #F4C430

## 📱 Páginas Principais

| Página | Descrição |
|--------|-----------|
| `/` | Landing Page |
| `/login` | Login |
| `/signup` | Cadastro |
| `/dashboard` | Painel principal |
| `/dieta` | Gerador de dietas |
| `/chat` | Chat com IA |
| `/perfil` | Configurações |
| `/pricing` | Planos |

---

**Nota:** Esta aplicação não substitui orientação médica ou nutricional profissional.
