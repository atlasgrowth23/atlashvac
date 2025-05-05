// components/templates/TemplateHVAC1/ContactFooter.tsx
import React from 'react';
import { Facebook, Instagram } from 'lucide-react'; // Icons
import { Button } from '@/components/ui/button'; // Use shadcn Button
import { Input } from '@/components/ui/input'; // Use shadcn Input (need to add)
import { Textarea } from '@/components/ui/textarea'; // Use shadcn Textarea (need to add)
import type { Company } from '../../../pages/[biz_id]'; // Import Company type

interface ContactFooterProps {
  company: Company | null; // Receive company data
}

const ContactFooter: React.FC<ContactFooterProps> = ({ company }) => {
  const currentYear = new Date().getFullYear();
  const companyName = company?.name ?? 'Your Company Name';
  const phone = company?.phone;
  const fullAddress = company?.full_address; // Or construct from city/state if needed
  const facebookUrl = company?.facebook;
  const instagramUrl = company?.instagram;

  // Simple form handler placeholder - does nothing for now
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Contact form submission not implemented yet.');
  };

  return (
    <footer className="bg-gray-800 text-gray-300 pt-10 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{companyName}</h3>
            {fullAddress && <p className="mb-2">{fullAddress}</p>}
            {phone && (
              <p className="mb-2">
                <a href={`tel:${phone}`} className="hover:text-white">
                  {phone}
                </a>
              </p>
            )}
            {/* Add Email here if you have it */}
          </div>

          {/* Column 2: Placeholder Contact Form */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              {/* Add Input and Textarea via shadcn CLI if not already done */}
              {/* npx shadcn@latest add input textarea */}
              <Input
                type="text"
                placeholder="Your Name"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
              <Textarea
                placeholder="Your Message"
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                required
              />
              <Button type="submit" variant="secondary" size="sm">
                {' '}
                {/* Use shadcn Button */}
                Send Message (Disabled)
              </Button>
            </form>
          </div>

          {/* Column 3: Social Links / Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect With Us</h3>
            <div className="flex space-x-4">
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-gray-400 hover:text-white"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-gray-400 hover:text-white"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {/* Add other social links if needed */}
            </div>
            {/* Could add quick nav links here later */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-gray-500 text-sm pt-6 border-t border-gray-700">
          © {currentYear} {companyName}. All Rights Reserved.
          {/* Optional: Add link back to your agency/platform */}
          {/* | Website by [Your Agency Name] */}
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
