'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { LogoFallback } from '@/components/shared/Logo';
import { getBrowserClient } from '@/lib/supabase';

export default function RegistrierenPage() {
  const [formData,    setFormData]    = useState({ name: '', email: '', password: '' });
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [registered,  setRegistered]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.auth.signUp({
        email:    formData.email,
        password: formData.password,
        options: {
          data:              { full_name: formData.name },
          emailRedirectTo:   `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      setRegistered(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registrierung fehlgeschlagen';
      if (msg.includes('already registered')) {
        setError('Diese E-Mail-Adresse ist bereits registriert.');
      } else if (msg.includes('Password should be')) {
        setError('Das Passwort muss mindestens 6 Zeichen lang sein.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-3">Fast geschafft!</h1>
          <p className="text-stone-500 mb-6">
            Wir haben eine Bestätigungs-E-Mail an <strong>{formData.email}</strong> gesendet.
            Klicke auf den Link in der E-Mail, um dein Konto zu aktivieren.
          </p>
          <Link href="/auth/login" className="text-orange-600 font-medium hover:text-orange-700">
            Zurück zur Anmeldung
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <LogoFallback size="lg" />
          </Link>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Konto erstellen</h1>
          <p className="text-sm text-stone-500">Registriere dich, um Inserate zu erstellen und zu verwalten</p>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-stone-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input type="text" value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required placeholder="Vor- und Nachname"
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">E-Mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input type="email" value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required placeholder="deine@email.ch"
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Passwort</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input type="password" value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required minLength={8} placeholder="Mindestens 8 Zeichen"
                  className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-60 disabled:cursor-wait">
              {loading ? 'Registrieren…' : 'Registrieren'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-stone-500">
              Bereits registriert?{' '}
              <Link href="/auth/login" className="text-orange-600 font-medium hover:text-orange-700">
                Anmelden
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
