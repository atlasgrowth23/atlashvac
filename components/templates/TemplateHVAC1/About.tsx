// components/templates/TemplateHVAC1/About.tsx
import React from "react";
// VERIFY THIS IMPORT PATH IS CORRECT FOR YOUR STRUCTURE
import type { Company } from "../../../pages/[biz_id]";

interface AboutProps {
  company: Company | null;
}

const About: React.FC<AboutProps> = ({ company }) => {
  // Provide safe fallbacks for all potentially used values
  const name = company?.name ?? "Our Company";
  const city = company?.city ?? "your local area";
  const state = company?.state ?? "";
  const yearFounded = company?.site_company_insights_founded_year; // Could be number or null/undefined
  const descriptionFromData = company?.site_company_insights_description;

  // Construct description safely
  const description = descriptionFromData
    ? descriptionFromData
    : `Providing reliable HVAC services to ${city}${
        state ? `, ${state}` : ""
      } and surrounding communities${
        typeof yearFounded === "number" ? ` since ${yearFounded}` : ""
      }. We are committed to quality workmanship and customer satisfaction.`;

  return (
    <section id="about" className="template-section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content Column */}
          <div>
            <h2 className="section-subtitle text-3xl mb-4 text-gray-800">
              About {name}
              {/* Only show 'Since Year' if yearFounded is a valid number */}
              {typeof yearFounded === "number" &&
                yearFounded > 1800 && (
                  <span className="block text-lg font-normal text-gray-600 mt-1">
                    Serving Since {yearFounded}
                  </span>
                )}
            </h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>

          {/* Image Column */}
          <div className="text-center">
            <img 
              src="/images/hvac-about.jpg" 
              alt={`About ${name}`}
              className="w-full h-auto rounded-lg shadow-lg hover-glow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
