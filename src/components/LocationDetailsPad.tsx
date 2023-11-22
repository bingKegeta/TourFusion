import React, { useState } from "react";
import Button from "./Button";
import { TourFusionLocation } from "../common/types";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";
import useMutation from "../common/useMutation";
import { ADD_LOCATION } from "../common/mutations";

export default function LocationDetailsPad({ clickedLoc, clickedPos }: any) {
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    setShowAdd(true);
  };

  const hanldleAddClose = () => {
    setShowAdd(false);
  };

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
    if (clickedPos !== null) {
      tfc.location = clickedPos;
    }

    const { executeMutation, loading, error } = useMutation(
      "http://localhost:5000/api"
    );

    const handleAddConfirm = async () => {
      const variables = {
        //! Use Session Token Logic to get the user_id of the logged in user
        user_id: "65586a76d592ac7d8e6d0e7f",
        name: tfc.name,
        //! The latitude and longitude are not set in the tfc parameter so it defaults to 0 for some reason
        latitude: tfc.location.latitude,
        longitude: tfc.location.longitude,
      };

      try {
        await executeMutation(ADD_LOCATION, variables);
        setShowAdd(false);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div
        key={tfc.location.longitude}
        className="border-2
      border-[#BB9AF7]
      bg-[#3A3535]
        rounded-2xl
        font-sans
        box-border
        hover:border-[#e0af68]
        p-2"
      >
        <div className="text-2xl p-2">
          {tfc.name.display}, {tfc.name.country}
        </div>
        <div className="clicked-location-container-image">
          <img
            src="/src/assets/TourFusionLocationPics/shanghai.jpg"
            width="100%"
            alt=""
          />
        </div>
        <div className="p-[2%] w-full inline-block text-left overflow-clip [text-shadow:2px_1px_3px_#10071d]">
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
        <div className="p-[2%] w-full inline-flex">
          <Button text="&#65291;" onClick={handleAdd} />
          <Button text="Remove" onClick={handleDelete} />
        </div>
        {showAdd && (
          <ConfirmPopupPrompt
            header={`Add ${tfc.name.display}?`}
            text={`Are you sure you want to add ${tfc.name.display}, ${tfc.name.country}?`}
            onConfirm={handleAddConfirm}
            onClose={hanldleAddClose}
          />
        )}
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
              display: "",
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
