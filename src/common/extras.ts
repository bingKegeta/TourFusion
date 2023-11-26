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

export function getImageLink(card: TourFusionLocation) {
  let retImage: string = "";

  if (card.name.city || card.name.city !== "") {
    if (card.elevation > 300) {
      retImage = "/TFImages/mountain_city.jpg";
    } else {
      if (["Bw"].includes(card.trewarthaClassification)) {
        retImage = "/TFImages/desert_city.jpg";
      } else {
        retImage = "/TFImages/city.jpg";
      }
    }
  } else {
    if (["Ft", "Fi", "E"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/snowy.jpg";
    } else if (["Bw"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/desert.jpg";
    } else if (["Cf", "Do"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/beach.jpg";
    } else if (["Dc", "Bs", "H"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/boreal.jpg";
    } else {
      retImage = "/TFImages/jungle.jpg";
    }
  }

  return retImage;
}
