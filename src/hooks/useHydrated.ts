"use client";

import { useEffect, useState } from "react";

/** True only after the component has mounted on the client (post-hydration). */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
