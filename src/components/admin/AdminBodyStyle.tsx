"use client";

import { useEffect } from "react";

export function AdminBodyStyle() {
  useEffect(() => {
    const prev = document.body.style.background;
    const prevColor = document.body.style.color;
    document.body.style.background = "#0f171c";
    document.body.style.color = "#eef2f6";
    return () => {
      document.body.style.background = prev;
      document.body.style.color = prevColor;
    };
  }, []);

  return null;
}
