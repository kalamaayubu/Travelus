"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/authSlice";
import { logout } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function LogInOutBtn() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.user_metadata?.role as string | undefined;

  const dashboardPath =
    role === "rider"
      ? "/rider"
      : role === "driver"
        ? "/driver"
        : role === "admin"
          ? "/admin/dashboard"
          : "/";

  const handleLogout = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    const res = await logout();
    if (res?.error) {
      toast.error("Oops! something went wrong.");
      return;
    }

    dispatch(clearUser());
    router.push("/");
    toast.success(res.message);
  };

  // Close the dropdown whenever we are on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isLoggedIn) {
    return (
      <button
        onClick={handleLogout}
        className="primary-btn w-full max-w-40 h-10 text-white flex items-center justify-center mx-auto md:w-auto md:max-w-none md:mx-0"
      >
        Login
      </button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button className="secondary-btn outline-none flex items-center justify-center gap-2 h-10 w-full max-w-40 mx-auto md:w-auto md:max-w-none md:mx-0">
          <User className="w-4 h-4" />
          <span>Account</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 text-gray-100 border border-gray-700 min-w-40">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(dashboardPath)}
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-700" />
        <DropdownMenuItem
          className="cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
