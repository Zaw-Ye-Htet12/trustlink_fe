// app/page.tsx
import { FeaturedAgents } from "@/components/common/FeaturedAgents";
import { FeaturedServices } from "@/components/common/FeaturedServices";
import { HeroSection } from "@/components/common/Hero";
import { PlatformStats } from "@/components/common/PlatformStats";
import { SearchSection } from "@/components/common/SearchBar";
import { ValueProposition } from "@/components/common/ValueProposition";
import { TrendingServices } from "@/components/common/TrendingServices";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection
        title="Connect with Verified Service Providers"
        description="Empowering Myanmar migrants in Thailand to find trusted agents and services through a secure and community-driven platform."
        primaryAction={{
          label: "Explore Services",
          href: "/services",
        }}
        secondaryAction={{
          label: "Become an Agent",
          href: "/auth/register?role=agent",
        }}
      />

      <SearchSection />
      <ValueProposition />
      <FeaturedServices />
      <TrendingServices />
      <FeaturedAgents />
      <PlatformStats />
    </div>
  );
}
