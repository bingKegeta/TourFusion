export interface CCPosition {
    latitude: number;
    longitude: number;
    height: number;
}

export interface CCLocation {
    street: string;
    city: string;
    country: string;
    address: string;
    postal: string;
}

export interface TourFusionInformation {
    nameAsGivenByUser: string;
    location: CCPosition;
    elevation: number;
    averageTemperature: number;
    trewarthaClassification: string;
    climateZone: string;
}

export interface TourFusionLocation {
    name: CCLocation;
    data: TourFusionInformation;
}