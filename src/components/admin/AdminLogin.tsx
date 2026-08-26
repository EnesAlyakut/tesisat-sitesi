"use client";

import { FormEvent, useState } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true); setError("");
    const response = await fetch("/api/admin/login/", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!response.ok) { setError(result.error || "Giriş yapılamadı."); setBusy(false); return; }
    window.location.href = "/admin/";
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#071322] px-4 py-8 sm:px-5 sm:py-12">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-white/15 bg-white p-6 sm:p-10 shadow-2xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-bold tracking-[0.2em] text-copper-600 uppercase">MARSAK TEKNİK</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink">Yönetim Paneli</h1>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft">Site içeriğini yönetmek için kullanıcı bilgilerinizle giriş yapın.</p>
        </div>
        <label className="block text-xs sm:text-sm font-semibold text-ink" htmlFor="admin-username">Kullanıcı adı</label>
        <input id="admin-username" type="text" autoComplete="username" autoCapitalize="none" spellCheck={false} required value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border border-line-strong px-4 text-base text-ink outline-none focus:border-copper-500" />
        <label className="mt-4 block text-xs sm:text-sm font-semibold text-ink" htmlFor="admin-password">Şifre</label>
        <input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 h-12 w-full rounded-xl border border-line-strong px-4 text-base text-ink outline-none focus:border-copper-500" />
        {error && <p role="alert" className="mt-3 text-xs sm:text-sm font-medium text-red-700">{error}</p>}
        <button disabled={busy} className="mt-6 h-12 w-full rounded-xl bg-copper-600 font-bold text-white transition hover:bg-copper-500 disabled:opacity-60">
          {busy ? "Giriş yapılıyor…" : "Giriş Yap"}
        </button>
        <a href="/" className="mt-5 block text-center text-xs sm:text-sm font-medium text-copper-700 hover:underline">Siteye dön</a>
      </form>
    </main>
  );
}
