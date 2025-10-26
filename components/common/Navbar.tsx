// components/common/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import MobileProfileSection from "./MobileProfileSection";
import DesktopProfileDropdown from "./DesktopProfileDropdown";

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "Services", href: "/services" },
  { title: "Agents", href: "/agents" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();

  const logout = () => {
    clearAuth();
    toast.success("You have been logged out successfully.");
    router.push("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-7xl mx-auto px-6 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-transform hover:scale-105 duration-200"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-br from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            TrustLink
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <ul className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative group px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
                    "hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "text-primary bg-primary/10 font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  <span className="relative">
                    {item.title}
                    {pathname === item.href && (
                      <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full" />
                    )}
                  </span>
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <DesktopProfileDropdown user={user} onLogout={logout} />
          ) : (
            <>
              <Button
                variant="ghost"
                asChild
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-lg supports-backdrop-filter:bg-background/80 border-b animate-in slide-in-from-top duration-200">
          <div className="container py-4 space-y-1">
            <nav>
              <ul className="space-y-1">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "text-primary bg-primary/10 font-semibold border-l-4 border-primary"
                          : "text-muted-foreground"
                      )}
                      onClick={closeMobileMenu}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-3 pt-4">
              {user ? (
                <MobileProfileSection
                  user={user}
                  onLogout={logout}
                  onCloseMenu={closeMobileMenu}
                />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    asChild
                    className="justify-start text-muted-foreground hover:text-foreground h-12 text-base"
                  >
                    <Link href="/auth/login" onClick={closeMobileMenu}>
                      Login
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-gradient-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white justify-start h-12 text-base"
                  >
                    <Link href="/auth/register" onClick={closeMobileMenu}>
                      Sign Up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
