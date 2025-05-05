// components/shared/Layout.tsx
import React, { useEffect } from 'react';
import Header from '../templates/TemplateHVAC1/Header';
import ContactFooter from '../templates/TemplateHVAC1/ContactFooter';
import type { Company } from '../../pages/[biz_id]';
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  company: Company | null;
  logoUrl: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, company, logoUrl }) => {
  // Define fallbacks FIRST
  const primaryColor = company?.primary_color || '#2563EB'; // Default blue
  const secondaryColor = company?.secondary_color || '#E5E7EB'; // Default gray-200
  const headerCompanyName = company?.name ?? 'Company Name';
  const headerPhone = company?.phone ?? null;
  const headerLogoUrl = logoUrl;

  // Define CSS custom properties (variables) based on fetched/fallback colors
  // These names (--primary, --secondary) often align with shadcn/ui themes
  const companyStyles = {
    '--primary': primaryColor,
    '--secondary': secondaryColor,
    // You could define HSL versions here too if needed by shadcn theme setup,
    // but just setting hex often works for direct background/text colors.
    // Example (would need a hex-to-hsl function):
    // '--primary-hsl': hexToHsl(primaryColor),
  } as React.CSSProperties;

  return (
    // Apply the inline style here to set the CSS variables for children
    <div className="flex flex-col min-h-screen bg-background text-foreground" style={companyStyles}>
      <Header companyName={headerCompanyName} logoUrl={headerLogoUrl} phone={headerPhone} />
      <main className="flex-grow">{children}</main>
      <ContactFooter
        company={company} // Pass original, footer can access company.primary_color etc. if needed
      />
    </div>
  );
};

export default Layout;
