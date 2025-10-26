import AuthGuard from "@/components/common/AuthGuard";
import { Footer } from "@/components/common/Footer";
import { NavBar } from "@/components/common/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="customer">
      <NavBar />
      {children}
      <Footer />
    </AuthGuard>
  );
}
