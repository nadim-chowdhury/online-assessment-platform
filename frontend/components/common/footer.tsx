import Image from "next/image";
import { Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-footer px-4 py-4 md:px-6 md:py-3 md:h-20 flex items-center justify-center">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0 w-full">
        {/* Left Powered by logo */}
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-3">
          <span className="text-sm text-footer-foreground/70">Powered by</span>
          <Image
            src="/assets/logo-white.png"
            alt="Akij Resource Logo"
            width={480}
            height={160}
            className="h-7 w-auto object-contain self-start md:h-8"
          />
        </div>

        {/* Right Helpline info */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
          <span className="text-sm font-medium text-footer-foreground/70">
            Helpline
          </span>

          <a
            href="tel:+8801102020250"
            className="flex items-center gap-1.5 text-sm text-footer-foreground/90 transition-colors hover:text-footer-foreground"
          >
            <Phone className="h-5 w-5" />
            +88 011020202505
          </a>

          <a
            href="mailto:support@akij.work"
            className="flex items-center gap-1.5 text-sm text-footer-foreground/90 transition-colors hover:text-footer-foreground"
          >
            <Mail className="h-5 w-5" />
            support@akij.work
          </a>
        </div>
      </div>
    </footer>
  );
}
