import { PinBuilder, Color, VerticalOrigin } from "cesium";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import { RecommendLocation, TourFusionLocation } from "./types";

export async function populate(
  viewer: Viewer,
  userLocations: TourFusionLocation[],
  recommendedLocations: RecommendLocation[]
) {
  const populatePins = new PinBuilder();

  // Let's try adding a regular pin first, then we can use maps or smth to
  // populate as we want
  console.log("Printing userLocations", userLocations);
  if (userLocations) {
    userLocations.forEach((location: TourFusionLocation) => {
      viewer.entities.add({
        name: "Added Locations",
        position: Cartesian3.fromDegrees(
          location.location.longitude,
          location.location.latitude
        ),
        billboard: {
          image: populatePins.fromColor(Color.ROYALBLUE, 48).toDataURL(),
          verticalOrigin: VerticalOrigin.BOTTOM,
        },
      });
    });
  }

  if (recommendedLocations) {
    recommendedLocations.forEach((rec: RecommendLocation) => {
      viewer.entities.add({
        name: "Recommended Locations",
        position: Cartesian3.fromDegrees(
          rec.location.longitude,
          rec.location.latitude
        ),
        billboard: {
          image: populatePins.fromColor(Color.DARKRED, 48).toDataURL(),
          verticalOrigin: VerticalOrigin.BOTTOM,
        },
      });
    });
  }
}
