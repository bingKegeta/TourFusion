import { PinBuilder, Color, VerticalOrigin } from "cesium";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import { TourFusionLocation } from "./types";


async function queryGraphQLforUserLocations() {
    const endpoint = "http://localhost:5000/api";

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
        }`,
    });

    try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: addLocationQuery,
        });

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data.data.locations.map(location => ({
            name: location.name,
            location: {
              latitude: location.location.latitude,
              longitude: location.location.longitude,
              height: 0.0,
            },
            averageTemperature: location.avg_temp,
            elevation: location.elevation,
            trewarthaClassification: location.trewartha,
            climateZone: location.climate_zone,
        }));
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
};

  
export async function populate(viewer : Viewer) {
    const populatePins = new PinBuilder()

    let locations : TourFusionLocation[] | null;

    locations = await queryGraphQLforUserLocations()
    // Let's try adding a regular pin first, then we can use maps or smth to 
    // populate as we want

    if (locations) {
        locations.forEach((location ) => {
            viewer.entities.add({
                name: "Blank blue pin",
                position: Cartesian3.fromDegrees(location.location.latitude, location.location.longitude),
                billboard: {
                    image: populatePins.fromColor(Color.ROYALBLUE, 48).toDataURL(),
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    },
            });
        })

    }
}