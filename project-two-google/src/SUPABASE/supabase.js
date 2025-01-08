import { createClient } from '@supabase/supabase-js'

// Asegúrate de que estas variables de entorno existen
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

//Seguridad:

// La URL te identifica en qué proyecto de Supabase estás trabajando
// La clave anónima permite acceder a los recursos públicos de tu base de datos