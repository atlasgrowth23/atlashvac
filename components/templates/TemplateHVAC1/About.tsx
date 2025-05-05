// components/templates/TemplateHVAC1/About.tsx
import React from 'react';
// VERIFY THIS IMPORT PATH IS CORRECT FOR YOUR STRUCTURE
import type { Company } from '../../../pages/[biz_id]';

interface AboutProps {
  company: Company | null;
}

const About: React.FC<AboutProps> = ({ company }) => {
  // Provide safe fallbacks for all potentially used values
  const name = company?.name ?? 'Our Company';
  const city = company?.city ?? 'your local area';
  const state = company?.state ?? '';
  const yearFounded = company?.site_company_insights_founded_year; // Could be number or null/undefined
  const descriptionFromData = company?.site_company_insights_description;

  // Construct description safely
  const description = descriptionFromData
    ? descriptionFromData
    : `Providing reliable HVAC services to ${city}${
        state ? `, ${state}` : ''
      } and surrounding communities${
        typeof yearFounded === 'number' ? ` since ${yearFounded}` : ''
      }. Committed to quality workmanship and customer satisfaction.`;

  return (
    <section id="about" className="template-section bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content Column */}
          <div>
            <h2 className="section-subtitle text-3xl mb-4 text-gray-800">
              About {name}
              {/* Only show 'Since Year' if yearFounded is a valid number */}
              {typeof yearFounded === 'number' && yearFounded > 1800 && (
                <span className="block text-lg font-normal text-gray-600 mt-1">
                  Serving Since {yearFounded}
                </span>
              )}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Expert Technicians</h3>
                  <p className="text-gray-600">Licensed, insured professionals trained to handle all HVAC needs.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Superior Service</h3>
                  <p className="text-gray-600">Customer satisfaction is the priority with every service call.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 mr-3">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Flexible Solutions</h3>
                  <p className="text-gray-600">Customized options to meet your comfort needs and budget.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div className="text-center">
            <img
              src="/images/hvac-about.jpg"
              alt={`About ${name}`}
              className="w-full h-auto rounded-lg shadow-lg hover-glow"
            />
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
              <h3 className="font-semibold text-lg text-blue-800 mb-2">Quality You Can Trust</h3>
              <p className="text-blue-700">Keeping families comfortable in {city} for {typeof yearFounded === 'number' ? `over ${new Date().getFullYear() - yearFounded} years` : 'years'}.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
