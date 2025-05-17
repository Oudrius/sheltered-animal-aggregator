export {};

declare global {
  interface AnimalDetails {
    name?: string;
    age?: number;
    sex: "male" | "female"| "unknown";
    specialNeeds?: string;
    description?: string;
    picture?: string;
    pictureUrl?: File;
    species: string;
  }

  interface AnimalCardsProps {
    animalData: AnimalDetails[];
  }

  interface CityProps {
    id: number,
    name: string
  }

  interface ShelterProps {
    id: number;
    owner: number;
    name: string;
    city: number;
    full_address: string;
    email: string;
    phone: string;
    website: string;
  }

  interface SpeciesProps {
    id: number;
    name: string;
  }

  interface Filters {
    city: string;
    shelter: string;
    species: string;
  }

  interface SortingProps {
    cities: CityProps[];
    shelters: ShelterProps[];
    species: SpeciesProps[];
    onSelect: (type: keyof Filters, value: string) => void;
  }
}