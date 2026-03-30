import { browser } from '$app/environment';

interface VisitorContext {
  ua: string;
  ip: string;
}

// Kita buat placeholder untuk browser, dan real store untuk server
let visitorStore: any = {
  run: (_: any, fn: any) => fn(),
  getStore: () => undefined
};

if (!browser) {
  // Hanya import AsyncLocalStorage jika di server
  // Pake dynamic import + require-like string biar Vite gak ngikutin ke browser
  const { AsyncLocalStorage } = await import('node:async_hooks');
  visitorStore = new AsyncLocalStorage<VisitorContext>();
}

export { visitorStore };
