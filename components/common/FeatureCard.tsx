"use client";

import { ShieldCheck, Lock, Star } from "lucide-react";

function FeatureCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm flex gap-4 items-start">
      <div className="p-3 rounded-lg bg-sky-50 text-sky-700">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{desc}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Verified Agents"
          desc="Agents verified by our team to ensure trust and safety."
          icon={<ShieldCheck className="h-6 w-6" />}
        />
        <FeatureCard
          title="Secure Platform"
          desc="End-to-end secure communications and payments."
          icon={<Lock className="h-6 w-6" />}
        />
        <FeatureCard
          title="Community Reviews"
          desc="Real feedback from the community to guide your choices."
          icon={<Star className="h-6 w-6" />}
        />
      </div>
    </section>
  );
}