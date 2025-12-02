// Shared session store for API routes
// In production, replace with Redis or a proper database

interface SessionData {
  storyboard: any;
  timestamp: number;
}

class SessionStore {
  private store = new Map<string, SessionData>();

  set(key: string, value: SessionData) {
    console.log(`[SessionStore] Setting session: ${key}`);
    this.store.set(key, value);
    console.log(`[SessionStore] Current sessions count: ${this.store.size}`);
  }

  get(key: string): SessionData | undefined {
    console.log(`[SessionStore] Getting session: ${key}`);
    const data = this.store.get(key);
    console.log(`[SessionStore] Found: ${data ? 'yes' : 'no'}`);
    return data;
  }

  has(key: string): boolean {
    const exists = this.store.has(key);
    console.log(`[SessionStore] Checking session ${key}: ${exists}`);
    return exists;
  }

  delete(key: string) {
    this.store.delete(key);
  }

  cleanup(maxAge: number = 30 * 60 * 1000) {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now - value.timestamp > maxAge) {
        console.log(`[SessionStore] Cleaning up expired session: ${key}`);
        this.store.delete(key);
      }
    }
  }

  debug() {
    console.log(`[SessionStore] Total sessions: ${this.store.size}`);
    console.log(`[SessionStore] Keys:`, Array.from(this.store.keys()));
  }
}

// Use global to persist across HMR in development
const globalForSession = global as typeof globalThis & {
  sessionStore: SessionStore;
};

// Export singleton instance - persist across HMR
export const sessionStore = globalForSession.sessionStore || new SessionStore();

if (process.env.NODE_ENV !== 'production') {
  globalForSession.sessionStore = sessionStore;
}

// Cleanup old sessions periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    sessionStore.cleanup();
  }, 5 * 60 * 1000); // Run every 5 minutes
}
