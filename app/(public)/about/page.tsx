import { NavBar } from "@/components/common/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description:
        "Every agent is thoroughly verified to ensure your safety and peace of mind.",
    },
    {
      icon: Users,
      title: "Community First",
      description:
        "Built by the community, for the community. We understand your needs.",
    },
    {
      icon: Target,
      title: "Quality Service",
      description:
        "We maintain high standards through reviews and continuous monitoring.",
    },
    {
      icon: Heart,
      title: "Social Impact",
      description:
        "Empowering migrants through access to reliable services and opportunities.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About TrustLink
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              TrustLink is a community-centric platform designed to connect
              Myanmar migrants in Thailand with verified and reliable service
              providers. We are building trust, one service at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To create a safe, reliable platform that empowers Myanmar
                  migrants in Thailand by connecting them with verified service
                  providers, reducing exploitation, and building trust within
                  the community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To become the most trusted service platform for migrant
                  communities in Southeast Asia, fostering economic empowerment
                  and social integration through technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Making a Difference
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "500+", label: "Verified Agents" },
              { value: "10,000+", label: "Community Members" },
              { value: "50+", label: "Service Categories" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
