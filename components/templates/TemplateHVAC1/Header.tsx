// components/templates/TemplateHVAC1/Header.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone } from 'lucide-react'; // Using lucide-react icons
import { Button } from '@/components/ui/button'; // Import shadcn Button
import { upscaleGoogleAvatar } from '@/lib/logo';

interface HeaderProps {
  companyName: string;
  logoUrl: string | null;
  phone: string | null;
}

const Header: React.FC<HeaderProps> = ({ companyName, logoUrl, phone }) => {
  // Fixed typo: displayMame -> displayName
  const displayName = companyName || 'HVAC Company';
  const logo = upscaleGoogleAvatar(logoUrl, 400);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        {/* Left Side: Logo or Company Name */}
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            {logo ? (
              <div className="relative h-12 w-48">
                <Image
                  src={logo}
                  alt={`${displayName} Logo`}
                  fill
                  sizes="(max-width: 768px) 100vw, 192px"
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
              // Maybe style this with primary color later if desired
              <span className="font-bold text-lg sm:inline-block text-foreground">
                {' '}
                {/* Use theme text color */}
                {displayName}
              </span>
            )}
          </Link>
        </div>

        {/* Right Side: Phone Number CTA Button */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {phone && (
            // This button's background SHOULD now use the --primary CSS variable
            <Button variant="default" size="sm" asChild>
              <a href={`tel:${phone}`} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Call Now</span> {/* Simplified text */}
                {/* <span className="sm:hidden">{phone}</span> Show only phone on very small? */}
                <span className="hidden sm:inline">: {phone}</span> {/* Show phone on larger */}
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
