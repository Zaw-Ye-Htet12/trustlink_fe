// components/layout/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigationItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Agents",
    href: "/agents",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-2 transition-transform hover:scale-105 duration-200"
        >
          <div className="w-8 h-8 bg-linear-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <span className="font-bold text-xl bg-linear-to-br from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            TrustLink
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        "group px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg",
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
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button
            asChild
            className="bg-linear-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Link href="/auth/register">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b animate-in slide-in-from-top duration-200">
          <div className="container py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button
                variant="ghost"
                asChild
                className="justify-start text-muted-foreground hover:text-foreground"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </Button>
              <Button
                asChild
                className="bg-linear-to-br from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 justify-start"
              >
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
