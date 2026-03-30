export async function register() {
  // Polyfill localStorage for Node.js v22+ which defines localStorage as a global
  // but it throws when called without --localstorage-file flag.
  // Supabase client calls localStorage during initialization on the server side.
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

    // Test if localStorage actually works by calling it - if it throws, replace it
    let needsPolyfill = false
    try {
      if (typeof localStorage === 'undefined') {
        needsPolyfill = true
      } else {
        localStorage.getItem('__test__')
      }
    } catch {
      needsPolyfill = true
    }

    if (needsPolyfill) {
      Object.defineProperty(global, 'localStorage', {
        value: mockStorage,
        writable: true,
        configurable: true,
      })
    }
  }
}
