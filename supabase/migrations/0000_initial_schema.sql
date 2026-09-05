-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT NOT NULL,
    academic_domain TEXT,
    experience_level TEXT,
    skills JSONB DEFAULT '[]'::jsonb,
    interests JSONB DEFAULT '[]'::jsonb,
    preferred_technologies JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Projects table
CREATE TABLE public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    pitch TEXT NOT NULL,
    problem_statement TEXT,
    solution TEXT,
    project_data JSONB NOT NULL,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Project Tasks table
CREATE TABLE public.project_tasks (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    phase TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    priority TEXT NOT NULL,
    estimated_duration TEXT,
    status TEXT DEFAULT 'Not Started',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mentor Conversations
CREATE TABLE public.mentor_conversations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    mentor_mode TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Mentor Messages
CREATE TABLE public.mentor_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    conversation_id UUID REFERENCES public.mentor_conversations(id) ON DELETE CASCADE NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Custom Ideas
CREATE TABLE public.custom_ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    original_idea TEXT NOT NULL,
    improved_idea_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Setup Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentor_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_ideas ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for projects
CREATE POLICY "Users can view own projects" ON public.projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Policies for project_tasks
CREATE POLICY "Users can view own tasks" ON public.project_tasks FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_tasks.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can insert own tasks" ON public.project_tasks FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_tasks.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can update own tasks" ON public.project_tasks FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_tasks.project_id AND projects.user_id = auth.uid())
);
CREATE POLICY "Users can delete own tasks" ON public.project_tasks FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.projects WHERE projects.id = project_tasks.project_id AND projects.user_id = auth.uid())
);

-- Policies for mentor_conversations
CREATE POLICY "Users can view own conversations" ON public.mentor_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON public.mentor_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policies for mentor_messages
CREATE POLICY "Users can view own messages" ON public.mentor_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.mentor_conversations WHERE mentor_conversations.id = mentor_messages.conversation_id AND mentor_conversations.user_id = auth.uid())
);
CREATE POLICY "Users can insert own messages" ON public.mentor_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.mentor_conversations WHERE mentor_conversations.id = mentor_messages.conversation_id AND mentor_conversations.user_id = auth.uid())
);

-- Policies for custom_ideas
CREATE POLICY "Users can view own custom ideas" ON public.custom_ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own custom ideas" ON public.custom_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
