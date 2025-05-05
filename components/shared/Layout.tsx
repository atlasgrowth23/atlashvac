// components/shared/Layout.tsx
import React from "react";
import Header from "../templates/TemplateHVAC1/Header";
import ContactFooter from "../templates/TemplateHVAC1/ContactFooter";
import type { Company } from "../../pages/[biz_id]"; // Use 'import type'

interface LayoutProps {
  children: React.ReactNode;
  company: Company | null; // Prop received by Layout
  logoUrl: string | null;
}

const Layout: React.FC<LayoutProps> = ({ children, company, logoUrl }) => {
  // Provide fallbacks specifically for Header props if company is null
  const headerCompanyName = company?.name ?? "Company Name";
  const headerPhone = company?.phone ?? null; // Pass null if company is null
  const headerLogoUrl = logoUrl; // logoUrl prop is already string | null

  // Use primary color from company data if available
  const primaryColor = company?.primary_color || '#2563EB';
  const secondaryColor = company?.secondary_color || '#F3F4F6';

  // Create dynamic CSS variables based on company data
  const companyStyles = {
    '--hvac1-primary': primaryColor,
    '--hvac1-secondary': secondaryColor,
  } as React.CSSProperties;

  return (
    <div 
      className="template-hvac1 flex flex-col min-h-screen bg-gray-50" 
      style={companyStyles}
    >
      <Header
        companyName={headerCompanyName}
        logoUrl={headerLogoUrl}
        phone={headerPhone}
      />
      <main className="flex-grow">{children}</main>
      <ContactFooter
        company={company} // Pass the original company prop (which is Company | null)
      />
    </div>
  );
};

export default Layout;
