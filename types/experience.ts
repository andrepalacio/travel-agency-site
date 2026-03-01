export interface Experience {
  id: string;
  slug: string;
  title: string;
  imageUrl: string;
  isFeatured: boolean; // La que ocupa la totalidad del ancho
}

export interface DetailedExperience {
  title: string;
  intro: {
    slogan: string;
    daysNights: string;
    description: string;
    imageLeft: string;
    imageRight: string;
  };
  itinerary: {
    goldMessage: string;
    mainImage: string;
    departure: string;
    arrival: string;
    mapImage: string;
  };
  amenities: {
    roomTitle: string;
    roomList: string[];
    roomImage: string;
    includesTitle: string;
    includesImage: string;
    includesList: string[];
    optionalGrid?: string[]; // Las 6 imágenes opcionsles
    notIncludedList: string[];
    requirementsList: string[];
  };
}