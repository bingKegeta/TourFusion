import { Viewer, ScreenSpaceEventHandler, Math as CMath, Cartesian3, ScreenSpaceEventType } from "cesium";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// const fetch = require("node-fetch")


function App() {

  class CCPosition {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
    public height: number = -100.0;

    public constructor(init?:Partial<CCPosition>) {
      Object.assign(this, init);
    }

    public reassign(values?: Partial<CCPosition>) {
      Object.assign(this, values);
    }
  }
  
  const [map, setMap] = useState<Viewer|null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [clickedPos, setClickedPos] = useState<CCPosition>(new CCPosition());

  useEffect(() => {
    if (divRef.current) {
      setMap(new Viewer(divRef.current));
      return () => map?.destroy();
    }
  }, []);

  // const queryGraphQL = () => {
  //   fetch('https://localhost:5000/api', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'X-Api-Service-Key': '123456789077',
  //     },
  //     body: JSON.stringify({query:
  //      `query{
  //         addUser(
  //           user_id: $user_id
  //           name: $name
  //           latitude: $latitude
  //           longitude: $longitude
  //           )
  //       }`,
  //     variables: { "user_id": "653bfedf1e7c5a2367365f16", "name": "PLACE Y", "latitude": , "longitude": }})
  //   })
  //     .then(r => r.json())
  //     .then(data => console.log('data returned:', data));
  // }

  // Get latitude and longitude
  // TODO: Fix this: It executes every click again every time a new click is encountered
  // TODO: Make the name of the place more modular using cesium's reverse geocoding or something
  //! The first click on refresh or just moving the globe is (0,0) coords - wrong
  //* Suggestion: Add location only on double click and prompt again to be sure if user wants to add that location
  //? Clean the code to make it more modular?
	const getPositionOnClick = async () => {
    if (map === null)
      return;
    var viewer = map;
    var scene = viewer.scene;
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var longitude = 0.0;
    var latitude = 0.0;
    var height = 0.0;
    var cartesian: Cartesian3 | undefined = undefined;
    var handler = new ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement: any) {
      cartesian = viewer.camera.pickEllipsoid(movement.position, ellipsoid);
      if (cartesian) {
          var cartographic = ellipsoid.cartesianToCartographic(cartesian);
          longitude = CMath.toDegrees(cartographic.longitude);
          latitude = CMath.toDegrees(cartographic.latitude);
          height = Math.ceil(viewer.camera.positionCartographic.height);
          setClickedPos(new CCPosition({latitude, longitude, height}));
      }
    }, ScreenSpaceEventType.LEFT_CLICK);
    handler.setInputAction(function(wheelment: any) {
        latitude = clickedPos.latitude;
        longitude = clickedPos.longitude;
        height = Math.ceil(viewer.camera.positionCartographic.height);
        setClickedPos(new CCPosition({latitude, longitude, height}));
      }, ScreenSpaceEventType.WHEEL);

    console.log(clickedPos.latitude);
    console.log(clickedPos.longitude);
    console.log(clickedPos.height);

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

    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="cesium" ref={divRef} onClick={() => {getPositionOnClick()}}/>
        <div className="right-container">
          {}
        </div>
      </header>
    </div>
  );
}

export default App;
