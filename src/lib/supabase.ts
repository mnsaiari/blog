import { createBrowserClient } from '@supabase/ssr'

// Safe in-memory storage for environments where localStorage is unavailable
const memoryStorage: Record<string, string> = {}
const safeStorage = {
  getItem: (key: string) => memoryStorage[key] ?? null,
  setItem: (key: string, value: string) => { memoryStorage[key] = value },
  removeItem: (key: string) => { delete memoryStorage[key] },
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storage: typeof window !== 'undefined' ? window.localStorage : safeStorage,
      },
    }
  )
}
