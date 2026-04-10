import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-10 md:py-20 px-6 md:px-0">
        {children}
      </div>
      <Footer />
    </section>
  );
}
