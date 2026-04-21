-- =============================================================================
-- DRYLEAF - SCHEMA DO BANCO DE DADOS
-- =============================================================================

-- Habilitar extensao para UUIDs automaticos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- TABELA: profiles (Perfil do Usuario)
-- Extensao do auth.users do Supabase Auth
-- =============================================================================
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('masculino', 'feminino', 'outro')),
  height_cm INTEGER,
  weight_kg DECIMAL(5,2),
  goal TEXT CHECK (goal IN ('emagrecer', 'manter', 'ganhar_musculo')),
  activity_level TEXT CHECK (activity_level IN ('sedentario', 'leve', 'moderado', 'intenso')),
  plan_type TEXT DEFAULT 'free' CHECK (plan_type IN ('free', 'premium', 'pro')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  whatsapp_enabled BOOLEAN DEFAULT FALSE,
  whatsapp_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Politicas de seguranca (RLS - Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Trigger para criar perfil automaticamente apos signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- TABELA: diets (Dietas Geradas)
-- =============================================================================
CREATE TABLE diets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  week_plan JSONB NOT NULL,
  daily_calories INTEGER,
  macros JSONB,
  restrictions TEXT[],
  preferences TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE diets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own diets" ON diets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own diets" ON diets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diets" ON diets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diets" ON diets
  FOR DELETE USING (auth.uid() = user_id);

-- =============================================================================
-- TABELA: chat_messages (Mensagens do Chat com IA)
-- =============================================================================
CREATE TABLE chat_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  context JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own messages" ON chat_messages
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own messages" ON chat_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =============================================================================
-- TABELA: diet_progress (Progresso da Dieta)
-- =============================================================================
CREATE TABLE diet_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  diet_id UUID REFERENCES diets(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  meals_completed JSONB DEFAULT '{}',
  water_intake INTEGER DEFAULT 0,
  notes TEXT,
  weight_logged DECIMAL(5,2),
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, diet_id, date)
);

ALTER TABLE diet_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON diet_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own progress" ON diet_progress
  FOR ALL USING (auth.uid() = user_id);

-- =============================================================================
-- TABELA: whatsapp_logs (Logs de envio WhatsApp)
-- =============================================================================
CREATE TABLE whatsapp_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  diet_id UUID REFERENCES diets(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL,
  content TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  twilio_message_sid TEXT,
  error_message TEXT,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE whatsapp_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs" ON whatsapp_logs
  FOR SELECT USING (auth.uid() = user_id);

-- =============================================================================
-- INDICES PARA PERFORMANCE
-- =============================================================================
CREATE INDEX idx_diets_user_id ON diets(user_id);
CREATE INDEX idx_diets_active ON diets(user_id, is_active);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_created ON chat_messages(user_id, created_at);
CREATE INDEX idx_progress_user_date ON diet_progress(user_id, date);
CREATE INDEX idx_whatsapp_logs_user ON whatsapp_logs(user_id);
CREATE INDEX idx_whatsapp_logs_scheduled ON whatsapp_logs(scheduled_for, status);

-- =============================================================================
-- FUNCAO: Atualizar timestamp de updated_at automaticamente
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diets_updated_at
  BEFORE UPDATE ON diets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diet_progress_updated_at
  BEFORE UPDATE ON diet_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
