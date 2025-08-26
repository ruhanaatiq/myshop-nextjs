// src/app/login/page.js
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import SocialSignin from '@/components/shared/SocialSignin';

// v4-safe redirect sanitizer
function safeRedirect(url, origin) {
  try {
    const u = new URL(url, origin);          // supports relative paths
    if (u.origin !== origin) return '/';     // same-origin only
    if (u.pathname.startsWith('/login') || u.pathname.startsWith('/api/auth')) {
      return '/products';                    // avoid loops
    }
    return u.pathname + u.search + u.hash;
  } catch {
    return '/products';
  }
}

function LoginInner() {
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();

  // accept both ?callbackUrl= and ?redirect=
  const wanted = searchParams.get('callbackUrl') || searchParams.get('redirect') || '/products';
  const redirectTo =
    typeof window === 'undefined' ? '/products' : safeRedirect(wanted, window.location.origin);

  // If already signed in, bounce away
  useEffect(() => {
    if (status === 'authenticated') router.replace(redirectTo);
  }, [status, redirectTo, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '');
    const password = String(fd.get('password') || '');

    // v4 client API
    await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: redirectTo,
    });
  };

  return (
    <div className="container px-6 md:px-24 mx-auto py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          <Image src="/login.jpg" height={540} width={540} alt="Login illustration" priority />
        </div>

        <div className="border-2 p-8 md:p-12 rounded-lg">
          <h6 className="text-3xl font-semibold text-primary text-center mb-12">Sign In</h6>

          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your email"
              className="mt-3 w-full input input-bordered"
              required
            />

            <div className="h-4" />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="your password"
              className="w-full mt-3 input input-bordered"
              required
            />

            <button type="submit" className="w-full btn btn-primary mt-12 text-lg">
              Login
            </button>
          </form>

          <div>
            <h6 className="my-12 text-center">or sign in with</h6>
            <SocialSignin /> {/* uses signIn('google') etc., still v4 */}
            <h6 className="my-12 text-center">
              not have account?{' '}
              <Link className="text-primary font-semibold" href="/signup">
                Sign Up
              </Link>
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
