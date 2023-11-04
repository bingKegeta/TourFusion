import { Viewer, Math as CMath, Cartesian3, Cartesian2, BingMapsGeocoderService } from "cesium";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { CCPosition, CCLocation, TourFusionLocation } from "./common/types";
import Button from "./components/Button";

function App() {
  const endpoint = 'http://localhost:5000/api';
  const [map, setMap] = useState<Viewer|null>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [clickedPos, setClickedPos] = useState<CCPosition | null>(null);
  const [clickedLoc, setClickedLoc] = useState<CCLocation | null>(null);
  const [userLocations, setUserLocations] = useState<TourFusionLocation[]>([]);

  // Load in the Cesium Container
  useEffect(() => {
    if (divRef.current) {
      const viewerInstance = new Viewer(divRef.current);
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
      if (i === 5) // REMOVE THIS
        break; // REMOVE THIS
    }
    console.log(returnableLocations);
    setUserLocations(returnableLocations);
  }

  const mapUserLocationsToListBox = (tfc: TourFusionLocation): React.JSX.Element => {
      return (
        <div key={tfc.data.nameAsGivenByUser} className="user-location-container">
          <div className="user-location-container-title">
            {tfc.data.nameAsGivenByUser}
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
          TODO: IMAGE GOES HERE {/* <Image /> */}
        </div>
        <div className="clicked-location-container-info">
          TODO: ~~~SOME DESCRIPTION HERE~~~
          Average Temperature: {tfc.data.averageTemperature}
          Elevation: {tfc.data.elevation}
          Climate: {tfc.data.climateZone}
          {tfc.data.trewarthaClassification} TODO: map to some more readable description
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="cesium" ref={divRef} onClick={getPositionOnClick} onDoubleClick={async () => {setClickedLoc(await getLocationNameByCoordinate(clickedPos?.latitude, clickedPos?.longitude));} }/>
        {/* <AuthForm isRegister={true}/> */}
        <div className="list-container">
          {(userLocations as TourFusionLocation[]).map(mapUserLocationsToListBox)}
          {/* <Button text="here" onClick={getLocationNameByCoordinate}/> */}
        </div>
      </header>
    </div>
  );
}

export default App;
