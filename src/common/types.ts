export interface CCPosition {
    latitude: number;
    longitude: number;
    height: number;
}

export interface CCLocation {
    street: string | undefined;
    city: string | undefined;
    country: string | undefined;
    address: string | undefined;
    postal: string | undefined;
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

export interface changeType {
    onUpdateClickedPos: (value: CCPosition) => void;
    onUpdateClickedLoc: (value: CCLocation) => void;
}