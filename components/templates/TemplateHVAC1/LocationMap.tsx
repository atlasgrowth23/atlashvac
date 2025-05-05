// components/templates/TemplateHVAC1/LocationMap.tsx
import React from "react";
import type { Company } from "../../../pages/[biz_id]"; // Import Company type

interface LocationMapProps {
  company: Company | null;
}

const LocationMap: React.FC<LocationMapProps> = ({ company }) => {
  const city = company?.city ?? "Your Area";
  const state = company?.state ?? "";
  const lat = company?.latitude;
  const lng = company?.longitude;
  const workingHours = company?.working_hours;

  // Placeholder for Google Maps Embed URL - requires API Key enabled for Embed API
  // You'd construct this URL properly later
  const mapEmbedUrl =
    lat && lng
      ? `https://www.google.com/maps/embed/v1/place?key=<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_Maps\_API\_KEY\}&q\=</span>{lat},${lng}`
      : null;

  return (
    <section id="location" className="template-section bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">
          Find Us & Service Area
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Map Placeholder */}
          <div className="w-full h-80 bg-gray-300 rounded flex items-center justify-center text-gray-500 overflow-hidden">
            {mapEmbedUrl ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapEmbedUrl}
              ></iframe>
            ) : (
              "Map Placeholder (Requires Lat/Lng)"
            )}
          </div>
          {/* Location Info */}
          <div className="text-center md:text-left">
            <h3 className="section-subtitle mb-3">
              Proudly Serving {city}
              {state ? `, ${state}` : ""}
            </h3>
            {company?.full_address && (
              <p className="text-gray-700 mb-2">{company.full_address}</p>
            )}
            <p className="text-gray-600 mb-4">
              Contact us for service in your neighborhood.
            </p>
            {workingHours && (
              <div>
                <h4 className="font-semibold mb-1">Hours:</h4>
                <p className="text-gray-600 whitespace-pre-line">
                  {workingHours}
                </p>{" "}
                {/* Display hours string */}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
