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

export interface TourFusionLocation {
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