import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const apiKey = req.headers.get('x-api-key');
        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'Unauthorized: Missing x-api-key header' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Initialize Supabase client with Service Role Key for admin overrides
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!; 
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Authenticate the API Key
        // We use .contains on the JSONB column display_parameters to find the api_key within api_settings
        const { data: company, error: profileError } = await supabase
            .from('profiles')
            .select('id, vanity_url, display_parameters, company_name')
            .eq('account_type', 'company')
            .contains('display_parameters', { api_settings: { api_key: apiKey } })
            .maybeSingle();

        if (profileError || !company) {
            console.error('Auth error or company not found:', profileError);
            return new Response(
                JSON.stringify({ error: 'Unauthorized: Invalid API Key' }),
                { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        const url = new URL(req.url);
        const path = url.pathname.replace(/\/v1$/, ''); // Normalize path if needed

        // --- ROUTES ---

        // 1. Create Staff / Issue Card
        if (req.method === 'POST' && (url.pathname.includes('/staff') || url.pathname.includes('/create-card'))) {
            const body = await req.json();
            const { 
                email, 
                display_name, 
                job_title, 
                staff_id, 
                designation, 
                phone,
                metadata = {} 
            } = body;

            if (!email || !display_name) {
                return new Response(
                    JSON.stringify({ error: 'Bad Request: email and display_name are required' }),
                    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            // Generate a staff ID if not provided
            const finalStaffId = staff_id || designation || `STF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

            // Create entry in invited_employees (which represents the corporate staff registry)
            const { data: employee, error: insertError } = await supabase
                .from('invited_employees')
                .insert({
                    company_profile_id: company.id,
                    invite_code: Math.random().toString(36).substring(7).toUpperCase(),
                    status: 'approved',
                    is_approved: true,
                    joined_at: new Date().toISOString(),
                    staff_id: finalStaffId,
                    designation: job_title || designation,
                    data_submitted: {
                        email,
                        display_name,
                        job_title: job_title || designation,
                        phone,
                        ...metadata
                    }
                })
                .select()
                .single();

            if (insertError) throw insertError;

            // Construct Card Response
            const baseUrl = url.origin.replace(/\/[^\/]+$/, ''); // Base app URL
            const cardUrl = `${baseUrl}/${company.vanity_url}/${employee.staff_id}`;

            // Trigger Webhook if configured
            const apiSettings = (company.display_parameters as any)?.api_settings;
            if (apiSettings?.webhook_url && apiSettings.webhook_events?.includes('staff.added')) {
                const payload = {
                    event: 'staff.added',
                    timestamp: new Date().toISOString(),
                    company_id: company.id,
                    data: {
                        id: employee.id,
                        staff_id: employee.staff_id,
                        display_name: employee.data_submitted.display_name,
                        email: employee.data_submitted.email,
                        card_url: cardUrl
                    }
                };

                // Non-blocking webhook fire
                fetch(apiSettings.webhook_url, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-Patra-Signature': apiSettings.webhook_secret || 'default_secret'
                    },
                    body: JSON.stringify(payload)
                }).catch(err => console.error('Webhook delivery failed:', err));
            }

            return new Response(
                JSON.stringify({
                    success: true,
                    message: 'Staff card issued successfully',
                    card: {
                        id: employee.id,
                        staff_id: employee.staff_id,
                        url: cardUrl,
                        qr_code: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(cardUrl)}`
                    }
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // 2. Update Staff / Profile Sync
        if (req.method === 'PATCH' && url.pathname.includes('/staff/')) {
            const staffId = url.pathname.split('/').pop();
            const body = await req.json();

            const { data: existing, error: findError } = await supabase
                .from('invited_employees')
                .select('id, data_submitted')
                .eq('company_profile_id', company.id)
                .eq('staff_id', staffId)
                .maybeSingle();

            if (findError || !existing) {
                return new Response(
                    JSON.stringify({ error: 'Not Found: Staff member not found under this company' }),
                    { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }

            const updatedData = {
                ...(existing.data_submitted as any),
                ...body
            };

            const { error: updateError } = await supabase
                .from('invited_employees')
                .update({ 
                    data_submitted: updatedData,
                    updated_at: new Date().toISOString()
                })
                .eq('id', existing.id);

            if (updateError) throw updateError;

            return new Response(
                JSON.stringify({
                    success: true,
                    message: 'Staff profile updated successfully',
                    updated_fields: Object.keys(body)
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // 3. Health Check / Info
        if (req.method === 'GET') {
            return new Response(
                JSON.stringify({
                    status: 'online',
                    api_version: 'v1.0.0',
                    authenticated_as: company.company_name,
                    endpoints: [
                        'POST /staff - Create new staff/issue card',
                        'PATCH /staff/:id - Update staff profile',
                        'GET /health - This endpoint'
                    ]
                }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        return new Response(
            JSON.stringify({ error: 'Method Not Allowed' }),
            { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('API Error:', error);
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', detail: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});
