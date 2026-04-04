"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

/**
 * Loads the chatbot after idle time so first interactions (nav, scroll) are not
 * competing with Framer Motion + chat bundle on the main thread (INP).
 */
export default function DeferredChatbot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return <Chatbot />;
}
