import { Viewer, ScreenSpaceEventHandler, Math as CMath, Cartesian3, Cartesian2, ScreenSpaceEventType } from "cesium";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { CCPosition } from "./common/types";

function App() {

  
  const [map, setMap] = useState<Viewer|null>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);

  useEffect(() => {
    if (divRef.current) {
      const viewerInstance = new Viewer(divRef.current);
      setMap(viewerInstance);

      return () => viewerInstance?.destroy();
    }
  }, []);

  // Get latitude and longitude
  // TODO: Fix this: It executes every click again every time a new click is encountered
  // Resolution: Now the event is handled by react on a double click, as opposed to cesium's event handler


  // TODO: Make the name of the place more modular using cesium's reverse geocoding or something
  
  
  //! The first click on refresh or just moving the globe is (0,0) coords - wrong
  // Resolution: The previous version was handling the event on cesium's event handler.
  // While that worked, the async nature of the useState hook was causing the initial coordiante to be the default one.
  // Now, we are passing the click event which contains the part of the screen that was clicked.
  // Then, we are using the camera to pick the ellipsoid at that point and get the coordinates.
  
  //* Suggestion: Add location only on double click and prompt again to be sure if user wants to add that location
  //? Clean the code to make it more modular?
	const getPositionOnClick = (clicked : any) => {


    if (map === null)
      return;
    const viewer = map;  
    const ellipsoid = viewer.scene.globe.ellipsoid;
  
    let cartesian: Cartesian3 | undefined = undefined;
    
    cartesian = viewer.camera.pickEllipsoid(new Cartesian2(clicked.clientX, clicked.clientY), ellipsoid);
    if (cartesian) {
        let cartographic = ellipsoid.cartesianToCartographic(cartesian);
        const longitude = CMath.toDegrees(cartographic.longitude);
        const latitude = CMath.toDegrees(cartographic.latitude);
        const height = Math.ceil(viewer.camera.positionCartographic.height);
        
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        console.log("Height: " + height);

        setClickedPos({latitude, longitude, height});
    }
      {/*
      //! Only use for testing, the error on unable to add due to same location should be handled too
      // TODO: Convert to separate function/file for all the possible queries
      const endpoint = 'http://localhost:5000/api';
      const name = 'Place A';
      const addLocationQuery = JSON.stringify({
        query: `mutation {
          addLocation(user_id: "6537f36acdd7568258da16d5", name: "${name}", latitude: ${clickedPos.latitude}, longitude: ${clickedPos.longitude})
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

    console.log(data);*/}
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="cesium" ref={divRef} onDoubleClick = {getPositionOnClick}/>
        <div className="right-container">
          {}
        </div>
      </header>
    </div>
  );
}

export default App;
