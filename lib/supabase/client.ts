import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your-supabase-url') {
        throw new Error(
            'Missing or invalid Supabase environment variables. Please check your .env.local file. See README.md for setup instructions.'
        );
    }

    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
