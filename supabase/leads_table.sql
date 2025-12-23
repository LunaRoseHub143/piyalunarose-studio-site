-- Create leads table for the decision gate funnel
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    one_sentence_description TEXT NOT NULL,
    build_type TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]',
    payments_required BOOLEAN DEFAULT FALSE,
    timeline TEXT NOT NULL,
    requirements_status TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    outcome TEXT NOT NULL, -- 'Standard' | 'FastTrack'
    outcome_reason TEXT,
    raw_answers JSONB NOT NULL DEFAULT '{}'
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert (anonymous/public)
CREATE POLICY "Allow public lead insertion" 
ON leads FOR INSERT 
TO public 
WITH CHECK (true);

-- Policy: Do not allow public to read leads
CREATE POLICY "Restrict lead selection" 
ON leads FOR SELECT 
TO authenticated 
USING (true);

-- Add comment for future threshold adjustments
COMMENT ON TABLE leads IS 'Client qualification leads. Thresholds for Full Platform: Budget $10k+, Timeline 6+ weeks.';
