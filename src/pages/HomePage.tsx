import React, { useState, useEffect } from "react";
import CesiumViewport  from "../components/CesiumViewport";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import { DebugAppearance } from "cesium";
import ListView from "../components/ListView";

export default function HomePage() {
    const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
    const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);


    function updateStateClickedPos(valuesToPass : CCPosition) {
        setClickedPos(valuesToPass);
    }
    
    function updateStateClickedLoc(valuesToPass : CCLocation) {
        setClickedLoc(valuesToPass);
    }
    
    return (
      <div className="grid grid-flow-row grid-cols-2">
        <CesiumViewport updateStateClickedPos = {updateStateClickedPos}
                        updateStateClickedLoc = {updateStateClickedLoc}
                        clickedPos={clickedPos}
        />
        <ListView className="rounded-xl"/>
      </div>

    );
}
