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
}