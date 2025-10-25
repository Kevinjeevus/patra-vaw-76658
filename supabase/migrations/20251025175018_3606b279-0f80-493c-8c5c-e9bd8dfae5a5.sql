-- Create feedback types enum
CREATE TYPE feedback_type AS ENUM ('bug', 'feature', 'support', 'feedback');

-- Create feedback submissions table
CREATE TABLE public.feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type feedback_type NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  user_signature TEXT,
  user_email TEXT NOT NULL,
  user_phone TEXT,
  user_name TEXT NOT NULL,
  ip_address INET,
  device_info JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'pending',
  admin_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.feedback_submissions ENABLE ROW LEVEL SECURITY;

-- Users can view their own submissions
CREATE POLICY "Users can view their own submissions"
ON public.feedback_submissions
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own submissions
CREATE POLICY "Users can create submissions"
ON public.feedback_submissions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all submissions
CREATE POLICY "Admins can view all submissions"
ON public.feedback_submissions
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update submissions
CREATE POLICY "Admins can update submissions"
ON public.feedback_submissions
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_feedback_submissions_updated_at
BEFORE UPDATE ON public.feedback_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create announcements_recipients table for targeted announcements
CREATE TABLE public.announcements_recipients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.announcements_recipients ENABLE ROW LEVEL SECURITY;

-- Users can view their own announcement receipts
CREATE POLICY "Users can view their own announcements"
ON public.announcements_recipients
FOR SELECT
USING (auth.uid() = user_id);

-- Users can mark as read
CREATE POLICY "Users can update their announcements"
ON public.announcements_recipients
FOR UPDATE
USING (auth.uid() = user_id);

-- Admins can create announcement recipients
CREATE POLICY "Admins can create announcement recipients"
ON public.announcements_recipients
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Add send_to_all field to announcements
ALTER TABLE public.announcements
ADD COLUMN send_to_all BOOLEAN DEFAULT false;