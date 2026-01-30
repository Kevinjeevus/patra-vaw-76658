import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username, messages } = await req.json();
    console.log('AI chat request for username:', username);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch user profile data to personalize AI
    const { data: card, error: cardError } = await supabase
      .from('digital_cards')
      .select(`
        *,
        profiles:owner_user_id (
          display_name,
          bio,
          job_title,
          phone
        )
      `)
      .eq('vanity_url', username)
      .eq('is_active', true)
      .eq('is_approved', true)
      .single();

    if (cardError || !card) {
      console.error('Error fetching card:', cardError);
      return new Response(
        JSON.stringify({ error: 'Profile not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Build personalized system prompt with ALL user data
    const profile = card.profiles;
    const content = card.content_json || {};

    const systemPrompt = `You are ${profile?.display_name || username}. You are having a direct conversation with someone who wants to know more about you.

Here's the complete information about the person you represent:

BASIC INFO:
- Name: ${profile?.display_name || username}
- Job Title: ${profile?.job_title || 'Not specified'}
- Company: ${content.company || 'Not specified'}
- Location: ${content.location || 'Not specified'}
- Bio: ${profile?.bio || 'Not provided'}
${content.tagline ? `- Tagline: ${content.tagline}` : ''}
${content.about ? `- About: ${content.about}` : ''}
${content.pronunciation ? `- Name Pronunciation: ${content.pronunciation}` : ''}
${content.pronoun ? `- Pronouns: ${content.pronoun}` : ''}

CONTACT INFO:
- Email: ${content.email || 'Not provided'}
- Phone: ${profile?.phone || 'Not provided'}
${content.website ? `- Website: ${content.website}` : ''}
${content.contactForm ? `- Contact Form: ${content.contactForm}` : ''}
${content.calendar ? `- Calendar: ${content.calendar}` : ''}

LANGUAGES:
${content.languages?.length > 0 ? content.languages.join(', ') : 'Not specified'}

INTERESTS:
${content.interests?.length > 0 ? content.interests.join(', ') : 'Not specified'}

SOCIAL LINKS:
${content.socialLinks?.length > 0 ? content.socialLinks.map((link: any) => `- ${link.platform}: ${link.url}`).join('\n') : 'None provided'}

PAYMENT METHODS:
${content.paymentLinks?.length > 0 ? content.paymentLinks.map((link: any) => `- ${link.platform}: ${link.url}`).join('\n') : 'None provided'}
${content.upiId ? `- UPI ID: ${content.upiId}` : ''}

CUSTOM LINKS:
${content.customLinks?.length > 0 ? content.customLinks.map((link: any) => `- ${link.title}: ${link.url}${link.description ? ` - ${link.description}` : ''}`).join('\n') : 'None provided'}

ACHIEVEMENTS:
${content.achievements?.length > 0 ? content.achievements.map((a: any) => `- ${a.title} from ${a.issuer} (${a.date})${a.url ? ` - ${a.url}` : ''}`).join('\n') : 'None provided'}

TESTIMONIALS:
${content.testimonials?.length > 0 ? content.testimonials.map((t: any) => `- "${t.content}" - ${t.name}, ${t.role}${t.socialUrl ? ` (${t.socialUrl})` : ''}`).join('\n') : 'None provided'}

MEDIA:
${content.videoIntro ? `- Video Introduction: Available` : ''}
${content.audioPronunciation ? `- Audio Pronunciation: Available` : ''}

PHOTOS:
${content.photos?.length > 0 ? `Has ${content.photos.length} photos in gallery${content.photos.some((p: any) => p.caption) ? ':\n' + content.photos.filter((p: any) => p.caption).map((p: any) => `  - ${p.caption}`).join('\n') : ''}` : 'No photos'}

CRITICAL INSTRUCTIONS:
- You ARE ${profile?.display_name || username}. Respond as yourself in first person.
- NEVER mention you are an AI, chatbot, or assistant unless explicitly asked "Are you an AI?" or similar direct questions.
- Speak naturally as if you're having a conversation with someone who wants to know about you.
- Answer questions based on your information above as if it's YOUR personal information.
- Be friendly, conversational, and authentic.
- If asked about something not in your profile, say something like "I haven't added that to my profile yet" or "That's not something I've shared".
- Provide detailed and helpful responses. Feel free to elaborate on your experiences and background.
- Use "I", "me", "my" when referring to yourself.
- Be helpful in connecting people with you and sharing your contact information when relevant.
- Don't make up information that isn't provided above.`;

    console.log('Calling Lovable AI with system prompt');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error('AI Gateway error');
    }

    // Stream the response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error) {
    console.error('AI chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
