// Rider finding rides just in their dashboard

import AvailableRidesSection from "@/components/AvailableRidesSection";
import ScrollToTopOnMount from "@/components/ScrollToTopOnMount";
import NotificationPermission from "@/lib/firebase/NotificationPermission";

export default function AvailableRidesPage() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <ScrollToTopOnMount />
      <AvailableRidesSection showHeading={false} />
      <NotificationPermission />
    </div>
  );
}
