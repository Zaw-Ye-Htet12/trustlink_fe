import { NavBar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import "../globals.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
