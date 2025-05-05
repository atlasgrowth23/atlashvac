// components/templates/TemplateHVAC1/ReviewsSection.tsx
import React, { useState } from 'react';
import { Star, ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import type { Company, Review } from '../../../pages/[slug]';

interface ReviewsSectionProps {
  reviews: Review[];
  company: Company | null;
}

/** True if hex colour is light (so we use dark text) */
const isLightColor = (hex?: string | null) => {
  if (!hex) return false;
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
};

const truncate = (t?: string | null, n = 200) =>
  !t ? '-' : t.length > n ? `${t.slice(0, n)}…` : t;

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews, company }) => {
  const [idx, setIdx] = useState(0);
  const hasReviews = reviews.length > 0;

  /* --- derived values & fall‑backs --- */
  const primary = company?.primary_color ?? '#1e3a8a';
  const secondary = company?.secondary_color ?? '#3b82f6';
  const rating = company?.rating ?? 5;
  const textClr = isLightColor(primary) ? 'text-gray-800' : 'text-white';

  const active = reviews[idx] ?? ({} as Review);

  /* --- handlers --- */
  const prev = () => setIdx((p) => (p === 0 ? reviews.length - 1 : p - 1));
  const next = () => setIdx((p) => (p === reviews.length - 1 ? 0 : p + 1));

  return (
    <section
      id="reviews"
      className="template-section py-16"
      style={{ background: `linear-gradient(180deg, ${primary}10, white)` }}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* ===== headline ===== */}
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Trusted by the Community
          </h2>

          {/* stars + score */}
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
            <span className="text-2xl font-bold ml-2">{rating.toFixed(1)}</span>
          </div>

          <p className="text-gray-600">
            {company?.reviews
              ? `Based on ${company.reviews}+ verified reviews`
              : 'Check out our reviews online'}
          </p>
        </div>

        {/* ===== body ===== */}
        {hasReviews ? (
          <div className="max-w-4xl mx-auto">
            <div
              className="relative rounded-xl overflow-hidden mb-10 transition-all"
              style={{
                backgroundColor: primary,
                boxShadow: '0 20px 25px -5px rgba(0,0,0,.1),0 10px 10px -5px rgba(0,0,0,.04)',
              }}
            >
              <div className="absolute top-8 left-8 opacity-20">
                <Quote size={60} className={textClr} />
              </div>

              <div className="p-8 md:p-12">
                <div className={`relative z-10 ${textClr}`}>
                  {/* quote text */}
                  <p className="text-lg md:text-xl font-medium mb-6 italic leading-relaxed">
                    {truncate(active.text)}
                  </p>

                  {/* reviewer + stars */}
                  <div className="flex items-center">
                    <div className="flex text-yellow-300 mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="font-semibold">
                      {active.name || 'Valued Customer'}
                    </span>
                  </div>

                  {/* nav dots & arrows */}
                  {reviews.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={prev}
                        className={`p-2 rounded-full ${textClr} bg-white bg-opacity-20 hover:bg-opacity-30`}
                        aria-label="Previous review"
                      >
                        <ArrowLeft size={20} />
                      </button>

                      <div className="flex gap-1">
                        {reviews.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            className={`w-2 h-2 rounded-full ${
                              i === idx ? 'bg-white scale-125' : 'bg-white bg-opacity-50'
                            }`}
                            aria-label={`Go to review ${i + 1}`}
                          />
                        ))}
                      </div>

                      <button
                        onClick={next}
                        className={`p-2 rounded-full ${textClr} bg-white bg-opacity-20 hover:bg-opacity-30`}
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
            <p className="text-lg italic">
              {company?.name ?? 'Our company'} is committed to customer satisfaction.
            </p>
            <p className="mt-3">
              We value your feedback and strive to provide the best service possible.
            </p>
          </div>
        )}

        {/* ===== footer buttons ===== */}
        {company?.reviews_link && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a
              href={company.reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md bg-white border border-gray-300 text-gray-800 font-medium hover:shadow-md transition-all flex-1 sm:flex-none text-center"
            >
              Read More Reviews
            </a>
            <a
              href={company.reviews_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-md font-medium transition-all flex-1 sm:flex-none text-center"
              style={{
                backgroundColor: secondary,
                color: isLightColor(secondary) ? '#1f2937' : '#fff',
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
