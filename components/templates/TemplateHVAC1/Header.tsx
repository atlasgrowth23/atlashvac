// components/templates/TemplateHVAC1/Header.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react"; // Using lucide-react icons (installed with shadcn/ui)
import { Button } from "@/components/ui/button"; // Import shadcn Button

// Define the props the Header component expects
interface HeaderProps {
  companyName: string;
  logoUrl: string | null;
  phone: string | null;
  // We might add primaryColor later if needed for styling elements here
}

const Header: React.FC<HeaderProps> = ({ companyName, logoUrl, phone }) => {
  // Basic fallback if name is missing (shouldn't happen if fetched correctly)
  const displayMame = companyName || "HVAC Company";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Using background/backdrop suggested by shadcn docs for sticky headers */}
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Left Side: Logo or Company Name */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {logoUrl ? (
              // Using Next.js Image component for optimization
              // NOTE: You might need to configure allowed domains in next.config.js if logoUrl is external
              <Image
                src={logoUrl}
                alt={`${displayMame} Logo`}
                width={140} // Adjust width as needed
                height={40} // Adjust height as needed
                className="h-8 md:h-10 w-auto" // Tailwind classes for responsive height
                priority // Prioritize loading logo LCP
              />
            ) : (
              // Display text name if no valid logo
              <span className="font-bold text-lg sm:inline-block">
                {displayMame}
              </span>
            )}
          </Link>
          {/* Maybe add simple Nav links here later */}
        </div>

        {/* Right Side: Phone Number CTA */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {phone && (
            <Button 
              variant="default" 
              size="sm" 
              asChild
              className="hover-lift"
              style={{ backgroundColor: 'var(--hvac1-primary)' }} // Use CSS variable
            >
              <a href={`tel:${phone}`} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now:</span>
                <span>{phone}</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
