export async function register() {
  // Polyfill localStorage for Node.js v25+ which defines it as a global
  // but requires --localstorage-file flag to make it functional.
  // Supabase client calls localStorage during initialization.
  if (typeof global !== 'undefined') {
    const memStore: Record<string, string> = {}
    const mockStorage = {
      getItem: (key: string) => memStore[key] ?? null,
      setItem: (key: string, value: string) => { memStore[key] = value },
      removeItem: (key: string) => { delete memStore[key] },
      clear: () => { Object.keys(memStore).forEach(k => delete memStore[k]) },
      key: (index: number) => Object.keys(memStore)[index] ?? null,
      get length() { return Object.keys(memStore).length },
    }
    try {
      // Only patch if localStorage exists but getItem is not a function
      if (typeof localStorage !== 'undefined' && typeof localStorage.getItem !== 'function') {
        Object.defineProperty(global, 'localStorage', {
          value: mockStorage,
          writable: true,
          configurable: true,
        })
      }
    } catch {
      // If localStorage is not defined at all, define it
      Object.defineProperty(global, 'localStorage', {
        value: mockStorage,
        writable: true,
        configurable: true,
      })
    }
  }
}
