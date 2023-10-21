"use client"
import { Ion, IonImageryProvider, Terrain, Viewer, Cartesian3, Math as CMath, Cartesian2, 
        Cartographic, createOsmBuildingsAsync, Color, defined, ScreenSpaceEventType, 
        ScreenSpaceEventHandler, Globe, ConstantPositionProperty, LabelGraphics, ConstantProperty } 
        from "cesium";
import './App.css';
import { useEffect, useState, Component, useRef } from "react";

interface viewer {
    camera: { flyTo: (arg0: { destination: Cartesian3; orientation: { heading: number; pitch: number; }; }) => void; };
}
export const HomePage = (props: any) => {

  // Example
  // async function render() {
  //     Ion.defaultAccessToken = 'access_token';

  //     const viewer = new Viewer('cesiumContainer', {
  //       terrain: Terrain.fromWorldTerrain(),
  //     });    

  //     viewer.camera.flyTo({
  //       destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
  //       orientation: {
  //         heading: CMath.toRadians(0.0),
  //         pitch: CMath.toRadians(-15.0),
  //       }
  //     });

  //     const buildingTileset = await createOsmBuildingsAsync();
  //     viewer.scene.primitives.add(buildingTileset);

  //     return viewer;
  // }

  // latitude: float
  // longitude: float
  // cameraElevation: int
  function zoomToLocationOnMap(viewer : viewer, latitude: number, longitude: number, cameraElevation: number | undefined) {
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(longitude, latitude, cameraElevation),
      orientation: {
        heading: CMath.toRadians(0.0),
        pitch: CMath.toRadians(-15.0),
      }
    });
  }

  // pointName: string
  // latitude: float
  // longitude: float
  // pointSize: int
  // outlineSize: int
  // CesiumColor: Color.*
  // CesiumOutlineColor: Color.*
  function addLocationToMap(viewer: { entities: { add: (arg0: { name: any; position: Cartesian3; point: { pixelSize: any; outlineWidth: any; color: any; outlineColor: any; }; }) => void; }; }, pointName: any, latitude: number, longitude: number, pointSize: any, outlineSize: any, CesiumColor: any, CesiumOutlineColor: any) {
    viewer.entities.add({
      name: pointName,
      position: Cartesian3.fromDegrees(longitude, latitude),
      point: {
        pixelSize: pointSize,
        outlineWidth: outlineSize,
        color: CesiumColor,
        outlineColor: CesiumOutlineColor,
      },
    });
  }

  // Use this or pickEntity(viewer, e)
  function selectPreMadeLocation(viewer: { selectedEntityChanged: { addEventListener: (arg0: (selectedEntity: any) => void) => void; }; }, selectedEntity: any) {
    viewer.selectedEntityChanged.addEventListener(function(selectedEntity: { name: string; }) {
      if (defined(selectedEntity)) {
          if (defined(selectedEntity.name)) {
            console.log('Selected ' + selectedEntity.name);
          } else {
            console.log('Unknown entity selected.');
          }
      } else {
        console.log('Deselected.');
      }
    });
  }








// var viewer = new Cesium.Viewer(‘cesiumContainer’);
// viewer.scene.canvas.addEventListener(‘contextmenu’, (event) => {
//   event.preventDefault();
//   const mousePosition = new Cesium.Cartesian2(event.clientX, event.clientY);
//   const selectedLocation = convertScreenPixelToLocation(mousePosition );
//   setMarkerInPos(selectedLocation);
//   }, false);

// function convertScreenPixelToLocation(mousePosition) {
//     const ellipsoid = viewer.scene.globe.ellipsoid;
//     const cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);
//     if (cartesian) {
//     const cartographic = ellipsoid.cartesianToCartographic(cartesian);
//     const longitudeString = Cesium.CMath.toDegrees(cartographic.longitude).toFixed(15);
//     const latitudeString = Cesium.CMath.toDegrees(cartographic.latitude).toFixed(15);
//     return {lat: Number(latitudeString),lng: Number(longitudeString)};
//     } else {
//     return null;
//     }
//   }

