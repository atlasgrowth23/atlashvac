// components/templates/TemplateHVAC1/Hero.tsx
import React from 'react';
import { Star, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Use shadcn Button
import type { Company } from '../../../pages/[biz_id]';

interface HeroProps {
  company: Company | null;
}

const Hero: React.FC<HeroProps> = ({ company }) => {
  // Fallback values
  const name = company?.name ?? 'Reliable HVAC Services';
  const city = company?.city ?? 'Your City';
  const state = company?.state ?? 'State';
  const phone = company?.phone;
  const rating = company?.rating;
  const reviewsCount = company?.reviews;
  const primaryColor = company?.primary_color || '#2563EB'; // Default blue

  // Conditional rendering logic for rating badge
  const showRatingBadge =
    typeof rating === 'number' &&
    typeof reviewsCount === 'number' &&
    rating >= 4.8 &&
    reviewsCount >= 15;

  // Background Style: Placeholder image + dark overlay + primary color hint
  const fallbackImageUrl = '/images/hvac-hero.jpg';
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${fallbackImageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <section className="relative text-white py-20 md:py-32 lg:py-40" style={backgroundStyle}>
      {/* Improved content container with proper centering and width constraints */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center">
        {/* Content with improved typography and spacing */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-md">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 md:mb-10 max-w-3xl mx-auto drop-shadow">
          Your Trusted Local Experts for Heating & Cooling in {city}, {state}
        </p>

        {/* Rating Badge (if shown) - improved positioning and styling */}
        {showRatingBadge && (
          <div className="inline-flex items-center justify-center space-x-2 mb-8 md:mb-10 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/50 mx-auto">
            {/* Create 5 stars, filling based on rating */}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(rating ?? 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-yellow-600/70'
                }`}
              />
            ))}
            <span className="font-semibold text-white">{rating?.toFixed(1)}</span>
            <span className="text-gray-300">({reviewsCount ?? 0} Google Reviews)</span>
          </div>
        )}

        {/* Call to Action Button with improved styling */}
        {phone && (
          <div className="mt-4 md:mt-6">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 rounded-md font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              style={{ backgroundColor: primaryColor }} // Use directly from props
            >
              <a href={`tel:${phone}`} className="flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now: {phone}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
