"use client";

import {
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthUser } from "@/store/useAuthStore";

// 🎯 Role-based navigation with improved icons
const roleBasedNavigation = {
  customer: [
    { title: "My Reviews", href: "/customer/reviews", icon: Star },
    { title: "Favorites", href: "/customer/favorites", icon: Heart },
  ],
  agent: [
    { title: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
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

interface MobileProfileSectionProps {
  user: AuthUser;
  onLogout: () => void;
  onCloseMenu: () => void;
}

const getRoleDisplayName = (role: string) => {
  const roleMap: Record<string, string> = {
    customer: "Customer",
    agent: "Agent",
    admin: "Administrator",
  };
  return roleMap[role] || role;
};

const MobileProfileSection = ({
  user,
  onLogout,
  onCloseMenu,
}: MobileProfileSectionProps) => {
  const getRoleBasedItems = () => {
    if (!user?.role) return [];
    return (
      roleBasedNavigation[user.role as keyof typeof roleBasedNavigation] || []
    );
  };

  const handleLogout = () => {
    onCloseMenu();
    onLogout();
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200/50 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
            {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <div className="text-sm font-medium">
              {user?.username ?? user?.email}
            </div>
            <div className="text-xs text-muted-foreground capitalize">
              {getRoleDisplayName(user?.role || "")}
            </div>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="h-4 w-4 text-red-600" />
        </Button>
      </div>

      {/* Role-specific navigation */}
      <div className="mt-3 space-y-1">
        {getRoleBasedItems().map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
              onClick={onCloseMenu}
            >
              <IconComponent className="h-4 w-4 text-primary/80" />
              <span>{item.title}</span>
            </Link>
          );
        })}

        {/* Common mobile links */}
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
          onClick={onCloseMenu}
        >
          <User className="h-4 w-4 text-primary/80" />
          <span>Profile Settings</span>
        </Link>

        {user?.role === "agent" && (
          <Link
            href="/agent/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
            onClick={onCloseMenu}
          >
            <Settings className="h-4 w-4 text-primary/80" />
            <span>Agent Settings</span>
          </Link>
        )}

        {user?.role === "admin" && (
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
            onClick={onCloseMenu}
          >
            <Settings className="h-4 w-4 text-primary/80" />
            <span>Admin Settings</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileProfileSection;
