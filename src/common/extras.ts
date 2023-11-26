import { RecommendLocation, TourFusionLocation } from "./types";

export function RecommendLocationToTourFusionLocation(rec: RecommendLocation) {
  let retVal: TourFusionLocation = {
    id: "",
    name: {
      display: "Somewhere",
      street: "",
      city: "",
      country: "Some Place",
      address: "",
      postal: "",
    },
    location: {
      latitude: 0,
      longitude: 0,
      height: 0,
    },
    elevation: 0,
    averageTemperature: 0,
    trewarthaClassification: "",
    climateZone: "",
  };

  retVal.location = rec.location;
  retVal.name.display = rec.city;
  retVal.name.country = rec.country;

  retVal.elevation = rec.elevation;
  retVal.averageTemperature = rec.avg_temp;
  retVal.climateZone = rec.climate_zone;
  retVal.trewarthaClassification = rec.trewartha;

  return retVal;
}
