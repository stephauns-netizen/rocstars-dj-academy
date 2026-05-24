'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, resetPassword, useAuth } from '@/lib/auth';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already signed in, jump to dashboard
  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [user, loading, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signIn(email, password);
      router.push('/admin');
    } catch (err) {
      const code = (err as { code?: string })?.code;
      const friendly =
        code === 'auth/invalid-credential' || code === 'auth/wrong-password'
          ? 'Wrong email or password.'
          : code === 'auth/too-many-requests'
          ? 'Too many attempts. Wait a minute and try again.'
          : (err as Error)?.message || 'Sign-in failed.';
      setError(friendly);
      setSubmitting(false);
    }
  };

  const onReset = async () => {
    setError('');
    setNotice('');
    if (!email) {
      setError('Enter your email above first, then tap "Forgot password?"');
      return;
    }
    try {
      await resetPassword(email);
      setNotice(`Reset link sent to ${email}. Check your inbox (and spam) to set a new password.`);
    } catch (err) {
      const code = (err as { code?: string })?.code;
      setError(
        code === 'auth/invalid-email'
          ? 'That email doesn’t look right.'
          : code === 'auth/too-many-requests'
          ? 'Too many attempts. Wait a minute and try again.'
          : (err as Error)?.message || 'Could not send reset email.'
      );
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 pt-32 pb-24">
      <Container>
        <div className="max-w-md mx-auto p-8 md:p-10 border border-line rounded-lg bg-gradient-to-b from-[#0E0E18] to-[#08080F]">
          <span className="text-[11px] tracking-[.32em] uppercase text-text-mute font-semibold">
            Admin
          </span>
          <h1 className="display text-[clamp(36px,5vw,52px)] leading-none mt-2 mb-7">
            Sign <span className="gradient-text">in.</span>
          </h1>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <label className="grid gap-2">
              <span className="text-[11px] tracking-[.22em] uppercase text-text-mute font-semibold">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#06060B] border border-line-bright rounded px-4 py-3 text-white outline-none focus:border-violet/60 transition-colors"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-[11px] tracking-[.22em] uppercase text-text-mute font-semibold">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#06060B] border border-line-bright rounded px-4 py-3 text-white outline-none focus:border-violet/60 transition-colors"
              />
            </label>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded px-3 py-2.5">
                {error}
              </div>
            )}
            {notice && (
              <div className="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded px-3 py-2.5">
                {notice}
              </div>
            )}

            <div className="flex items-center justify-between gap-4 mt-2">
              <Button type="submit">
                {submitting ? 'Signing in…' : 'Sign in'}
              </Button>
              <button
                type="button"
                onClick={onReset}
                className="text-[13px] text-text-mute hover:text-white underline underline-offset-4 transition-colors"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </div>
      </Container>
    </main>
  );
}
