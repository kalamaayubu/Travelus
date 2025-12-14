"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { clearUser } from "@/redux/slices/authSlice";
import { logout } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogInOutBtn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleClick = async () => {
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

  return (
    <button
      onClick={handleClick}
      className={isLoggedIn ? "secondary-btn" : "primary-btn w-full text-white"}
    >
      {isLoggedIn ? "Log out" : "Login"}
    </button>
  );
}
