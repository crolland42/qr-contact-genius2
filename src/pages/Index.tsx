import React, { useState } from "react";
import { BusinessCard } from "@/types/types";
import { BusinessCardEditor } from "@/components/BusinessCardEditor";
import { BusinessCardPreview } from "@/components/BusinessCardPreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileUpload } from "@/components/FileUpload";

const Index = () => {
  const [card, setCard] = useState<BusinessCard>({
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    socialLinks: {},
  });

  const { toast } = useToast();

  const handleSave = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("cards")
        .insert({
          user_id: user.id,
          first_name: card.firstName,
          last_name: card.lastName,
          job_title: card.position,
          company: card.company,
          phone: card.phone,
          email: card.email,
          website: card.website,
          social_links: card.socialLinks,
          photo_url: card.photo,
          logo_url: card.logo,
        });

      if (error) throw error;

      toast({
        title: "Carte sauvegardée",
        description: "Votre carte de visite a été sauvegardée avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde de la carte.",
        variant: "destructive",
      });
    }
  };

  const handlePhotoUpload = (url: string) => {
    setCard((prev) => ({ ...prev, photo: url }));
  };

  const handleLogoUpload = (url: string) => {
    setCard((prev) => ({ ...prev, logo: url }));
  };

  return (
    <div className="min-h-screen bg-secondary py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-primary">
            VC Interclosing
          </h1>
          <Button onClick={handleSave}>Sauvegarder la carte</Button>
        </div>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Créez votre carte de visite virtuelle professionnelle en quelques clics.
          Personnalisez, prévisualisez et partagez facilement.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <BusinessCardEditor card={card} onChange={setCard} />
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-2xl font-heading font-semibold text-primary">
                Images
              </h2>
              <div className="space-y-4">
                <FileUpload
                  bucketName="card-photos"
                  onUploadComplete={handlePhotoUpload}
                  label="Photo de profil"
                />
                <FileUpload
                  bucketName="card-logos"
                  onUploadComplete={handleLogoUpload}
                  label="Logo de l'entreprise"
                />
              </div>
            </div>
          </div>
          <BusinessCardPreview card={card} />
        </div>
      </div>
    </div>
  );
};

export default Index;