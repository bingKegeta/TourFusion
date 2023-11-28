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
  console.log(card);

  if (card.name.country || card.name.country !== "") {
    // Cities
    if (card.name.street || card.name.street !== "") {
      if (card.elevation > 300) {
        retImage = "/TFImages/mountain_city.jpg";
      } else {
        if (["BW"].includes(card.trewarthaClassification)) {
          retImage = "/TFImages/desert_city.jpg";
        } else {
          retImage = "/TFImages/city.jpg";
        }
      }
    }
    // Biome
    else if (["Ft", "Fi", "E"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/snowy.jpg";
    } else if (["BW"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/desert.jpg";
    } else if (["Cf", "Do"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/beach.jpg";
    } else if (["Dc", "H"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/boreal.jpg";
    } else if (["BS"].includes(card.trewarthaClassification)) {
      retImage = "/TFImages/steppe.jpg";
    } else {
      retImage = "/TFImages/jungle.jpg";
    }
  } else {
    retImage = "/TFImages/ocean.jpg";
  }

  return retImage;
}

export function round(num: number, places: number) {
  var multiplier = Math.pow(10, places);
  return Math.round(num * multiplier) / multiplier;
}

export function getSessionToken() {
  const cookies = document.cookie.split("; ");
  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith("session_token=")
  );

  return sessionCookie ? sessionCookie.split("=")[1] : null;
}

export const endpoint = "http://api.tour-fusion.com/api";
