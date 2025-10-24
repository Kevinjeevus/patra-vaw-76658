-- Add AI enabled flag to profiles
ALTER TABLE profiles 
ADD COLUMN ai_enabled BOOLEAN DEFAULT false,
ADD COLUMN ai_consent_given_at TIMESTAMP WITH TIME ZONE;

-- Add chat messages table for AI conversations
CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_chat_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (for guest users chatting with AI)
CREATE POLICY "Anyone can send messages to AI"
  ON ai_chat_messages FOR INSERT
  WITH CHECK (true);

-- Allow profile owners to view their AI chat history
CREATE POLICY "Profile owners can view their AI messages"
  ON ai_chat_messages FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE user_id = auth.uid()
    )
  );

-- Allow anyone to read messages for public profiles
CREATE POLICY "Anyone can read AI messages for public profiles"
  ON ai_chat_messages FOR SELECT
  USING (
    profile_id IN (
      SELECT id FROM profiles WHERE ai_enabled = true
    )
  );

-- Create index for faster queries
CREATE INDEX idx_ai_chat_messages_profile_id ON ai_chat_messages(profile_id);
CREATE INDEX idx_ai_chat_messages_created_at ON ai_chat_messages(created_at DESC);