import { Viewer, Math as CMath, Cartesian3, Cartesian2, SceneTransforms } from "cesium";
import React, { useEffect, useRef, useState } from "react";
import { CCPosition, CCLocation } from "../common/types";
import { populate } from "../common/addPins";
import PopUpCard from "./PopUpCard";

interface CardPropsState {
  x: number;
  y: number;
  valuesCCPosition: CCPosition | null;
  valuesCCLocation: CCLocation | null;
  show: boolean;
}

export default function CesiumViewport({
  updateStateMap,
  updateStateClickedPos,
  updateStateClickedLoc,
  updateStateClickedCard,
  zoomToPosition,
  clickedPos,
  clickedLoc,
  map,
  userLocations,
}: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const maxHeightVal = 1000000.0;
  const [cardProps, setCardProps] = useState<CardPropsState>({ x: 0, y: 0, valuesCCPosition: null, valuesCCLocation: null, show: false });
  
  // Load in the Cesium Container
  useEffect(() => {
    if (divRef.current) {
      const viewerInstance = new Viewer(divRef.current, {
        infoBox: false,
        timeline: false,
        animation: false,
        homeButton: false,
        fullscreenButton: false,
        navigationHelpButton: false,
        navigationInstructionsInitiallyVisible: false,
      });
      viewerInstance.resolutionScale = 1.0; // We might be able to use this?
      updateStateMap(viewerInstance);
      console.log("Printing userLocations inside CesiumViewport", userLocations)
      populate(viewerInstance, userLocations); // NEW, adds the pin after having the globe
      return () => viewerInstance?.destroy();
    }
  }, []);

  // This will be moved
  // Load in the user's recommended locations
  useEffect(() => {
    const getRecommendedLocations = async () => {
      return await [];
    };
    getRecommendedLocations();
  }, []);

  // This use effect is in charge of setting the CCLocation using the values
  // inside clickedPos. This will run when clickedPos changes..
  useEffect(() => {
    if (clickedPos) {
      if (clickedPos.height > maxHeightVal) {
        zoomOut(clickedPos, maxHeightVal);
      } else {
        zoomToPosition(clickedPos);
      }

      const fetchInformation = async () => {
        const value = await getLocationNameByCoordinate(
          clickedPos?.latitude,
          clickedPos?.longitude
        );
        updateStateClickedLoc(value);
        setCardProps(prev => ({
          ...prev,
          valuesCCLocation: value,
        }));
      };
      fetchInformation();
    }
    console.log("ClickedPos", clickedPos);

  }, [clickedPos]);

  function getCenterOfViewport(viewer: Viewer): Cartesian3 | null {
    const canvas = viewer.scene.canvas;
    const center = new Cartesian2(canvas.clientWidth / 2, canvas.clientHeight / 2);
    const returnCoordinates = viewer.camera.pickEllipsoid(center, viewer.scene.globe.ellipsoid);
    
    if (returnCoordinates) {
      return returnCoordinates
    }
    else {
      return null;
    }
  }

  function convertToScreenSpace(viewer: Viewer, cartesian: Cartesian3): { x: number, y: number } {
    const screenSpace = SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
    return { x: screenSpace.x, y: screenSpace.y };
  }
  
  // Get latitude and longitude, this will be in charge of setting the values 
  // inside clickedPos, as well as the CardProps..
  const getPositionOnClick = (clicked: any) => {
    let valuesToPass : CCPosition;
    
    if (map === null) return;

    const viewer = map;
    const ellipsoid = viewer.scene.globe.ellipsoid;

    let cartesian: Cartesian3 | undefined = undefined;

    cartesian = viewer.camera.pickEllipsoid(
      new Cartesian2(clicked.clientX, clicked.clientY),
      ellipsoid
    );
    if (cartesian) {
      let cartographic = ellipsoid.cartesianToCartographic(cartesian);
      valuesToPass = {
        longitude: CMath.toDegrees(cartographic.longitude),
        latitude: CMath.toDegrees(cartographic.latitude),
        height: Math.ceil(viewer.camera.positionCartographic.height),
      };

      console.log("Latitude: " + valuesToPass.latitude);
      console.log("Longitude: " + valuesToPass.longitude);
      console.log("Height: " + valuesToPass.height);

      updateStateClickedPos(valuesToPass);

      const centerPosition : Cartesian3 | null  = getCenterOfViewport(map);
      
      if (centerPosition) {
        const fixedCenterPosition = convertToScreenSpace(map, centerPosition);
        if (fixedCenterPosition){
          setCardProps(prev => ({
            ...prev,
            x: fixedCenterPosition.x, 
            y: fixedCenterPosition.y, 
            valuesCCPosition: valuesToPass, 
            show: true,
          }));
        }
      }

    }
  };

  const getLocationNameByCoordinate = (
    latitude: number | undefined,
    longitude: number | undefined
  ): Promise<CCLocation> => {
    let baseUrl = "https://dev.virtualearth.net/REST/v1/Locations/";
    var url =
      baseUrl +
      latitude +
      "," +
      longitude +
      "?&key=" +
      import.meta.env.VITE_BING_MAPS_API_KEY;
    let requestedNamedLocation: Promise<CCLocation> = fetch(url).then(
      (result) =>
        result.json().then((res) => {
          if (res.resourceSets[0].resources[0] !== undefined) {
            var locationInformation = res.resourceSets[0].resources[0].address;
            console.log(res.resourceSets[0].resources[0].address);
            console.log(
              locationInformation.locality +
                ", " +
                locationInformation.countryRegion
            );
            if (locationInformation.locality !== undefined) {
              return {
                display: locationInformation.locality,
                street: locationInformation.addressLine,
                city: locationInformation.locality,
                country: locationInformation.countryRegion,
                address: locationInformation.formattedAddress,
                postal: locationInformation.postalCode,
              };
            } else {
              return {
                display: locationInformation.adminDistrict2,
                street: locationInformation.addressLine,
                city: locationInformation.adminDistrict2,
                country: locationInformation.countryRegion,
                address: locationInformation.formattedAddress,
                postal: locationInformation.postalCode,
              };
            }
          } else {
            return {
              display: "Some Place",
              street: "",
              city: "",
              country: "",
              address: "",
              postal: "",
            };
          }
        })
    );
    return requestedNamedLocation;
  };

  function zoomOut(position: CCPosition, height: number) {
    map?.camera.flyTo({
      destination: Cartesian3.fromDegrees(
        position.longitude,
        position.latitude,
        height
      ),
      orientation: {
        heading: CMath.toRadians(0.0),
        pitch: CMath.toRadians(-90.0),
      },
    });
  }

  // useEffect(() => {
  //   console.log(clickedPos)
  //   if (clickedPos === null) {
  //     getLocationNameByCoordinate(clickedPos?.latitude, clickedPos?.longitude);
  //   }
  // }, [clickedPos]);

  // async function handleUserClicks(e : any) {
  //   getPositionOnClick(e);
  //   updateStateClickedLoc(await getLocationNameByCoordinate(clickedPos?.latitude, clickedPos?.longitude));
  // }


  return (
    <>
      <div
        className="w-full h-full m-0 p-0 overflow-hidden lg:col-span-2"
        ref={divRef}
        onDoubleClick={(e) => {
          updateStateClickedCard(null)
          getPositionOnClick(e);
        }}
      />
      {cardProps.show && <PopUpCard x={cardProps.x} y={cardProps.y} clickedPos={cardProps.valuesCCPosition} clickedLoc={cardProps.valuesCCLocation}/>}
    </>
  );
}
