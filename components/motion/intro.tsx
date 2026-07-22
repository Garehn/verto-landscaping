'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

// Coordinates the preloader with hero enter animations: the hero waits for
// `ready` so its reveal happens as the curtain lifts, not behind it.
const IntroContext = createContext<{ ready: boolean; setReady: (v: boolean) => void }>({
  ready: false,
  setReady: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  return useContext(IntroContext);
}
