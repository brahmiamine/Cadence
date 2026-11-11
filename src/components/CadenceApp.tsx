"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { startCadence } from "@/lib/cadence/engine";

type Props = {
  initial: unknown;
  user: { name: string; email: string };
};

/**
 * Espace personnel de l’utilisateur. Le moteur d’interface historique de Cadence
 * est monté sur ce balisage ; les données sont lues/écrites via /api/data (base de données).
 */
export default function CadenceApp({ initial, user }: Props) {
  useEffect(() => {
    return startCadence({
      initial,
      user,
      save: async (data: unknown) => {
        const res = await fetch("/api/data", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      },
      fetchLatest: async () => {
        const res = await fetch("/api/data", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      },
      onLogout: () => signOut({ callbackUrl: "/login" }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="startup" aria-hidden="true">
        <img src="/assets/icon.svg" width={84} height={84} alt="" />
        <span className="startup-name">
          Cadence<b>.</b>
        </span>
        <span className="startup-motto">Un jour à la fois</span>
        <span className="startup-tiles">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
      <a className="skip" href="#main">
        Aller au contenu
      </a>
      <div className="layout">
        <div className="workspace">
          <header id="top-header"></header>
          <main id="main" tabIndex={-1}></main>
          <footer className="foot">
            <span>
              CADENCE <b>✦</b> UN JOUR À LA FOIS
            </span>
            <span id="connection"></span>
          </footer>
        </div>
      </div>
      <dialog id="dialog"></dialog>
      <input id="import-file" type="file" accept=".json,application/json" hidden />
      <div id="toast" role="status" aria-live="polite"></div>
      <div id="sparks" aria-hidden="true"></div>
    </>
  );
}
