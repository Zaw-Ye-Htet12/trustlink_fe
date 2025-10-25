// components/common/Hero.tsx
"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
}

export function HeroSection({
  title,
  description,
  primaryAction,
  secondaryAction,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
      <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000" />

      <div className="relative container mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight animate-slide-up">
            {title}
          </h1>

          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed animate-slide-up delay-200">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-slide-up delay-400">
            {primaryAction && (
              <Button
                size="lg"
                asChild
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Link href={primaryAction.href}>{primaryAction.label}</Link>
              </Button>
            )}
            {secondaryAction && (
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
