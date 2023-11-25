export interface CCPosition {
  latitude: number;
  longitude: number;
  height: number;
}

export interface CCLocation {
  display: string;
  street: string | undefined;
  city: string | undefined;
  country: string | undefined;
  address: string | undefined;
  postal: string | undefined;
}

export interface TourFusionLocation {
  id: string;
  name: CCLocation;
  location: CCPosition;
  elevation: number;
  averageTemperature: number;
  trewarthaClassification: string;
  climateZone: string;
}

export interface changeType {
  onUpdateClickedPos: (value: CCPosition) => void;
  onUpdateClickedLoc: (value: CCLocation) => void;
}

export interface RecommendLocation {
  rank: number;
  location: CCPosition;
  city: string;
  country: string;
  elevation: number;
  avg_temp: number;
  trewartha: string;
  climate_zone: string;
}
