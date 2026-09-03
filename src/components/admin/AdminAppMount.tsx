"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function loadAdminApp() {
  const main = document.getElementById("main-content");
  if (main) main.style.display = "none";

  let app = document.getElementById("app");
  if (!app) {
    app = document.createElement("div");
    app.id = "app";
    document.body.appendChild(app);
  }

  if (!document.querySelector('script[data-admin-app="true"]')) {
    const script = document.createElement("script");
    script.src = "/admin/app.js?v=14";
    script.dataset.adminApp = "true";
    script.onload = () => {
      document.querySelector(".admin-loading")?.remove();
    };
    document.body.appendChild(script);
  } else {
    document.querySelector(".admin-loading")?.remove();
  }
}

function cleanupAdminApp() {
  document.getElementById("main-content")?.style.removeProperty("display");
  document.getElementById("app")?.remove();
  document.querySelector('script[data-admin-app="true"]')?.remove();
}

export function AdminAppMount() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.startsWith("/admin")) return;

    loadAdminApp();

    return () => {
      cleanupAdminApp();
    };
  }, [pathname]);

  return (
    <main id="main-content">
      <p className="admin-loading" suppressHydrationWarning>
        Загрузка админ-панели…
      </p>
    </main>
  );
}
