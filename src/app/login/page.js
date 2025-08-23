'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { Suspense, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import SocialSignin from '@/components/shared/SocialSignin';

export const dynamic = 'force-dynamic';

// prevent loops & open-redirects
function safeRedirect(url, origin) {
  try {
    const u = new URL(url, origin);          // supports relative paths
    if (u.origin !== origin) return '/';     // same-origin only
    if (u.pathname.startsWith('/login') || u.pathname.startsWith('/api/auth')) {
      return '/';                            // never go back to login/auth
    }
    return u.pathname + u.search + u.hash;
  } catch {
    return '/';
  }
}

function LoginInner() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();

  // accept both ?callbackUrl= and ?redirect=
  const raw = searchParams.get('callbackUrl') || searchParams.get('redirect') || '/';
  const redirectTo = typeof window === 'undefined'
    ? '/' // SSR safety
    : safeRedirect(raw, window.location.origin);

  // If already signed in, bounce away
  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(redirectTo);
    }
  }, [status, redirectTo, router]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const email = (fd.get('email') || '').toString();
    const password = (fd.get('password') || '').toString();

    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: redirectTo,   // sanitized target
    });
  };

  return (
    <div className="container px-6 md:px-24 mx-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image
            src="/login.jpg"
            height={540}
            width={540}
            alt="Login illustration"
            priority
          />
        </div>

        <div className="border-2 p-8 md:p-12 rounded-lg">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">Sign In</h6>

          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" placeholder="your email"
                   className="mt-3 w-full input input-bordered" required />

            <div className="h-4" />

            <label htmlFor="password">Password</label>
            <input id="password" type="password" name="password" placeholder="your password"
                   className="w-full mt-3 input input-bordered" required />

            <button type="submit" className="w-full btn btn-primary mt-12 text-lg">Sign In</button>
          </form>

          <div>
            <h6 className="my-12 text-center">or sign in with</h6>
            <SocialSignin />
            <h6 className="my-12 text-center">
              not have account? <Link className="text-primary font-semibold" href="/signup">Sign Up</Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading…</div>}>
      <LoginInner />
    </Suspense>
  );
}
