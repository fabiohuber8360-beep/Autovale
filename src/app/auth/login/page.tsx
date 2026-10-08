'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { LogoFallback } from '@/components/shared/Logo';
import { getBrowserClient } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email,         setEmail]         = useState('');
  const [password,      setPassword]      = useState('');
  const [useMagicLink,  setUseMagicLink]  = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [loading,       setLoading]       = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getBrowserClient();

      if (useMagicLink) {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        setMagicLinkSent(true);
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Anmeldung fehlgeschlagen';
      // Friendlier German error messages
      if (msg.includes('Invalid login credentials')) {
        setError('E-Mail oder Passwort ist falsch.');
      } else if (msg.includes('Email not confirmed')) {
        setError('Bitte bestätige zuerst deine E-Mail-Adresse.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <LogoFallback size="lg" />
          </Link>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Willkommen zurück</h1>
          <p className="text-sm text-stone-500">Melde dich an, um deine Inserate zu verwalten</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
          {magicLinkSent ? (
            <div className="text-center py-4">
              <Mail className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-stone-800 mb-2">E-Mail gesendet</h2>
              <p className="text-sm text-stone-500">
                Wir haben dir einen Anmeldelink an <strong>{email}</strong> gesendet.
                Prüfe deinen Posteingang.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Toggle */}
              <div className="flex bg-stone-100 rounded-xl p-1">
                <button type="button" onClick={() => setUseMagicLink(false)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    !useMagicLink ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>
                  E-Mail & Passwort
                </button>
                <button type="button" onClick={() => setUseMagicLink(true)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                    useMagicLink ? 'bg-white text-stone-800 shadow-sm' : 'text-stone-500'}`}>
                  Magic Link
                </button>
              </div>

              {error && (
                <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">E-Mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    required placeholder="deine@email.ch"
                    className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
              </div>

              {!useMagicLink && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Passwort</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                      required placeholder="Passwort"
                      className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <div className="mt-1.5 text-right">
                    <Link href="/auth/passwort-vergessen" className="text-xs text-orange-600 hover:text-orange-700">
                      Passwort vergessen?
                    </Link>
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-60 disabled:cursor-wait">
                {loading ? 'Bitte warten…' : useMagicLink ? 'Magic Link senden' : 'Anmelden'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
              Noch kein Konto?{' '}
              <Link href="/auth/registrieren" className="text-orange-600 font-medium hover:text-orange-700">
                Registrieren
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
