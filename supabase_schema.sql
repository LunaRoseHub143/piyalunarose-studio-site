-- 1. Library Posts (Public)
CREATE TABLE library_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Mindset',
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Private Notes (Owner Only)
CREATE TABLE private_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies

-- Library Posts: Public read, Admin write
ALTER TABLE library_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON library_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow admin to manage everything" ON library_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Private Notes: Owner only
ALTER TABLE private_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow individual read" ON private_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow individual insert" ON private_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow individual update" ON private_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow individual delete" ON private_notes
  FOR DELETE USING (auth.uid() = user_id);
