'use client';

import { useEffect, useState } from 'react';
import { getSession, logout } from '@/actions/auth.action';  // Import Server Action
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LogInOutBtn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch session from server action
    const fetchSession = async () => {
      const session = await getSession();  // Call Server Action to get session
      setIsLoggedIn(!!session);  // Update the state based on session presence
    };

    fetchSession();
  }, []);  // This effect runs once when the component is mounted

  const handleLogout = async () => {
    const res = await logout();
    if (res.error) {
      toast.error(res.error);
      return;
    }

    // After logout, refetch session and update the UI
    const session = await getSession();  // Re-fetch the session after logout
    setIsLoggedIn(!!session);  // Update the state to reflect the logout state

    // Redirect to home page after logout
    router.replace('/');  // Redirect to the homepage
    toast.success(res.message);
  };

  if (isLoggedIn) {
    return (
      <span onClick={handleLogout} className="hover:text-green-400 cursor-pointer">
        Log Out
      </span>
    );
  }

  return (
    <Link href="/auth/login" className="btn btn-primary">
      Login
    </Link>
  );
}
