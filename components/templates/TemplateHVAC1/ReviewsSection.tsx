// components/templates/TemplateHVAC1/ReviewsSection.tsx
import React from "react";
import { Button } from "@/components/ui/button"; // Use Button for links
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Use Card for structure
import { Star } from "lucide-react";
import type { Company, Review } from "../../../pages/[biz_id]"; // Import types

interface ReviewsSectionProps {
  reviews: Review[];
  company: Company | null; // Needed for reviews_link
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  company,
}) => {
  const reviewsLink = company?.reviews_link;
  const companyName = company?.name ?? "Us";

  // Decide whether to show reviews based on count
  const showReviews = reviews && reviews.length >= 3;

  return (
    <section id="reviews" className="template-section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">
          What Our Customers Say
        </h2>

        {showReviews ? (
          // Display reviews if enough are available
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Only map over the first few reviews if needed, or implement slider later */}
            {reviews.slice(0, 3).map(
              (
                review // Displaying first 3 statically
              ) => (
                <Card key={review.review_id ?? Math.random()}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center justify-between">
                      <span>{review.reviewer_name ?? "Valued Customer"}</span>
                      <span className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </span>
                    </CardTitle>
                    {review.published_at_date && (
                      <p className="text-xs text-gray-500 pt-1">
                        {new Date(
                          review.published_at_date
                        ).toLocaleDateString()}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic">
                      "{review.text ?? "-"}"
                    </p>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        ) : (
          // Fallback if not enough reviews
          <div className="text-center italic text-gray-600">
            <p>We value customer feedback!</p>
            <p className="mt-1">Check out our reviews online.</p>
          </div>
        )}

        {/* Buttons - Show only if reviewsLink exists */}
        {reviewsLink && (
          <div className="text-center mt-10 space-x-4">
            <Button variant="outline" asChild>
              <a href={reviewsLink} target="_blank" rel="noopener noreferrer">
                Read More Reviews
              </a>
            </Button>
            <Button
              variant="default"
              asChild
              className="hover-lift"
              style={{ backgroundColor: 'var(--hvac1-primary)' }}
            >
              <a href={reviewsLink} target="_blank" rel="noopener noreferrer">
                Leave a Review
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;
