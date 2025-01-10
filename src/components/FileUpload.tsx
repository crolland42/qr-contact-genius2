import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  bucketName: "card-photos" | "card-logos";
  onUploadComplete: (url: string) => void;
  label: string;
}

export const FileUpload = ({ bucketName, onUploadComplete, label }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      toast({
        title: "Fichier téléchargé avec succès",
        description: "Votre fichier a été téléchargé et associé à votre carte.",
      });
    } catch (error) {
      toast({
        title: "Erreur lors du téléchargement",
        description: "Une erreur est survenue lors du téléchargement du fichier.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={bucketName}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          disabled={isUploading}
          onClick={() => document.getElementById(bucketName)?.click()}
        >
          {isUploading ? "Téléchargement..." : "Choisir un fichier"}
        </Button>
        <input
          type="file"
          id={bucketName}
          className="hidden"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </div>
    </div>
  );
};