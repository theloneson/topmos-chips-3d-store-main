
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.0";

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
    // Get request body with admin credentials
    const { email, password, full_name } = await req.json();
    
    // Validate inputs
    if (!email || !password || !full_name) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Email, password and full name are required" 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
    
    // Create Supabase admin client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Create user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name }
    });
    
    if (authError) {
      throw authError;
    }
    
    // Set user role to admin
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        role: 'admin',
        full_name
      })
      .eq('id', authData.user.id);
    
    if (profileError) {
      throw profileError;
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Admin user created successfully",
        user: {
          id: authData.user.id,
          email: authData.user.email
        }
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error creating admin user:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
