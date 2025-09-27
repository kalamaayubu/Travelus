import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  MoreVertical,
  HelpCircle,
  CreditCard,
} from "lucide-react";
import { logout } from "@/actions/auth.action";
import { clearUser } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

type MoreDropdownProps = {
  dispatch: AppDispatch;
};

const MoreDropdown = ({ dispatch }: MoreDropdownProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent outline-none p-0 rounded-none">
        <div className="flex flex-col gap-[2px] cursor-pointer items-center text-xs text-gray-300 hover:text-gray-100">
          <MoreVertical className="w-4 h-4" />
          More
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800/90 backdrop-blur-sm rounded-md border p-0 border-white/10">
        <DropdownMenuLabel className="text-gray-200 py-1 px-3 text-sm">
          More options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-3 text-sm text-gray-200 hover:bg-gray-500/30 cursor-pointer rounded-none hover:text-white transition-all duration-300"
          onClick={() => router.push("/rider/profile")}
        >
          <User className="w-[15px]" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center  gap-3 text-sm text-gray-200 hover:bg-gray-500/30 cursor-pointer rounded-none hover:text-white transition-all duration-300"
          onClick={() => router.push("/rider/settings")}
        >
          <Settings className="w-[15px]" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center  gap-3 text-sm text-gray-200 hover:bg-gray-500/30 cursor-pointer rounded-none hover:text-white transition-all duration-300"
          onClick={() => router.push("/rider/payments")}
        >
          <CreditCard className="w-[15px]" />
          Payments
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center  gap-3 text-sm text-gray-200 hover:bg-gray-500/30 cursor-pointer rounded-none hover:text-white transition-all duration-300"
          onClick={() => router.push("/rider/settings")}
        >
          <HelpCircle className="w-[15px]" />
          Help
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center  gap-3 text-sm text-gray-200 rounded-none hover:bg-red-500/80 hover:text-white transition-all duration-300"
          onClick={() => {
            dispatch(clearUser());
            logout();
            router.push("/auth/login");
          }}
        >
          <LogOut className="w-[15px]" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdown;
