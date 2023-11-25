import React, { useState, useEffect, useMemo } from "react";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import CesiumViewport from "../components/CesiumViewport";
import {
  CCPosition,
  CCLocation,
  TourFusionLocation,
  RecommendLocation,
} from "../common/types";
import ListView from "../components/ListView";
import ShowListBtn from "../components/ShowListBtn";
import useQuery from "../common/useQuery";
import { ALL_LOCATIONS, RECOMMENDED_LOCATIONS } from "../common/queries";

export default function HomePage() {
  const [map, setMap] = useState<Viewer | null>(null);
  const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
  const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null); // FIX THiS !!!!!!
  const [clickedCard, setClickedCard] = useState<TourFusionLocation | null>(
    null
  );
  const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);
  const [recommendedLocations, setRecommendedLocations] = useState<
    RecommendLocation[]
  >([]);
  const [showList, setShowList] = useState<Boolean>(true);
  const endpoint = "http://localhost:5000/api";

  const { executeQuery, loading, error } = useQuery(endpoint);

  function updateStateClickedPos(valuesToPass: CCPosition) {
    setClickedPos(valuesToPass);
  }

  function updateStateClickedLoc(valuesToPass: CCLocation) {
    setClickedLoc(valuesToPass);
  }

  function updateStateClickedCard(valuesToPass: TourFusionLocation) {
    setClickedCard(valuesToPass);
  }

  function updateStateMap(valuesToPass: Viewer) {
    setMap(valuesToPass);
  }

  function updateListState(updateState: Boolean) {
    setShowList(updateState);
  }

  function zoomToPosition(position: CCPosition | null) {
    if (position) {
      map?.camera.flyTo({
        destination: Cartesian3.fromDegrees(
          position.longitude,
          position.latitude,
          position.height
        ),
        orientation: {
          heading: CMath.toRadians(0.0),
          pitch: CMath.toRadians(-90.0),
        },
      });
    }
  }

  const queryGraphQLforUserLocations = async () => {
    const variables = {
      //! Add Session Token or OAuth logic
      user_id: "65586a76d592ac7d8e6d0e7f",
    };

    try {
      const { data, response } = await executeQuery(ALL_LOCATIONS, variables);

      if (!data) {
        console.error("Data or locations not available:", data);
        return;
      }

      const returnableLocations: TourFusionLocation[] = [];

      for (let location of data.locations) {
        returnableLocations.push({
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
        });
      }

      console.log(returnableLocations);
      setUserLocations([...returnableLocations]);
      console.log(userLocations);
    } catch (err) {
      console.error(err);
    }
  };

  const queryGraphQLforRecommendedLocations = async () => {
    const variables = {
      //! Add Session Token or OAuth logic
      user_id: "65586a76d592ac7d8e6d0e7f",
      num_recommendations: 5,
    };

    try {
      const { data, response } = await executeQuery(
        RECOMMENDED_LOCATIONS,
        variables
      );

      if (!data || !data.recommendedLocations) {
        console.error("Data or locations not available:", data);
        return;
      }

      console.log("data: ", data);

      const recLocations: RecommendLocation[] = [];

      for (let recs of data.recommendedLocations) {
        recLocations.push({
          rank: recs.rank,
          location: {
            latitude: recs.location.latitude,
            longitude: recs.location.longitude,
            height: 0,
          },
          city: recs.city,
          country: recs.country,
          elevation: recs.elevation,
          avg_temp: recs.avg_temp,
          trewartha: recs.trewartha,
          climate_zone: recs.climate_zone,
        });
      }

      console.log("Recommended locations for the user:", recLocations);
      setRecommendedLocations([...recLocations]);
    } catch (err) {
      console.error("Problem with the data", err);
    }
  };

  useEffect(() => {
    queryGraphQLforUserLocations();
    queryGraphQLforRecommendedLocations();
  }, []);

  const memoizedListView = useMemo(() => {
    return (
      <ListView
        zoomToPosition={zoomToPosition}
        updateStateClickedCard={updateStateClickedCard}
        clickedCard={clickedCard}
        clickedPos={clickedPos}
        clickedLoc={clickedLoc}
        userLocations={userLocations}
        recommendedLocations={recommendedLocations}
        updateStateClickedLoc={updateStateClickedLoc}
      />
    );
  }, [
    zoomToPosition,
    updateStateClickedCard,
    updateStateClickedLoc,
    clickedCard,
    clickedLoc,
  ]);

  const memoizedCesiumViewport = useMemo(() => {
    return (
      <CesiumViewport
        updateStateMap={updateStateMap}
        updateStateClickedPos={updateStateClickedPos}
        updateStateClickedLoc={updateStateClickedLoc}
        updateStateClickedCard={updateStateClickedCard}
        zoomToPosition={zoomToPosition}
        clickedPos={clickedPos}
        clickedLoc={clickedLoc}
        map={map}
        userLocations={userLocations}
        recommendedLocations={recommendedLocations}
      />
    );
  }, [userLocations, map, clickedPos, recommendedLocations]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 h-[100svh]">
      {userLocations && !loading ? memoizedCesiumViewport : null}

      {showList && !loading ? memoizedListView : null}

      <ShowListBtn updateListState={updateListState} />
    </div>
  );
}
