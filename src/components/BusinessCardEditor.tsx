import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BusinessCardFormProps } from "@/types/types";

export const BusinessCardEditor: React.FC<BusinessCardFormProps> = ({
  card,
  onChange,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    onChange({
      ...card,
      [field]: e.target.value,
    });
  };

  const handleSocialChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    network: string
  ) => {
    onChange({
      ...card,
      socialLinks: {
        ...card.socialLinks,
        [network]: e.target.value,
      },
    });
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-heading font-semibold text-primary">
        Informations de la carte
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom</Label>
          <Input
            id="firstName"
            value={card.firstName}
            onChange={(e) => handleChange(e, "firstName")}
            placeholder="John"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom</Label>
          <Input
            id="lastName"
            value={card.lastName}
            onChange={(e) => handleChange(e, "lastName")}
            placeholder="Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Poste</Label>
          <Input
            id="position"
            value={card.position}
            onChange={(e) => handleChange(e, "position")}
            placeholder="Directeur Commercial"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Entreprise</Label>
          <Input
            id="company"
            value={card.company}
            onChange={(e) => handleChange(e, "company")}
            placeholder="Entreprise SAS"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={card.phone}
            onChange={(e) => handleChange(e, "phone")}
            placeholder="+33 6 12 34 56 78"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={card.email}
            onChange={(e) => handleChange(e, "email")}
            placeholder="john.doe@entreprise.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Site web</Label>
          <Input
            id="website"
            value={card.website}
            onChange={(e) => handleChange(e, "website")}
            placeholder="www.entreprise.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={card.socialLinks.linkedin}
            onChange={(e) => handleSocialChange(e, "linkedin")}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            value={card.socialLinks.twitter}
            onChange={(e) => handleSocialChange(e, "twitter")}
            placeholder="twitter.com/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={card.socialLinks.github}
            onChange={(e) => handleSocialChange(e, "github")}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
};