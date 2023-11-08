import React, { useState, useEffect } from "react";
import CesiumViewport  from "../components/CesiumViewport";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import { DebugAppearance } from "cesium";

export default function HomePage() {
    const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
    const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);
    const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);
    const [recommendedLocations, setRecommendedLocations] = useState<TourFusionLocation[]>([]);

    function updateStateClickedPos(valuesToPass : CCPosition) {
        setClickedPos(valuesToPass);
    }
        
    function updateStateClickedLoc(valuesToPass : CCLocation) {
        setClickedLoc(valuesToPass);
    }
    
    const queryGraphQLforUserLocations = async () => {
        let addLocationQuery = JSON.stringify({
          query: `query {
            locations(user_id: "653bfedf1e7c5a2367365f16") {
              name
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
          let nameData = await getLocationNameByCoordinate(location.location.latitude, location.location.longitude);
          returnableLocations.push({
            name: nameData,
            data: {
              nameAsGivenByUser: location.name,
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
          });
        }
        console.log(returnableLocations);
        setUserLocations(returnableLocations);
      }
    
    return (
        <CesiumViewport updateStateClickedPos = {updateStateClickedPos}
                        updateStateClickedLoc = {updateStateClickedLoc}
                        clickedPos={clickedPos}
        />
    );
}
