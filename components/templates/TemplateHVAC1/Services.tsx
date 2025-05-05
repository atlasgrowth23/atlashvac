// components/templates/TemplateHVAC1/Services.tsx
import React from 'react';
import { 
  Snowflake, 
  Fan, 
  Wind, 
  Gauge, 
  Clock,
  AlertCircle
} from 'lucide-react';
import type { Company } from '../../../pages/[biz_id]';

// Define the summer-focused services with detailed descriptions
const summerServices = [
  { 
    name: 'AC Maintenance & Tune-Up', 
    icon: Gauge, 
    description: 'Prevent breakdowns during peak summer heat with professional maintenance.'
  },
  { 
    name: 'Emergency AC Repair', 
    icon: AlertCircle, 
    description: 'Fast response when your cooling system fails in the summer heat.'
  },
  { 
    name: 'New AC Installation', 
    icon: Snowflake, 
    description: 'Energy-efficient cooling solutions designed for any home and budget.'
  },
  { 
    name: 'Ductwork Services', 
    icon: Wind, 
    description: 'Improve airflow and cooling efficiency throughout your home.'
  },
  { 
    name: 'Indoor Air Quality', 
    icon: Fan, 
    description: 'Breathe cleaner, fresher air all summer with advanced filtration.'
  },
  { 
    name: 'Smart Thermostat Installation', 
    icon: Clock, 
    description: 'Control your comfort and reduce energy costs with smart technology.'
  },
];

// Utility function to determine if a color is light or dark
const isLightColor = (color: string | null | undefined): boolean => {
  if (!color) return false;
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

interface ServicesProps {
  company?: Company | null;
}

const Services: React.FC<ServicesProps> = ({ company }) => {
  // Provide fallback/default colors
  const defaultPrimary = '#1e3a8a'; // Dark blue
  const defaultSecondary = '#3b82f6'; // Medium blue
  
  // Company name with fallback
  const name = company?.name ?? 'Our Company';
  
  // Get company primary and secondary colors with fallbacks
  const primaryColor = company?.primary_color || defaultPrimary;
  const secondaryColor = company?.secondary_color || defaultSecondary;
  
  // Determine text color for primary background
  const primaryTextColor = isLightColor(primaryColor) ? 'text-gray-800' : 'text-white';
  
  return (
    <section id="services" className="template-section py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Title */}
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Beat the Summer Heat with {name}
        </h2>
        
        {/* Featured Banner - Summer-focused */}
        <div 
          className="w-full p-6 md:p-8 mb-12 rounded-lg shadow-md" 
          style={{ 
            backgroundColor: primaryColor,
            border: isLightColor(primaryColor) ? '1px solid #e5e7eb' : 'none'
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className={`flex-1 ${primaryTextColor}`}>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {name}'s Summer AC Services
              </h3>
              <p className="text-lg opacity-90">
                Ensure your comfort during the hottest days of the year
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center my-6 md:my-0 mx-4">
              <Snowflake className={`h-20 w-20 md:h-24 md:w-24 ${primaryTextColor} opacity-90`} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-4">
            <button 
              className="w-full sm:w-auto px-6 py-3 rounded-md font-medium shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px]"
              style={{ 
                backgroundColor: secondaryColor,
                color: isLightColor(secondaryColor) ? '#1f2937' : 'white'
              }}
            >
              Schedule Service
            </button>
            <a 
              href={`tel:${company?.phone || '123-456-7890'}`} 
              className="w-full sm:w-auto px-6 py-3 rounded-md font-medium shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2 bg-white text-gray-800 hover:translate-y-[-2px]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {company?.phone || 'Call Now'}
            </a>
          </div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {summerServices.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
              style={{
                transition: `all 0.3s ease-in-out ${index * 0.1}s`,
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="p-3 rounded-full mr-4"
                  style={{ 
                    backgroundColor: `${secondaryColor}20` // 20% opacity version of color
                  }}
                >
                  <service.icon 
                    className="h-6 w-6"
                    style={{ color: secondaryColor }}
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-800">{service.name}</h3>
              </div>
              <p className="text-gray-600 flex-grow mb-4">
                {service.description}
              </p>
              <button
                className="text-sm font-medium py-2 px-4 rounded transition-all"
                style={{ 
                  backgroundColor: `${secondaryColor}15`,
                  color: secondaryColor
                }}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
        
        {/* Why Choose Us Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose {name}?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <svg className="w-8 h-8" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Expert Technicians</h4>
              <p className="text-gray-600">Licensed, insured, and experienced specialists committed to quality.</p>
            </div>
            
            <div className="text-center p-4">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <svg className="w-8 h-8" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Fast Response</h4>
              <p className="text-gray-600">Quick service when you need it most, especially during summer heat.</p>
            </div>
            
            <div className="text-center p-4">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${primaryColor}20` }}
              >
                <svg className="w-8 h-8" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Satisfaction Guaranteed</h4>
              <p className="text-gray-600">Our work isn't done until you're 100% satisfied with the results.</p>
            </div>
          </div>
        </div>
                
        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button 
            className="px-8 py-4 rounded-md font-medium text-lg shadow-md transition-all hover:shadow-lg transform hover:-translate-y-1"
            style={{ 
              backgroundColor: secondaryColor,
              color: isLightColor(secondaryColor) ? '#1f2937' : 'white'
            }}
          >
            Schedule a Service Call
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
