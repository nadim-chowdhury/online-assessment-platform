import { Footer } from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </section>
  );
}
