// components/templates/TemplateHVAC1/LocationMap.tsx
import React from 'react';
import type { Company } from '../../../pages/[biz_id]';

interface LocationMapProps {
  company: Company | null;
}

const BasicEmbedLocationMap: React.FC<LocationMapProps> = ({ company }) => {
  const city = company?.city ?? 'Your Area';
  const state = company?.state ?? '';
  const lat = company?.latitude;
  const lng = company?.longitude;
  const workingHours = company?.working_hours;
  const apiKey = process.env.NEXT_PUBLIC_Maps_API_KEY;

  const mapEmbedUrl =
    lat && lng && apiKey
      ? `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lng}&zoom=14&maptype=roadmap`
      : null;

  return (
    <section id="location" className="py-12 md:py-16 lg:py-20 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Find Us &amp; Service Area
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="w-full h-80 bg-gray-300 rounded-lg shadow-md overflow-hidden">
            {mapEmbedUrl ? (
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={mapEmbedUrl}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 italic">
                Map unavailable
              </div>
            )}
          </div>

          {/* Info + Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              Proudly Serving {city}
              {state && `, ${state}`}
            </h3>
            {company?.full_address && <p className="text-gray-700 mb-4">{company.full_address}</p>}
            {workingHours && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Hours</h4>
                <ul className="text-gray-600 list-disc list-inside">
                  {workingHours.split('\n').map((line) => (
                    <li key={line.trim()}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            {lat && lng && (
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-medium text-blue-600 hover:underline"
              >
                Get Directions
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicEmbedLocationMap;
