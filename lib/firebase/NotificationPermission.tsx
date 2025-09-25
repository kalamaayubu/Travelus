"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { requestNotificationPermission } from "@/lib/firebase/requestNotificationPermission";

const NotificationPermission = () => {
  // Ask notification permission when user visits the available rides page
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes("available-rides")) {
      const subscribeUser = async () => {
        await requestNotificationPermission();
      };

      subscribeUser();
    }
  }, [pathname]);

  return null; // No UI, just runs logic
};

export default NotificationPermission;
