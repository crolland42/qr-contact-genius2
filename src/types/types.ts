export interface BusinessCard {
  firstName: string;
  lastName: string;
  position: string;
  company: string;
  phone: string;
  email: string;
  website?: string;
  photo?: string;
  logo?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface BusinessCardFormProps {
  card: BusinessCard;
  onChange: (card: BusinessCard) => void;
}

export interface BusinessCardPreviewProps {
  card: BusinessCard;
}