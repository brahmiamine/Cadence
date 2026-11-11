"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const register = mode === "register";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");
    try {
      if (register) {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.get("name"), email, password }),
        });
        if (!res.ok) {
          setError((await res.json().catch(() => null))?.error ?? "Inscription impossible.");
          return;
        }
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError(register ? "Compte créé, mais la connexion a échoué. Réessayez." : "E-mail ou mot de passe incorrect.");
        return;
      }
      window.location.assign("/");
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth">
      <form className="auth-card" onSubmit={onSubmit}>
        <img src="/assets/icon.svg" width={64} height={64} alt="" />
        <h1>
          Cadence<span>.</span>
        </h1>
        <p>{register ? "Créez votre espace personnel." : "Connectez-vous à votre carnet d’habitudes."}</p>
        {register && (
          <label>
            Nom
            <input name="name" required maxLength={60} autoComplete="name" />
          </label>
        )}
        <label>
          E-mail
          <input name="email" type="email" required maxLength={254} autoComplete="email" />
        </label>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            required
            minLength={register ? 8 : 1}
            maxLength={200}
            autoComplete={register ? "new-password" : "current-password"}
          />
        </label>
        {register && <small>8 caractères minimum.</small>}
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button className="primary" type="submit" disabled={busy}>
          {busy ? "Patientez…" : register ? "Créer mon compte" : "Se connecter"}
        </button>
        <p className="auth-alt">
          {register ? (
            <>
              Déjà un compte ? <Link href="/login">Se connecter</Link>
            </>
          ) : (
            <>
              Pas encore de compte ? <Link href="/register">S’inscrire</Link>
            </>
          )}
        </p>
      </form>
    </main>
  );
}
