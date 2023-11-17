import React , { useEffect, useState } from "react";
import Button from "./Button";
import { TourFusionLocation } from "../common/types";
import LocationCard from "./LocationCard";
import LocationDetailsPad from "./LocationDetailsPad";

export default function ListView({updateStateClickedLoc, zoomToPosition, clickedLoc} : any) {
    const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(false);

    const endpoint = 'http://localhost:5000/api';
    const [recommendedLocations, setRecommendedLocations] = useState<TourFusionLocation[]>([]);
    const maxHeight = 1000000.0;

    useEffect(() => {
      queryGraphQLforUserLocations()
    }, [])
    
    const queryGraphQLforUserLocations = async () => {
      let addLocationQuery = JSON.stringify({
        query: `query {
          locations(user_id: "654b12e6265eaf51c4c29b24") {
            name {
              display
              country
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
      
      const fetchData = fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: addLocationQuery,
      });
      
      fetchData
        .then((response) => {
          if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
          }
          return response.json()
        })
        .then((data) => {
          const returnableLocations: TourFusionLocation[] = [];
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
              )
            }
            console.log(returnableLocations);
            setUserLocations(returnableLocations);
            setIsLoading(true);
        })
    }

    if (!isLoading) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div className="grid z-20 bg-gray-900 text-white absolute h-full w-full md:static">
          <div className="box-border p-4 m-4">
            <div className={clickedLoc === null ? "h-full flex flex-col space-y-6" : "hidden transition-all ease-out"}>
            <div className="border-2
                          border-[#BB9AF7]
                          bg-[#3A3535]
                          rounded-2xl
                          text-[#FCEACB]
                          box-border
                          ">
            <div className="p-2
                            grid
                            font-sans
                            text-[#FCEACB]
                            ">
              <ul className="flex flex-col text-2xl space-y-2">
                <li className="flex justify-between pl-[10px]">
                  <span>Your Locations</span>
                </li>
              </ul>

            </div>
        </div>
              <div>
                {userLocations.map((card, i) => <LocationCard onClick = {() => {
                                                              zoomToPosition({
                                                              latitude : card.location.latitude,
                                                              longitude : card.location.longitude,
                                                              height : maxHeight
                                                              })
                                                              updateStateClickedLoc(card.name)
                                                            }
                                                          }
                                                          item={card}
                                                          key = {i}/>)}
              </div>

              <div className="border 
                              text-2xl 
                              font-sans 
                              border-gray-700 
                              justify-center 
                              p-2
                              bg-gray-800
                              text-purple-300">
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
