// components/content/ValueProposition.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Target, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified & Trusted",
    description:
      "Every agent undergoes thorough verification to ensure safety and reliability.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Built by and for the Myanmar migrant community in Thailand.",
  },
  {
    icon: Target,
    title: "Quality Assured",
    description:
      "Maintain high standards through reviews and continuous monitoring.",
  },
  {
    icon: Heart,
    title: "Social Impact",
    description:
      "Empowering migrants through access to reliable services and opportunities.",
  },
];

export function ValueProposition() {
  return (
    <section className=" py-16 bg-background">
      <div className="max-w-7xl container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose TrustLink?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are building a trusted ecosystem where quality service meets
            community needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 text-center hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
