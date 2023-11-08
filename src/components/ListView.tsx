import React from "react";
import Button from "./Button";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";

export default function ListView() {

    const mapUserLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
        return (
          <div key={tfc.data.nameAsGivenByUser} className="user-location-container" onClick={async () => {
            zoomToPosition({latitude: tfc.data.location.latitude, longitude: tfc.data.location.longitude, height: 1000000.0}); 
            setClickedLoc(await getLocationNameByCoordinate(tfc.data.location.latitude, tfc.data.location.longitude));}}>
            <div className="user-location-container-title">
              {tfc.data.nameAsGivenByUser}
            </div>
            <div className="user-location-container-details">
              Average Temperature: {tfc.data.averageTemperature}<br/>
              Elevation: {tfc.data.elevation}<br/>
              Climate: {tfc.data.climateZone}<br/>
              Trewartha Classification: {tfc.data.trewarthaClassification}<br/>
            </div>
          </div>
        );
    }

    {/*Make this not dependable of the useState from its parent component*/}
    {/*const mapRecommendedLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
      return (
        <div key={tfc.data.nameAsGivenByUser} className=""
        
        onClick={async () => {zoomToPosition({latitude: tfc.data.location.latitude, longitude: tfc.data.location.longitude, height: 1000000.0}); setClickedLoc(await getLocationNameByCoordinate(tfc.data.location.latitude, tfc.data.location.longitude));}}>
          <div className="user-location-container-title">
            {tfc.data.nameAsGivenByUser}
          </div>
          <div className="user-location-container-details">
            Average Temperature: {tfc.data.averageTemperature}<br/>
            Elevation: {tfc.data.elevation}<br/>
            Climate: {tfc.data.climateZone}<br/>
            Trewartha Classification: {tfc.data.trewarthaClassification}<br/>
          </div>
        </div>
      );
    }*/}
  
    const mapClickedLocationToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
      return (
        <div key={tfc.data.nameAsGivenByUser} className="clicked-location-container">
          <div className="clicked-location-container-title">
            {tfc.name.city}, {tfc.name.country}
          </div>
          <div className="clicked-location-container-image">
            <img src="/src/assets/TourFusionLocationPics/shanghai.jpg" width="100%" alt=""/>
          </div>
          <div className="clicked-location-container-info">
            TODO: ~~~SOME DESCRIPTION HERE~~~<br/>
            Average Temperature: {tfc.data.averageTemperature}<br/>
            Elevation: {tfc.data.elevation}<br/>
            Climate: {tfc.data.climateZone}<br/>
            Trewartha Classification: {tfc.data.trewarthaClassification} TODO: map to some more readable description<br/>
          </div>
          <div className="clicked-location-container-buttons">
            <Button text="Edit" onClick={() => console.log("here")}/>
            <Button text="Remove" onClick={() => console.log("here2")}/>
          </div>
        </div>
      );
    }

    
    return (
        <div className="z-20 bg-gray-900">
            <div className="">
              <div className="all-user-locations-title">
                Your Locations
              </div>
              {(userLocations as TourFusionLocation[]).map(mapUserLocationsToListBox)}
              <div className="recommended-locations-title">
                Recommended for You
              </div>
              {(recommendedLocations as TourFusionLocation[]).map(mapUserLocationsToListBox)}
            </div>
            <div className={clickedLoc !== null ? "block text-white" : "hidden text-white"}>
              {([{
                name: (clickedLoc !== null) ? clickedLoc : {
                  street: "",
                  city: "",
                  country: "",
                  address: "",
                  postal: "",
                },
                data: {
                  nameAsGivenByUser: "placeholder",
                  location: (clickedPos !== null) ? clickedPos : { latitude: 0.0, 
                                                                   longitude: 0.0, 
                                                                   height: 0.0 },
                  averageTemperature: 0.0,
                  elevation: 0.0,
                  trewarthaClassification: "",
                  climateZone: "",
                }
              }] as TourFusionLocation[]).map(mapClickedLocationToListBox)}
            </div>
          </div>  
    );
}


/*
          

*/