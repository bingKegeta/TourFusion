import React, { useState, useEffect, useMemo } from "react";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import CesiumViewport from "../components/CesiumViewport";
import { CCPosition, CCLocation } from "../common/types";
import ListView from "../components/ListView";
import ShowList from "../components/ShowList";

export default function HomePage() {
  const [map, setMap] = useState<Viewer | null>(null);
  const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
  const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);
  const [showList, setShowList] = useState<Boolean>(true);

  function updateStateClickedPos(valuesToPass: CCPosition) {
    setClickedPos(valuesToPass);
  }

  function updateStateClickedLoc(valuesToPass: CCLocation) {
    setClickedLoc(valuesToPass);
  }

  function updateStateMap(valuesToPass: Viewer) {
    setMap(valuesToPass);
  }

  function updateListState(updateState: Boolean) {
    setShowList(updateState);
    console.log(showList);
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

  const memoizedListView = useMemo(() => {
    return (
      <ListView
        zoomToPosition={zoomToPosition}
        updateStateClickedLoc={updateStateClickedLoc}
        clickedLoc={clickedLoc}
        clickedPos={clickedPos}
      />
    );
  }, [zoomToPosition, updateStateClickedLoc, clickedLoc]);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 h-[100svh]">
      <CesiumViewport
        updateStateMap={updateStateMap}
        updateStateClickedPos={updateStateClickedPos}
        updateStateClickedLoc={updateStateClickedLoc}
        zoomToPosition={zoomToPosition}
        clickedPos={clickedPos}
        clickedLoc={clickedLoc}
        map={map}
      />

      {showList ? memoizedListView : null}

      <ShowList updateListState={updateListState} />
    </div>
  );
}
