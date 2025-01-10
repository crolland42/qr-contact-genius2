import React from "react";
import { BusinessCardPreviewProps } from "@/types/types";
import { CardTemplate } from "./CardTemplate";

export const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({
  card,
}) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-semibold text-primary mb-6">
        Aperçu de la carte
      </h2>
      <div className="flex justify-center">
        <CardTemplate card={card} />
      </div>
    </div>
  );
};