import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const url = new URL(req.url);
        const vanityUrl = url.searchParams.get('vanity_url') || url.searchParams.get('username');
        const cardId = url.searchParams.get('id');

        if (!vanityUrl && !cardId) {
            return new Response(
                JSON.stringify({ error: 'vanity_url or id parameter is required' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Initialize Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!; // Using Service Role to ensure we can read public data
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Build query
        let query = supabase
            .from('digital_cards')
            .select(`
        id, 
        title, 
        vanity_url, 
        content_json, 
        owner_user_id, 
        created_at, 
        updated_at,
        profiles:owner_user_id (
          display_name,
          avatar_url,
          job_title
        )
      `)
            .eq('is_active', true);

        if (cardId) {
            query = query.eq('id', cardId);
        } else if (vanityUrl) {
            query = query.eq('vanity_url', vanityUrl);
        }

        const { data: card, error } = await query.single();

        if (error || !card) {
            return new Response(
                JSON.stringify({ error: 'Card not found' }),
                { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Construct a clean response object
        const content = card.content_json as any;
        const profile = Array.isArray(card.profiles) ? card.profiles[0] : card.profiles;

        const responseData = {
            id: card.id,
            vanity_url: card.vanity_url,
            title: card.title,
            owner: {
                name: profile?.display_name || content.fullName,
                avatar_url: profile?.avatar_url || content.avatarUrl,
                job_title: profile?.job_title || content.jobTitle
            },
            card_data: {
                ...content,
                // Ensure essential fields are present
                fullName: content.fullName || profile?.display_name,
                jobTitle: content.jobTitle || profile?.job_title,
                avatarUrl: content.avatarUrl || profile?.avatar_url
            },
            meta: {
                created_at: card.created_at,
                updated_at: card.updated_at
            }
        };

        return new Response(
            JSON.stringify(responseData),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
