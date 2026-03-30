import { AsyncLocalStorage } from 'node:async_hooks';

interface VisitorContext {
  ua: string;
  ip: string;
}

export const visitorStore = new AsyncLocalStorage<VisitorContext>();
