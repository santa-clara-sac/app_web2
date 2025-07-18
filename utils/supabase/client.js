
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DATABASE
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY
export const supabase = createClient(supabaseUrl, supabaseKey)