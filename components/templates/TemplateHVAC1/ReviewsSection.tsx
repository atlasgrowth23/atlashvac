// components/templates/TemplateHVAC1/ReviewsSection.tsx
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import type { Company, Review } from '../../../pages/[biz_id]';

interface ReviewsSectionProps {
  reviews: Review[];
  company: Company | null;
}

// Utility to check brightness of a hex color
const isLightColor = (color: string | null | undefined): boolean => {
  if (!color) return false;
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

// Truncate long review text
const truncateText = (text: string | null, maxLength: number): string => {
  if (!text) return '-';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, company }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback/default colors
  const defaultPrimary = '#1e3a8a';
  const defaultSecondary = '#3b82f6';

  // Company info with fallbacks
  const name = company?.name ?? 'Our Company';
  const reviewsLink = company?.reviews_link;
  const primaryColor = company?.primary_color || defaultPrimary;
  const secondaryColor = company?.secondary_color || defaultSecondary;
  const rating = company?.rating ?? 5;
  const reviewCount = company?.reviews ?? 0;

  // Decide whether to show reviews based on count
  const showReviews = reviews.length > 0;

  // Format rating for display (one decimal place)
  const formattedRating = rating.toFixed(1);

  // Text color based on background brightness
  const primaryTextColor = isLightColor(primaryColor) ? 'text-gray-800' : 'text-white';

  // Carousel navigation
  const goToPrev = () => setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  const goToNext = () => setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));

  return (
    <section
      id="reviews"
      className="template-section py-16"
      style={{ background: `linear-gradient(180deg, ${primaryColor}10, white)` }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Trusted by the Community
          </h2>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                />
              ))}
            </div>
            <span className="text-2xl font-bold ml-2">{formattedRating}</span>
          </div>
          <p className="text-gray-600">
            {reviewCount > 0
              ? `Based on ${reviewCount}+ verified reviews`
              : 'Check out our reviews online'}
          </p>
        </div>

        {showReviews ? (
          <div className="max-w-4xl mx-auto">
            {/* Review Carousel */}
            <div
              className="relative rounded-xl overflow-hidden mb-10 transform transition-all duration-500"
              style={{
                backgroundColor: primaryColor,
                boxShadow:
                  '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div className="absolute top-8 left-8 opacity-20">
                <Quote size={60} className={primaryTextColor} />
              </div>

              <div className="p-8 md:p-12">
                <div className={`relative z-10 ${primaryTextColor}`}>
                  <div className="mb-6">
                    <p className="text-lg md:text-xl font-medium mb-6 italic leading-relaxed">
                      {truncateText(reviews[activeIndex].text, 200)}
                    </p>
                    <div className="flex items-center">
                      <div className="flex text-yellow-300 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <span className="font-semibold">
                        {reviews[activeIndex].reviewer_name || 'Valued Customer'}
                      </span>
                    </div>
                  </div>

                  {/* Carousel controls */}
                  {reviews.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={goToPrev}
                        className={`p-2 rounded-full ${primaryTextColor} bg-white bg-opacity-20 hover:bg-opacity-30 transition-all`}
                        aria-label="Previous review"
                      >
                        <ArrowLeft size={20} />
                      </button>
                      <div className="flex gap-1">
                        {reviews.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === activeIndex ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
                            }`}
                            aria-label={`Go to review ${idx + 1}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={goToNext}
                        className={`p-2 rounded-full ${primaryTextColor} bg-white bg-opacity-20 hover:bg-opacity-30 transition-all`}
                        aria-label="Next review"
                      >
                        <ArrowRight size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600 max-w-xl mx-auto p-8 bg-white rounded-lg shadow-sm">
            <Quote size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-lg italic">{name} is committed to customer satisfaction.</p>
            <p className="mt-3">
              We value your feedback and strive to provide the best service possible.
            </p>
          </div>
        )}

        {/* Read/Leave review buttons */}
        {reviewsLink && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md bg-white border border-gray-300 text-gray-800 font-medium hover:shadow-md transition-all transform hover:-translate-y-1 flex-1 sm:flex-none text-center"
            >
              Read More Reviews
            </a>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md font-medium transition-all transform hover:-translate-y-1 flex-1 sm:flex-none text-center"
              style={{
                backgroundColor: secondaryColor,
                color: isLightColor(secondaryColor) ? '#1f2937' : 'white',
              }}
            >
              Leave a Review
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
