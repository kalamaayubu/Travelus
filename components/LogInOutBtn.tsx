'use client';

import { useEffect, useState } from 'react';
import { getSession, logout } from '@/actions/auth.action';  // Import Server Action
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { clearUser } from '@/redux/slices/authSlice';

export default function LogInOutBtn() {
  const dispatch = useDispatch()
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated)

  const handleLogout = async () => {
    const res = await logout();
    if (res.error) {
      toast.error("Oops! something went wrong.");
      return;
    }

    // Clear auth from store and redirect
    dispatch(clearUser())
    router.replace('/');
    toast.success(res.message);
  };

  if (isLoggedIn) {
    return (
      <button onClick={handleLogout} className="secondary-btn">
        Log out
      </button>
    );
  }

  return (
    <Link href="/auth/login" className="primary-btn w-full text-center text-white">
      Login
    </Link>
  );
}
