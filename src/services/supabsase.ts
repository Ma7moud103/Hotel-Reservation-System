import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yblweksvjcdornkzoghu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibHdla3N2amNkb3Jua3pvZ2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNzc2MzYsImV4cCI6MjA0OTc1MzYzNn0.BR-cn7pP_rsmwe0mhFLY8h7gYQcaJn28VKEOE9qgR7U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
