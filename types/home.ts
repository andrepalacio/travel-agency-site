export interface HomeData {
  hero: {
    shipImageUrl: string;
    exploreLink: string;
    infoLink: string;
  };

  services: {
    title: string;
    description: string;
    cards: ServiceCard[];
  };
  contact: {
    leftTitle: string;
    leftDescription: string;
    circleTitle: string;
    socials: SocialMedia[];
  };
}

export interface ServiceCard {
  id: string;
  image: string;
  title: string;
}

export interface SocialMedia {
  platform: 'instagram' | 'facebook' | 'whatsapp' | 'linkedin';
  label: string;
  url: string;
}