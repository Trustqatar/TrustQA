// Supabase Edge Function: Check if user exists
// Verifies if an email or phone number exists in Supabase Auth before allowing password reset

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, phone } = await req.json()

    if (!email && !phone) {
      return new Response(
        JSON.stringify({ error: 'Email or phone is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get Supabase client with service role key for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Check if user exists by listing users
    const { data: usersData, error: userError } = await supabase.auth.admin.listUsers()

    if (userError) {
      console.error('Error listing users:', userError)
      return new Response(
        JSON.stringify({ error: 'Failed to check user existence' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let user = null

    if (email) {
      // Find user by email (case-insensitive)
      user = usersData.users.find(u => u.email?.toLowerCase() === email.toLowerCase())
      
      if (!user) {
        return new Response(
          JSON.stringify({ exists: false, message: 'No account found with this email address' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else if (phone) {
      // Find user by phone number
      // Phone can be in user.phone or user.user_metadata.phone
      // Normalize phone number (remove spaces, dashes, etc.)
      const normalizedPhone = phone.replace(/\D/g, '')
      
      user = usersData.users.find(u => {
        const userPhone = u.phone?.replace(/\D/g, '') || 
                         u.user_metadata?.phone?.replace(/\D/g, '') ||
                         u.user_metadata?.phone_number?.replace(/\D/g, '')
        return userPhone === normalizedPhone
      })
      
      if (!user) {
        return new Response(
          JSON.stringify({ exists: false, message: 'No account found with this phone number' }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ exists: true, message: 'User found' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
