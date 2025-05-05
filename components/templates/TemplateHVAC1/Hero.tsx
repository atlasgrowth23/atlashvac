// components/templates/TemplateHVAC1/Hero.tsx
import React from "react";
import { Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button"; // Use shadcn Button
import type { Company } from "../../../pages/[biz_id]";

interface HeroProps {
  company: Company | null;
}

const Hero: React.FC<HeroProps> = ({ company }) => {
  // Fallback values
  const name = company?.name ?? "Reliable HVAC Services";
  const city = company?.city ?? "Your City";
  const state = company?.state ?? "State";
  const phone = company?.phone;
  const rating = company?.rating;
  const reviewsCount = company?.reviews;
  const primaryColor = company?.primary_color || "#2563EB"; // Default blue
  const secondaryColor = company?.secondary_color || "#F3F4F6"; // Default light gray

  // Conditional rendering logic for rating badge
  const showRatingBadge =
    typeof rating === "number" &&
    typeof reviewsCount === "number" &&
    rating >= 4.8 &&
    reviewsCount >= 15;

  // Background Style: Placeholder image + dark overlay + primary color hint
  const fallbackImageUrl = "/images/hvac-hero.jpg"; 
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${fallbackImageUrl}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    // Added relative positioning for potential overlay divs later
    <section
      className="relative text-white py-28 md:py-40"
      style={backgroundStyle}
    >
      {/* Optional: Add a separate overlay div if needed for more complex effects
       <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      */}
      <div className="hero-content">
        {/* Content */}
        <h1 className="hero-title text-shadow-md">
          {name}
        </h1>
        <p className="hero-subtitle text-gray-100 text-shadow-sm">
          Your Trusted Local Experts for Heating & Cooling in {city}, {state}
        </p>

        {/* Rating Badge (if shown) */}
        {showRatingBadge && (
          <div className="inline-flex items-center justify-center space-x-2 mb-8 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/50">
            {/* Create 5 stars, filling based on rating */}
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(rating ?? 0)
                    ? "text-yellow-400 fill-current"
                    : "text-yellow-600/70"
                }`}
              />
            ))}
            <span className="font-semibold text-white">
              {rating?.toFixed(1)}
            </span>
            <span className="text-gray-300">
              ({reviewsCount ?? 0} Google Reviews)
            </span>
          </div>
        )}

        {/* Call to Action Button */}
        {phone && (
          <div>
            {" "}
            {/* Added div for centering */}
            <Button
              size="lg" // Large button
              asChild
              className="text-lg px-8 py-4 rounded-md font-semibold text-white shadow-lg hover-lift hover-glow"
              style={{ backgroundColor: 'var(--hvac1-primary)' }} // Use CSS variable
            >
              <a
                href={`tel:${phone}`}
                className="flex items-center justify-center gap-2"
              >
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
