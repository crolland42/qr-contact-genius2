import React from "react";
import { BusinessCardPreviewProps } from "@/types/types";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export const CardTemplate: React.FC<BusinessCardPreviewProps> = ({ card }) => {
  return (
    <div className="business-card w-[400px] h-[225px] bg-white rounded-lg shadow-lg p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-heading font-semibold text-primary">
            {card.firstName} {card.lastName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{card.position}</p>
          <p className="text-sm font-medium text-primary mt-1">{card.company}</p>
        </div>

        <div className="space-y-2">
          {card.phone && (
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2" />
              {card.phone}
            </div>
          )}
          
          {card.email && (
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2" />
              {card.email}
            </div>
          )}
          
          {card.website && (
            <div className="flex items-center text-sm text-gray-600">
              <Globe className="w-4 h-4 mr-2" />
              {card.website}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};