//   function setMarkerInPos(position){
//     viewer.pickTranslucentDepth = true;
//     const locationMarker = viewer.entities.add({
//     name : ‘location’,
//     position : Cesium.Cartesian3.fromDegrees(position.lng, position.lat, 300),
//     point : {
//     pixelSize : 5,
//     color : Cesium.Color.RED,
//     outlineColor : Cesium.Color.WHITE,
//     outlineWidth : 2
//     },
//     label : {
//     text : ‘check’,
//     font : ‘14pt monospace’,
//     style: Cesium.LabelStyle.FILL_AND_OUTLINE,
//     outlineWidth : 2,
//     verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
//     pixelOffset : new Cesium.Cartesian2(0, -9)
//     }
//   });
// }

// // Output the canvas position of longitude/latitude (0, 0) every time the mouse moves.
//   const something = (viewer) => {
//     const scene = widget.scene;
//     const ellipsoid = scene.globe.ellipsoid;
//     const position = Cartesian3.fromDegrees(0.0, 0.0);
//     const handler = new ScreenSpaceEventHandler(scene.canvas);
//     handler.setInputAction(function(movement) {
//         console.log(scene.cartesianToCanvasCoordinates(position));
//     }, ScreenSpaceEventType.MOUSE_MOVE);
//   }

  // function toDegree(c3pos) {
  //   let pos = Cartographic.fromCartesian(c3pos);
  //   if (typeof pos !== 'undefined') {
  //       return {
  //           lon: pos.longitude / CMath.PI * 180,
  //           lat: pos.latitude / CMath.PI * 180,
  //           alt: pos.height
  //       };
  //   } else {
  //       return pos;
  //   }
  // }

  // async function somethingElse(viewer) {
  //   // viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
  //   //   const pickedFeature = viewer.scene.pick(movement.position);
  //   //   if (!defined(pickedFeature)) {
  //   //       // nothing picked
  //   //       return;
  //   //   }
  //   //   const worldPosition = viewer.scene.pickPosition(movement.position);
  //   //   console.log(worldPosition);
  //   // }, ScreenSpaceEventType.LEFT_CLICK);
  //   // OR
  //   const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);
  //   // const ellipsoid = viewer.scene._globe._ellipsoid;
  //   handler.setInputAction(function (event) {
  //     let pickedObject = viewer.scene.pick(event.position);
  //     if (defined(pickedObject)){
  //       console.log(pickedObject);
  //     }
  //   });
  // }

  const cesiumContainer = useRef(null);
  
  const [viewer, setViewer] = useState<Viewer | null>(null);
