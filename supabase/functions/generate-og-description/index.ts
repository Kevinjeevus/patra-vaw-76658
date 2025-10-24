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
    const { cardId } = await req.json();

    if (!cardId) {
      return new Response(
        JSON.stringify({ error: 'Card ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch card data
    const { data: card, error: cardError } = await supabase
      .from('digital_cards')
      .select('content_json, title, vanity_url, custom_og_title, custom_og_description, og_auto_generate')
      .eq('id', cardId)
      .single();

    if (cardError || !card) {
      console.error('Error fetching card:', cardError);
      return new Response(
        JSON.stringify({ error: 'Card not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If custom description is set and auto-generate is false, return custom description
    if (card.custom_og_description && !card.og_auto_generate) {
      return new Response(
        JSON.stringify({ 
          description: card.custom_og_description,
          custom: true 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const content = card.content_json as any;
    
    // Build context for AI
    const profileContext = `
Name: ${content.fullName || card.title}
Job Title: ${content.jobTitle || 'Professional'}
Company: ${content.company || ''}
Bio: ${content.about || ''}
Key Info: ${content.achievements?.slice(0, 2).map((a: any) => a.title).join(', ') || 'Digital business card'}
    `.trim();

    // Generate description using Lovable AI
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a social media copywriter specializing in creating engaging, first-person share text for digital business cards.'
          },
          {
            role: 'user',
            content: `Generate a compelling, first-person social media share description for my Patra digital business card.

Profile Information:
${profileContext}

Requirements:
- Write in first person (e.g., "Hey! I got my Patra card...")
- Make it exciting and authentic
- Include a call-to-action
- Must be under 200 characters
- Use 1-2 relevant emojis
- Highlight a benefit of having a digital card
- Format: "Hey! I [role/accomplishment]. My Patra card helped me [benefit]. Check it out! 🚀"

Return ONLY the share text, no quotes or additional formatting.`
          }
        ],
        max_tokens: 150,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI API error:', aiResponse.status, errorText);
      
      // Fallback to default description
      const fallbackDescription = `Hey! I'm ${content.fullName || card.title}${content.jobTitle ? `, ${content.jobTitle}` : ''}. Check out my Patra digital business card! 🚀`;
      
      const { error: updateError } = await supabase
        .from('digital_cards')
        .update({
          og_description: fallbackDescription,
          og_description_generated_at: new Date().toISOString(),
        })
        .eq('id', cardId);

      if (updateError) {
        console.error('Error updating card with fallback:', updateError);
      }

      return new Response(
        JSON.stringify({ description: fallbackDescription, fallback: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    let description = aiData.choices?.[0]?.message?.content?.trim() || '';
    
    // Remove quotes if AI added them
    description = description.replace(/^["']|["']$/g, '');
    
    // Ensure it's not too long
    if (description.length > 200) {
      description = description.substring(0, 197) + '...';
    }

    // Save to database
    const { error: updateError } = await supabase
      .from('digital_cards')
      .update({
        og_description: description,
        og_description_generated_at: new Date().toISOString(),
      })
      .eq('id', cardId);

    if (updateError) {
      console.error('Error updating card:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to save description' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generated OG description:', description);

    return new Response(
      JSON.stringify({ description }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-og-description:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
