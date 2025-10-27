"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  LogOut,
  Settings,
  User,
  ShoppingBag,
  Star,
  MessageSquare,
  Briefcase,
  Users,
  LayoutDashboard,
  ClipboardList,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { AuthUser } from "@/store/useAuthStore";

// 🎯 Role-based navigation items with meaningful icons
const roleBasedNavigation = {
  customer: [
    { title: "My Reviews", href: "/customer/reviews", icon: Star },
    { title: "Favorites", href: "/customer/favorites", icon: Heart },
  ],
  agent: [
    { title: "My Services", href: "/agent/services", icon: Briefcase },
    { title: "Reviews", href: "/agent/reviews", icon: Star },
  ],
  admin: [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "Services", href: "/admin/services", icon: Briefcase },
    { title: "Bookings", href: "/admin/bookings", icon: ClipboardList },
    { title: "Reviews", href: "/admin/reviews", icon: Star },
  ],
};

interface DesktopProfileDropdownProps {
  user: AuthUser;
  onLogout: () => void;
}

const getRoleDisplayName = (role: string) => {
  const roleMap: Record<string, string> = {
    customer: "Customer",
    agent: "Agent",
    admin: "Administrator",
  };
  return roleMap[role] || role;
};

const DesktopProfileDropdown = ({
  user,
  onLogout,
}: DesktopProfileDropdownProps) => {
  const getRoleBasedItems = () => {
    if (!user?.role) return [];
    return (
      roleBasedNavigation[user.role as keyof typeof roleBasedNavigation] || []
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-2 hover:bg-accent/50 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-medium leading-none">
              {user?.username ?? user?.email}
            </span>
            <span className="text-xs text-muted-foreground capitalize">
              {getRoleDisplayName(user?.role || "")}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.username ?? user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground capitalize">
              {getRoleDisplayName(user?.role || "")}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* 🧭 Role-specific navigation */}
        {getRoleBasedItems().map((item) => {
          const IconComponent = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="cursor-pointer">
                <IconComponent className="mr-2 h-4 w-4 text-primary/80" />
                <span>{item.title}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        {user?.role === "customer" && (
          <DropdownMenuItem asChild>
            <Link href="/customer/profile" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-primary/80" />
              <span>Customer Profile</span>
            </Link>
          </DropdownMenuItem>
        )}

        {user?.role === "agent" && (
          <DropdownMenuItem asChild>
            <Link href="/agent/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-primary/80" />
              <span>Agent Profile</span>
            </Link>
          </DropdownMenuItem>
        )}

        {user?.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4 text-primary/80" />
              <span>Admin Settings</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        {/* 🚪 Logout */}
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DesktopProfileDropdown;
