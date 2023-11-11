import React , { useEffect, useState } from "react";
import Button from "./Button";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import { queryGraphQL } from "../common/query";
import "../styles/LocationDetailsPad.css"

export default function LocationDetailsPad({user_id, userLocations, endpoint, queryGraphQLforUserLocations, clickedPos, clickedLoc} : any) {

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
      console.log(tfc.name.city)
      if (
        tfc.name.city === "" || tfc.name.country === "" ||
        tfc.name.city === undefined || tfc.name.country === undefined ||
        tfc.name.city === null || tfc.name.country === null ||
        tfc.name.city === "undefined" || tfc.name.country === "undefined"
          )
      {
        return (
          <div className="clicked-location-container-title">
            Ocean
          </div>
        );
      }
      else
      {
        return (
          <div className="clicked-location-container-title">
            {tfc.name.city}, {tfc.name.country}
          </div>
        );
      }
    }

    const buttons = (tfc: TourFusionLocation): React.JSX.Element => {
      let flag = false;
      for (let loc of userLocations)
      {
        if (tfc.name.city === loc.name.city && tfc.name.country === loc.name.country)
        {
          flag = true;
          break;
        }
      }
      if (flag)
      {
        return (
          <div className="clicked-location-container-buttons">
            <Button text="E" onClick={() => console.log("here")}/>
            <Button text="R" onClick={() => console.log("here2")}/>
          </div>
        );
      }
      else
      {
        return (
          <div className="clicked-location-container-buttons">
            <Button text="+" onClick={async () => await queryGraphQLforaddLocation()}/>
          </div>
        );
      }
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
              <img src="/src/assets/TourFusionLocationPics/shanghai.jpg" width="100%" alt=""/>
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