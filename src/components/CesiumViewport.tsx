import { Viewer, Math as CMath, Cartesian3, Cartesian2, SceneMode } from "cesium";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { CCPosition, CCLocation, TourFusionLocation } from "./common/types";
import Button from "./components/Button";


export default function CesiumViewport() {
  const endpoint = 'http://localhost:5000/api';
  const [map, setMap] = useState<Viewer|null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
  const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);
  const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);
  const [recommendedLocations, setRecommendedLocations] = useState<TourFusionLocation[]>([]);

  // Load in the Cesium Container
  useEffect(() => {
    if (divRef.current) {
      const viewerInstance = new Viewer(divRef.current,
        {
          // sceneMode: SceneMode.SCENE3D,
          infoBox: false,
          timeline: false,
          animation: false,
          homeButton: false,
          // scene3DOnly: true,
          // baseLayerPicker: false,
          // sceneModePicker: false,
          fullscreenButton: false,
          // projectionPicker: false,
          // selectionIndicator: false,
          navigationHelpButton: false,
          navigationInstructionsInitiallyVisible: false,
        }
      );
      viewerInstance.resolutionScale = 1.0; // We might be able to use this?
      setMap(viewerInstance);

      return () => viewerInstance?.destroy();
    }
  }, []);

  // Load in the user's locations
  useEffect(() => {
    const getUserLocations = async () => {
      return await queryGraphQLforUserLocations();
    }
    getUserLocations();
  }, [])

  // Load in the user's recommended locations
  useEffect(() => {
    const getRecommendedLocations = async () => {
      return await [];
    }
    getRecommendedLocations();
  }, [])

  // Get latitude and longitude
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

  const getLocationNameByCoordinate = (latitude: number | undefined, longitude: number | undefined): Promise<CCLocation> => {
    let baseUrl = "https://dev.virtualearth.net/REST/v1/Locations/";
    var url = baseUrl + latitude + "," + longitude + "?&key=" + import.meta.env.VITE_BING_MAPS_API_KEY;
    let requestedNamedLocation: Promise<CCLocation> = fetch(url)
    .then(result => result.json().then(
      res => {
        if (res.resourceSets[0].resources[0] !== undefined)
        {
            var locationInformation = res.resourceSets[0].resources[0].address;
            console.log(res.resourceSets[0].resources[0].address);
            console.log(locationInformation.locality + ", " + locationInformation.countryRegion);
            return {
              street: locationInformation.addressLine,
              city: locationInformation.locality,
              country: locationInformation.countryRegion,
              address: locationInformation.formattedAddress,
              postal: locationInformation.postalCode,
            }
          } else {
            return {
              street: "",
              city: "",
              country: "",
              address: "",
              postal: "",
            }
          }
        })
    );
    return requestedNamedLocation;
  }

  const queryGraphQLforUserLocations = async () => {
    let addLocationQuery = JSON.stringify({
      query: `query {
        locations(user_id: "653bfedf1e7c5a2367365f16") {
          name
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

    let response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: addLocationQuery,
    });
    let data = await response.json();
    let returnableLocations: TourFusionLocation[] = [];

    console.log(data.data.locations);
    let i = 0; // REMOVE THIS
    for (let location of data.data.locations) {
      let nameData = await getLocationNameByCoordinate(location.location.latitude, location.location.longitude);
      returnableLocations.push({
        name: nameData,
        data: {
          nameAsGivenByUser: location.name,
          location: { latitude: location.location.latitude, longitude: location.location.longitude, height: 0.0 },
          averageTemperature: location.avg_temp,
          elevation: location.elevation,
          trewarthaClassification: location.trewartha,
          climateZone: location.climate_zone,
        }
      });
      i++; // REMOVE THIS
      if (i === 12) // REMOVE THIS
        break; // REMOVE THIS
    }
    console.log(returnableLocations);
    setUserLocations(returnableLocations);
  }

  const zoomToPosition = (position: CCPosition) => {
    map?.camera.flyTo({
      destination: Cartesian3.fromDegrees(position.longitude, position.latitude, position.height),
      orientation: {
        heading: CMath.toRadians(0.0),
        pitch: CMath.toRadians(-90.0),
      }
    });
  }

  const mapUserLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
      return (
        <div key={tfc.data.nameAsGivenByUser} className="user-location-container" onClick={async () => {zoomToPosition({latitude: tfc.data.location.latitude, longitude: tfc.data.location.longitude, height: 1000000.0}); setClickedLoc(await getLocationNameByCoordinate(tfc.data.location.latitude, tfc.data.location.longitude));}}>
          <div className="user-location-container-title">
            {tfc.data.nameAsGivenByUser}
          </div>
          <div className="user-location-container-details">
            Average Temperature: {tfc.data.averageTemperature}<br/>
            Elevation: {tfc.data.elevation}<br/>
            Climate: {tfc.data.climateZone}<br/>
            Trewartha Classification: {tfc.data.trewarthaClassification}<br/>
          </div>
        </div>
      );
  }

  const mapRecommendedLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
    return (
      <div key={tfc.data.nameAsGivenByUser} className="user-location-container" onClick={async () => {zoomToPosition({latitude: tfc.data.location.latitude, longitude: tfc.data.location.longitude, height: 1000000.0}); setClickedLoc(await getLocationNameByCoordinate(tfc.data.location.latitude, tfc.data.location.longitude));}}>
        <div className="user-location-container-title">
          {tfc.data.nameAsGivenByUser}
        </div>
        <div className="user-location-container-details">
          Average Temperature: {tfc.data.averageTemperature}<br/>
          Elevation: {tfc.data.elevation}<br/>
          Climate: {tfc.data.climateZone}<br/>
          Trewartha Classification: {tfc.data.trewarthaClassification}<br/>
        </div>
      </div>
    );
  }

  const mapClickedLocationToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
    return (
      <div key={tfc.data.nameAsGivenByUser} className="clicked-location-container">
        <div className="clicked-location-container-title">
          {tfc.name.city}, {tfc.name.country}
        </div>
        <div className="clicked-location-container-image">
          <img src="/src/assets/TourFusionLocationPics/shanghai.jpg" width="100%" alt=""/>
        </div>
        <div className="clicked-location-container-info">
          TODO: ~~~SOME DESCRIPTION HERE~~~<br/>
          Average Temperature: {tfc.data.averageTemperature}<br/>
          Elevation: {tfc.data.elevation}<br/>
          Climate: {tfc.data.climateZone}<br/>
          Trewartha Classification: {tfc.data.trewarthaClassification} TODO: map to some more readable description<br/>
        </div>
        <div className="clicked-location-container-buttons">
          <Button text="Edit" onClick={() => console.log("here")}/>
          <Button text="Remove" onClick={() => console.log("here2")}/>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* I know the line below looks super crazy, but it is intentional. It just zooms in to the location clicked onDoubleClick. If you are already below 1000000.0 meters, it does not change the height so that the camera movement stays smooth. */}
        <div className="cesium" ref={divRef} onClick={(click) => {getPositionOnClick(click); setClickedLoc(null);}} onDoubleClick={async () => {(clickedPos?.latitude !== undefined && clickedPos?.longitude !== undefined && clickedPos?.height !== undefined) ? (clickedPos?.height > 1000000.0) ? zoomToPosition({latitude: clickedPos?.latitude, longitude: clickedPos?.longitude, height: 1000000.0}) : zoomToPosition({latitude: clickedPos?.latitude, longitude: clickedPos?.longitude, height: clickedPos?.height}) : {}; setClickedLoc(await getLocationNameByCoordinate(clickedPos?.latitude, clickedPos?.longitude));} }/>
        <div className="list-container">
          <div className={clickedLoc === null ? "all-user-locations-show" : "all-user-locations-hide"}>
            <div className="all-user-locations-title">
              Your Locations
            </div>
            {(userLocations as TourFusionLocation[]).map(mapUserLocationsToListBox)}
            <div className="recommended-locations-title">
              Recommended for You
            </div>
            {(recommendedLocations as TourFusionLocation[]).map(mapUserLocationsToListBox)}
          </div>
          <div className={clickedLoc !== null ? "single-location-show" : "single-location-hide"}>
            {([{
              name: (clickedLoc !== null) ? clickedLoc : {
                street: "",
                city: "",
                country: "",
                address: "",
                postal: "",
              },
              data: {
                nameAsGivenByUser: "placeholder",
                location: (clickedPos !== null) ? clickedPos : { latitude: 0.0, longitude: 0.0, height: 0.0 },
                averageTemperature: 0.0,
                elevation: 0.0,
                trewarthaClassification: "",
                climateZone: "",
              }
            }] as TourFusionLocation[]).map(mapClickedLocationToListBox)}
          </div>
        </div>
      </header>
    </div>
  );
}
