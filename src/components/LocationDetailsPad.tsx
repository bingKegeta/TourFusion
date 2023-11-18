import React, { useEffect, useState } from "react";
import Button from "./Button";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import "../styles/LocationDetailsPad.css";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";

export default function LocationDetailsPad({ clickedLoc }: any) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClose = () => {
    setShowDelete(false);
  };

  const mapClickedLocationToListBox = (
    tfc: TourFusionLocation
  ): React.JSX.Element => {
    if (clickedLoc !== null) tfc.name = clickedLoc;

    return (
      <div key={tfc.location.longitude} className="clicked-location-container">
        <div className="clicked-location-container-title">
          {tfc.name.city}, {tfc.name.country}
        </div>
        <div className="clicked-location-container-image">
          <img
            src="/src/assets/TourFusionLocationPics/shanghai.jpg"
            width="100%"
            alt=""
          />
        </div>
        <div className="clicked-location-container-info">
          TODO: ~~~SOME DESCRIPTION HERE~~~
          <br />
          Average Temperature: {tfc.averageTemperature}
          <br />
          Elevation: {tfc.elevation}
          <br />
          Climate: {tfc.climateZone}
          <br />
          Trewartha Classification: {tfc.trewarthaClassification} TODO: map to
          some more readable description
          <br />
        </div>
        <div className="clicked-location-container-buttons">
          <Button text="Edit" onClick={() => console.log("here")} />
          <Button text="Remove" onClick={handleDelete} />
        </div>
        {showDelete && (
          <ConfirmPopupPrompt
            header="Delete Location?"
            text="Are you sure you want to delete this location?"
            onConfirm={() => console.log("Yes Clicked!")}
            onClose={handleClose}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className={clickedLoc !== null ? "block text-white" : "hidden text-white"}
    >
      {(
        [
          {
            name: {
              street: "",
              city: "",
              country: "",
              address: "",
              postal: "",
            },
            location: { latitude: 0.0, longitude: 0.0, height: 0.0 },
            averageTemperature: 0.0,
            elevation: 0.0,
            trewarthaClassification: "",
            climateZone: "",
          },
        ] as TourFusionLocation[]
      ).map(mapClickedLocationToListBox)}
    </div>
  );
}