// // Starting Render
  // async function renderSimple() {
  // Ion.defaultAccessToken = "access_token";
  
  // const viewer = new Viewer("cesiumContainer");

  //   try {
  //     const imageryLayer = viewer.imageryLayers.addImageryProvider(
  //       await IonImageryProvider.fromAssetId(3) 
  //     );
  //     await viewer.zoomTo(imageryLayer)
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setViewer(viewer);
  // }

  useEffect(() => {
    // Define renderFunc as an async function within the useEffect callback.
    // Specify that the function should return a promise that resolves to a Viewer instance or null.
    async function renderFunc(): Promise<Viewer | null> {
      Ion.defaultAccessToken = "<access_token>";
  
      // Check if the container is available before trying to create the Viewer.
      if (cesiumContainer.current) {
        try {
          // Create a new Cesium Viewer instance when the component mounts.
          const view = new Viewer(cesiumContainer.current, {});
  
          // Add the imagery provider and zoom to it, providing the necessary empty options object.
          const imageryLayer = view.imageryLayers.addImageryProvider(
            await IonImageryProvider.fromAssetId(3, {}) // Adding an empty options object here.
          );
          
          await view.zoomTo(imageryLayer);
  
          // Return the Viewer instance for use in your component.
          return view;
        } catch (error) {
          console.error("An error occurred: ", error);
          // Return null if there were any failures in creating the Viewer.
          return null;
        }
      }
  
      // Return null if cesiumContainer.current is not available.
      return null;
    }
  
    // Call renderFunc and set the Viewer instance to the viewer state.
    renderFunc().then(result => {
      if (result) { // Ensure we only call setViewer if we have a non-null result.
        setViewer(result);
      } else {
        console.error("Failed to initialize the Cesium viewer.");
      }
    });
  }, []);

  console.log(typeof(viewer));
  console.log(viewer)

  const getCenterCoordinates = () => {
    console.log("Inner Viewer");
    console.log(viewer);
  
    if (viewer !== null) {
      var windowPosition = new Cartesian2(
        viewer.container.clientWidth / 2, 
        viewer.container.clientHeight / 2
      );
  
      // getPickRay might return undefined, so we store its result in a variable that can be either a Ray or undefined.
      var pickRay = viewer.scene.camera.getPickRay(windowPosition);
  
      // Check if pickRay is defined before proceeding.
      if (pickRay) {
        // Since we're inside this block, TypeScript knows that pickRay is not undefined.
        var pickPosition = viewer.scene.globe.pick(pickRay, viewer.scene);
  
        if (pickPosition) { // Also check if pickPosition is not undefined before converting it
          var pickPositionCartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(pickPosition);
          console.log(pickPositionCartographic);
        }
      }
    }
  };
  
  
    // Get latitude and longitude
	const getPosition = () => {
        // Get the current 3D scene
        if (viewer === null) {
          console.log("Viewer is null.");
          return;
        }

        var scene = viewer.scene;
        // Get the ellipsoid of the current 3D scene
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var entity = viewer.entities.add({
            label : {
                show : false
            }
        });
        var longitudeString: string | number | null = null;
        var latitudeString: string | number | null = null;
        var height = null;
        var cartesian: Cartesian3 | undefined | null = null;
        // Define the event processing of the canvas element of the current scene
        var handler = new ScreenSpaceEventHandler(scene.canvas);
        // Set the mouse movement event processing function, here is responsible for monitoring x, y coordinate value changes
        handler.setInputAction(function(movement: { endPosition: any; }) {
        // Convert the two-dimensional coordinates of the mouse to the corresponding three-dimensional coordinates of the ellipsoid by the specified ellipsoid or the coordinate system corresponding to the map
        cartesian = viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid);
        
        if (cartesian) {
            // Convert Cartesian coordinates to geographic coordinates
            var cartographic = ellipsoid.cartesianToCartographic(cartesian);
            // Turn the radians into degrees of decimal system representation
            longitudeString = CMath.toDegrees(cartographic.longitude);
            latitudeString = CMath.toDegrees(cartographic.latitude);
            // Get the camera height
            height = Math.ceil(viewer.camera.positionCartographic.height);
        
            // Correct way to set a dynamic position. Wrap the Cartesian3 in a ConstantPositionProperty.
            entity.position = new ConstantPositionProperty(cartesian);
        
            entity.label = new LabelGraphics({
                text: new ConstantProperty('(' + longitudeString + ', ' + latitudeString + "," + height + ')'),
                show: new ConstantProperty(true), // Here you should use a Property compatible with 'show'
            });
            entity.position = new ConstantPositionProperty(cartesian);
        } else {
            // Here, check if label exists before trying to modify its properties
            if (entity.label instanceof LabelGraphics) {
                entity.label.show = new ConstantProperty(false);
            }
        }
        
        }, ScreenSpaceEventType.MOUSE_MOVE);
        // Set the processing function of the mouse scroll event, here is responsible for monitoring the change in height value
        handler.setInputAction(function(wheelment: any) {
            height = Math.ceil(viewer.camera.positionCartographic.height);
            
            // Check and handle the potential for 'cartesian' to be null or undefined
            if (cartesian instanceof Cartesian3) {
                entity.position = new ConstantPositionProperty(cartesian);
            }
        
            // Again, make sure you are using Cesium's Property types for modifying label
            if (entity.label instanceof LabelGraphics) {
                entity.label.text = new ConstantProperty('(' + longitudeString + ', ' + latitudeString + "," + height + ')');
                entity.label.fillColor = new ConstantProperty(Color.BLACK); // Use a Color Property
                entity.label.show = new ConstantProperty(true);
            }
        }, ScreenSpaceEventType.WHEEL);
  }

  return (
    <div className="Homepage">
      <header className="App-header">
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" 
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
      <script src="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Cesium.js" />
      <link href="https://cesium.com/downloads/cesiumjs/releases/1.110/Build/Cesium/Widgets/widgets.css" rel="stylesheet" />
      </header> 
      <body>
        <div id="cesiumContainer" ref={cesiumContainer} onClick={(viewer) => { if (viewer !== null) {getPosition()} else {console.log("Viewer is null.");}} } />
      </body>
    </div>
  );
}
// onClick={(viewer) => somethingElse(viewer)}
// onClick={(viewer) => getPosition(viewer)}
export default HomePage;
