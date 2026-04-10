import Image from "next/image";

export function Header() {
  return (
    <header className="relative flex items-center bg-card h-16 md:h-20 px-4 py-2.5 shadow-sm md:px-6 md:py-3">
      {/* Logo left aligned */}
      <div className="shrink-0">
        <Image
          src="/assets/logo-primary.png"
          alt="Akij Resource Logo"
          width={480}
          height={160}
          className="h-5 w-auto object-contain md:h-9"
          priority
        />
      </div>

      {/* Centered title uses absolute positioning so it stays perfectly centered regardless of logo width */}
      <h1 className="absolute inset-x-0 text-center text-base font-semibold tracking-tight text-primary pointer-events-none select-none md:text-xl">
        Akij Resource
      </h1>
    </header>
  );
}
