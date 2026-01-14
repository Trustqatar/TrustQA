// Supabase Configuration
// Replace these with your actual Supabase project credentials
// Get them from: https://app.supabase.com -> Your Project -> Settings -> API

const SUPABASE_URL = 'https://nznlfzakmrwhsejxobmq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bmxmemFrbXJ3aHNlanhvYm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMzYwODcsImV4cCI6MjA4MzYxMjA4N30.u1iV566o0Z9Q2k7sSIpygdLX-i9opyjCNV60PI4tROs';

// Initialize Supabase client
// The UMD build exposes supabase as a global variable
if (typeof supabase !== 'undefined') {
  window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('Supabase client initialized');
} else {
  console.error('Supabase library not loaded. Make sure the Supabase CDN script loads before this file.');
}
