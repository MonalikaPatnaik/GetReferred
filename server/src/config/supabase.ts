import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// // Load environment variables
// const result = dotenv.config();

// if (result.error) {
//   console.error('Error loading .env file:', result.error);
//   process.exit(1);
// }

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   console.error('Missing required environment variables:', {
//     SUPABASE_URL: !!process.env.SUPABASE_URL,
//     SUPABASE_ANON_KEY: !!process.env.SUPABASE_ANON_KEY
//   });
//   throw new Error('Missing Supabase credentials. Please check your .env file.');
// }

export const supabase = createClient(supabaseUrl as string, supabaseKey as string);
