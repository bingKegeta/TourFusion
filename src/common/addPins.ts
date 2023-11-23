import { PinBuilder, Color, VerticalOrigin } from "cesium";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import { TourFusionLocation } from "./types";

  
export async function populate(viewer : Viewer, userLocations : TourFusionLocation[]) {
    const populatePins = new PinBuilder()

    // Let's try adding a regular pin first, then we can use maps or smth to 
    // populate as we want
    console.log("Printing userLocations", userLocations);
    if (userLocations) {
      userLocations.forEach((location : TourFusionLocation) => {
            viewer.entities.add({
                name: "Blank blue pin",
                position: Cartesian3.fromDegrees(location.location.longitude, location.location.latitude),
                billboard: {
                    image: populatePins.fromColor(Color.ROYALBLUE, 48).toDataURL(),
                    verticalOrigin: VerticalOrigin.BOTTOM,
                    },
            });
        })

    }
}