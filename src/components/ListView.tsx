import React , { useEffect, useState } from "react";
import Button from "./Button";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import LocationCard from "./LocationCard";
import LocationDetailsPad from "./LocationDetailsPad";
import "../styles/ListView.css"

export default function ListView({updateStateClickedLoc, zoomToPosition, clickedLoc} : any) {
    const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);
    const endpoint = 'http://localhost:5000/api';
    const [recommendedLocations, setRecommendedLocations] = useState<TourFusionLocation[]>([]);
    
    useEffect(() => {
      queryGraphQLforUserLocations()
    }, [])
    
    const queryGraphQLforUserLocations = async () => {
      let addLocationQuery = JSON.stringify({
        query: `query {
          locations(user_id: "653bfedf1e7c5a2367365f16") {
            name {
              display
              street
              city
              country
              address
              postal
            }
            location {
              latitude
              longitude
            }
            elevation
            avg_temp
            trewartha
            climate_zone
          }
        }`
      });
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: addLocationQuery,
      });
      const data = await response.json();
      const returnableLocations: TourFusionLocation[] = [];
  
      console.log(data.data.locations);
  
      for (let location of data.data.locations) {
        {/*let nameData = await getLocationNameByCoordinate(
                             location.location.latitude, 
        location.location.longitude);*/}
        returnableLocations.push({
            name : location.name,
            location: { 
                        latitude: location.location.latitude, 
                        longitude: location.location.longitude, 
                        height: 0.0
                      },
            averageTemperature: location.avg_temp,
            elevation: location.elevation,
            trewarthaClassification: location.trewartha,
            climateZone: location.climate_zone,
          }
        )}
      
      console.log(returnableLocations);
      setUserLocations(returnableLocations);
    }
  

    {/*Make this not dependable of the useState from its parent component*/}
    // const mapRecommendedLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
    //   return (
    //     <div key={tfc.name} className=""
        
    //     onClick={async () => {zoomToPosition({latitude: tfc.location.latitude, longitude: tfc.location.longitude, height: 1000000.0}); setClickedLoc(await getLocationNameByCoordinate(tfc.location.latitude, tfc.location.longitude));}}>
    //       <div className="user-location-container-title">
    //         {tfc.name}
    //       </div>
    //       <div className="user-location-container-details">
    //         Average Temperature: {tfc.averageTemperature}<br/>
    //         Elevation: {tfc.elevation}<br/>
    //         Climate: {tfc.climateZone}<br/>
    //         Trewartha Classification: {tfc.trewarthaClassification}<br/>
    //       </div>
    //     </div>
    //   );
    // }
  
    // const mapClickedLocationToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
    //   return (
    //     <div key={tfc.location.longitude} className="clicked-location-container">
    //       <div className="clicked-location-container-title">
    //         {tfc.name.city}, {tfc.name.country}
    //       </div>
    //       <div className="clicked-location-container-image">
    //         <img src="/src/assets/TourFusionLocationPics/shanghai.jpg" width="100%" alt=""/>
    //       </div>
    //       <div className="clicked-location-container-info">
    //         TODO: ~~~SOME DESCRIPTION HERE~~~<br/>
    //         Average Temperature: {tfc.averageTemperature}<br/>
    //         Elevation: {tfc.elevation}<br/>
    //         Climate: {tfc.climateZone}<br/>
    //         Trewartha Classification: {tfc.trewarthaClassification} TODO: map to some more readable description<br/>
    //       </div>
    //       <div className="clicked-location-container-buttons">
    //         <Button text="Edit" onClick={() => console.log("here")}/>
    //         <Button text="Remove" onClick={() => console.log("here2")}/>
    //       </div>
    //     </div>
    //   );
    // }

    const cards = (userLocations as TourFusionLocation[]).map((tfc) => {
      return <LocationCard onClick={() => {zoomToPosition({latitude: tfc.location.latitude, longitude: tfc.location.longitude, height: 1000000.0}); updateStateClickedLoc(tfc.name);}}
                           tfc={tfc} />
    });

    return (
        <div className="grid z-20 bg-gray-900 text-white">
            
            <div className="box-border p-4 m-4">
              <div className={clickedLoc === null ? "all-user-locations-show" : "all-user-locations-hide"}>
                <div className="all-user-locations-title">
                {/* <div className="text-2xl"> */}
                  Your Locations
                </div>

                <ul>{cards}</ul>

                <div className="recommended-locations-title">
                  Recommended for You
                </div>
                {/*(recommendedLocations as TourFusionLocation[]).map(tfc)*/}
              </div>
            </div>
            <div className={clickedLoc !== null ? "single-location-show" : "single-location-hide"}>
              <LocationDetailsPad clickedLoc={clickedLoc}/>
            </div>
          </div>  
    );
}
