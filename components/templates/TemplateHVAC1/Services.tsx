// components/templates/TemplateHVAC1/Services.tsx
import React from "react";
import { Thermometer, Wrench, AirVent, ShieldCheck } from "lucide-react"; // Example icons

// Static service data for MVP
const services = [
  { name: "Air Conditioning Repair", icon: Wrench },
  { name: "AC Installation", icon: AirVent },
  { name: "Heating Repair", icon: Thermometer },
  { name: "Furnace Installation", icon: Thermometer },
  { name: "Preventative Maintenance", icon: ShieldCheck },
  { name: "Ductwork Services", icon: Wrench }, // Added another example
];

const Services: React.FC = () => {
  return (
    <section id="services" className="template-section bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="section-title">
          Our HVAC Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card p-6 text-center"
            >
              <service.icon 
                className="h-10 w-10 mx-auto mb-3" 
                style={{ color: 'var(--hvac1-primary)' }}
              />
              <h3 className="section-subtitle text-lg mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600">
                Providing expert solutions for your comfort needs.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
