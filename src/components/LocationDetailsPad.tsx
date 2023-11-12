import React , { useEffect, useState } from "react";
import Button from "./Button";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import { queryGraphQL } from "../common/query";
import "../styles/LocationDetailsPad.css"

export default function LocationDetailsPad({user_id, userLocations, endpoint, queryGraphQLforUserLocations, clickedPos, clickedLoc} : any) {

  // Approximate "<lat>, <lon>" : [<radius_of_effect>, <img_path>]
  const specialLocations = {
    // Americas
    "25, -77.5" : "/src/assets/TourFusionLocationPics/atlantis-nassau.jpg",
    // "" : "/src/assets/TourFusionLocationPics/star-wars-forest",

    // Europe
    "49, 2.5" : "/src/assets/TourFusionLocationPics/eifel-tower-paris.jpg",
    "51.5, 0" : "/src/assets/TourFusionLocationPics/london.jpg",

    // Africa
    "30, 31" : "/src/assets/TourFusionLocationPics/pyramids.jpg",
    "28.5, 28.5" : "/src/assets/TourFusionLocationPics/white-sands-of-egypt.jpg",

    // Asia
    "35.5, 140" : "/src/assets/TourFusionLocationPics/japan.jpg",
    "31, 121.5" : "/src/assets/TourFusionLocationPics/shanghai.jpg",
    "28, 87" : "/src/assets/TourFusionLocationPics/snow-mountains.jpg",
    "27.5, 85.5" : "/src/assets/TourFusionLocationPics/nepalese-temple.webp",
    "1.5, 104" : "/src/assets/TourFusionLocationPics/singapore.jpg",
    "11, 79" : "/src/assets/TourFusionLocationPics/southeast-asian-temple.jpg",
    // Dubai
    "25.5, 55.5" : "/src/assets/TourFusionLocationPics/dubai.jpg",
    "25, 55.5" : "/src/assets/TourFusionLocationPics/dubai-2.jpg",
    "25, 55" : "/src/assets/TourFusionLocationPics/dubai.jpg",

  }

  const environmentBasedImageMapping = {

  }

  const queryGraphQLforaddLocation = async () => {
    console.log(`mutation {
      addLocation(
        user_id: "${user_id}"
        name: {
          display: "placeholder",
          street: "${clickedLoc.street}",
          city: "${clickedLoc.city}",
          country: "${clickedLoc.country}",
          address: "${clickedLoc.address}",
          postal: "${clickedLoc.postal}"
        }
        latitude: ${clickedPos.latitude}
        longitude: ${clickedPos.longitude}
      )
    }`);
    const data = await queryGraphQL(endpoint, `mutation {
      addLocation(
        user_id: "${user_id}"
        name: {
          display: "placeholder",
          street: "${clickedLoc.street}",
          city: "${clickedLoc.city}",
          country: "${clickedLoc.country}",
          address: "${clickedLoc.address}",
          postal: "${clickedLoc.postal}"
        }
        latitude: ${clickedPos.latitude}
        longitude: ${clickedPos.longitude}
      )
    }`);
    console.log(data);
    await queryGraphQLforUserLocations();
  }

  const title = (tfc: TourFusionLocation): React.JSX.Element => {
    if (
      tfc.name.city === "" || tfc.name.country === "" ||
      tfc.name.city === undefined || tfc.name.country === undefined ||
      tfc.name.city === null || tfc.name.country === null ||
      tfc.name.city === "undefined" || tfc.name.country === "undefined"
        )
    {
      return (
        <div className="clicked-location-container-title">
          International Waters
        </div>
      );
    }
    else {
      return (
        <div className="clicked-location-container-title">
          {tfc.name.city}, {tfc.name.country}
        </div>
      );
    }
  }

  const buttons = (tfc: TourFusionLocation): React.JSX.Element => {
    if (
      tfc.name.city === "" || tfc.name.country === "" ||
      tfc.name.city === undefined || tfc.name.country === undefined ||
      tfc.name.city === null || tfc.name.country === null ||
      tfc.name.city === "undefined" || tfc.name.country === "undefined"
        )
    {
      return (
        <div className="clicked-location-container-buttons" />
      );
    }

    let flag = false;
    for (let loc of userLocations) {
      if (tfc.name.city === loc.name.city && tfc.name.country === loc.name.country)
      {
        flag = true;
        break;
      }
    }

    if (flag) {
      return (
        <div className="clicked-location-container-buttons">
          <Button text="E" onClick={() => console.log("here")}/>
          <Button text="R" onClick={() => console.log("here2")}/>
        </div>
      );
    }
    else {
      return (
        <div className="clicked-location-container-buttons">
          <Button text="+" onClick={async () => await queryGraphQLforaddLocation()}/>
        </div>
      );
    }
  }
  
  const imageMapping = (tfc: TourFusionLocation): string => {
    // Check if this is International Waters
    if (
      tfc.name.city === "" || tfc.name.country === "" ||
      tfc.name.city === undefined || tfc.name.country === undefined ||
      tfc.name.city === null || tfc.name.country === null ||
      tfc.name.city === "undefined" || tfc.name.country === "undefined"
        )
        return "/src/assets/TourFusionLocationPics/open-ocean.jpg";
    // Check if this is a special location
    let latLonKey: string = Math.round(tfc.location.latitude*2)/2 + ", " + Math.round(tfc.location.longitude*2)/2;
    if (latLonKey in specialLocations) {
      // @ts-ignore
      return specialLocations[latLonKey];
    }
    // TODO: Eventually, use population density as a possible picture here

    // Use the biome as the picture
    return "";
  }

  const mapClickedLocationToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
      if (clickedLoc !== null)
        tfc.name = clickedLoc;
      if (clickedPos !== null)
        tfc.location = clickedPos;
      
      return (
        <div key={tfc.location.longitude} className="clicked-location-container">
          {([tfc] as TourFusionLocation[]).map(title)}
          {([tfc] as TourFusionLocation[]).map(buttons)}
          <div className="clicked-location-container-image">
            <img src={imageMapping(tfc)} width="100%" alt=""/>
          </div>
          <div className="clicked-location-container-info">
            TODO: ~~~SOME DESCRIPTION HERE~~~<br/>
            Average Temperature: {tfc.averageTemperature}<br/>
            Elevation: {tfc.elevation}<br/>
            Climate: {tfc.climateZone}<br/>
            Trewartha Classification: {tfc.trewarthaClassification} TODO: map to some more readable description<br/>
          </div>
        </div>
      );
  }

  return (
    <div className={clickedLoc !== null ? "block text-white" : "hidden text-white"}>
        {([{
        name: {
            street: "",
            city: "",
            country: "",
            address: "",
            postal: "",
        },
        location: { latitude: 0.0, 
                    longitude: 0.0, 
                    height: 0.0 },
        averageTemperature: 0.0,
        elevation: 0.0,
        trewarthaClassification: "",
        climateZone: "",
        }] as TourFusionLocation[]).map(mapClickedLocationToListBox)}
    </div>
  );
}