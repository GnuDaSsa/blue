// Shared session store for API routes
// In production, replace with Redis or a proper database

interface SessionData {
  storyboard: any;
  timestamp: number;
}

class SessionStore {
  private store = new Map<string, SessionData>();

  set(key: string, value: SessionData) {
    this.store.set(key, value);
  }

  get(key: string): SessionData | undefined {
    return this.store.get(key);
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  delete(key: string) {
    this.store.delete(key);
  }

  cleanup(maxAge: number = 30 * 60 * 1000) {
    const now = Date.now();
    for (const [key, value] of this.store.entries()) {
      if (now - value.timestamp > maxAge) {
        this.store.delete(key);
      }
    }
  }
}

// Export singleton instance
export const sessionStore = new SessionStore();

// Cleanup old sessions periodically
if (typeof window === 'undefined') {
  setInterval(() => {
    sessionStore.cleanup();
  }, 5 * 60 * 1000); // Run every 5 minutes
}
