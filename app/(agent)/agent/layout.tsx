// app/(agent)/agent/layout.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  User,
  Star,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/common/AuthGuard";

const agentMenuItems = [
  { title: "Dashboard", href: "/agent/dashboard", icon: LayoutDashboard },
  { title: "My Services", href: "/agent/services", icon: Briefcase },
  { title: "Reviews", href: "/agent/reviews", icon: Star },
  { title: "Profile Settings", href: "/agent/profile", icon: User },
];

function AgentLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    clearAuth();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden fixed top-4 left-4 z-50 bg-white shadow-sm border"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                  {user?.username?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.username || "Agent"}
                  </p>
                  <p className="text-xs text-gray-500">Professional Account</p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
              {agentMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                      isActive(item.href)
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t">
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-1 min-h-0 border-r bg-white">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-6 mb-8">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">TL</span>
                </div>
                <span className="ml-2 font-bold text-lg bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  TrustLink Pro
                </span>
              </div>

              <nav className="flex-1 px-4 space-y-1">
                {agentMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "bg-green-50 text-green-700 border border-green-200 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.username || "Agent"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="mt-1 text-xs text-red-600 hover:text-red-700 p-0 h-auto"
                  >
                    Sign out
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="agent">
      <AgentLayoutContent>{children}</AgentLayoutContent>
    </AuthGuard>
  );
}
