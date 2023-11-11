import React, { useState, useEffect } from "react";
import { Viewer, Cartesian3, Math as CMath } from "cesium";
import CesiumViewport  from "../components/CesiumViewport";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import { DebugAppearance } from "cesium";
import ListView from "../components/ListView";
import "../styles/HomePage.css";

export default function HomePage() {
    const [map, setMap] = useState<Viewer|null>(null);
    const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
    const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);

    function updateStateClickedPos(valuesToPass : CCPosition) {
        setClickedPos(valuesToPass);
    }
    
    function updateStateClickedLoc(valuesToPass : CCLocation) {
        setClickedLoc(valuesToPass);
    }
    
    function updateStateMap(valuesToPass : Viewer) {
        setMap(valuesToPass);
    }

    function zoomToPosition(position: CCPosition | null){
        if (position) {
        map?.camera.flyTo({
            destination: Cartesian3.fromDegrees(position.longitude, 
                                                position.latitude, 
                                                position.height
                                                ),
            orientation: {
            heading: CMath.toRadians(0.0),
            pitch: CMath.toRadians(-90.0),
            }
        });
        }
    }
    
    return (
        <div className="App-header">
            <CesiumViewport updateStateMap = {updateStateMap}
                            updateStateClickedPos = {updateStateClickedPos}
                            updateStateClickedLoc = {updateStateClickedLoc}
                            zoomToPosition = {zoomToPosition}
                            clickedPos={clickedPos}
                            clickedLoc={clickedLoc}
                            map={map}
            />
            <div className="list-container">
                <ListView className="rounded-xl"
                          zoomToPosition = {zoomToPosition}
                          updateStateClickedLoc = {updateStateClickedLoc}
                          clickedPos={clickedPos}
                          clickedLoc={clickedLoc}
                />
            </div>
        </div>
    );
}
