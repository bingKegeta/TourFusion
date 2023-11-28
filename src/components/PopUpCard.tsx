import React, { useEffect, useRef, useState } from "react";
import country from "/bestcountry.jpg";
import { CCLocation, CCPosition } from "../common/types";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";
import useMutation from "../common/useMutation";
import { ADD_LOCATION } from "../common/mutations";
import { getSessionToken, round } from "../common/extras";

interface CardProps {
  x: number;
  y: number;
  clickedPos: CCPosition | null;
  clickedLoc: CCLocation | null;
  showLoadingPage: (arg0 : Boolean) => void;
}

export default function PopUpCard({ x, y, clickedPos, clickedLoc, showLoadingPage }: CardProps) {
  const startOnPoint = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
  };

  const [showAdd, setShowAdd] = useState<Boolean>(false);

  const handle = () => {
    setShowAdd(!showAdd);
  };

  // Code to add location into the db
  const endpoint = "http://localhost:5000/api";
  const { executeMutation, loading, error } = useMutation(endpoint);

  
  const handleAddLocation = async () => {
    showLoadingPage(true);

    const variables = {
      //! Add session token logic to get this
      user_id: getSessionToken(),
      name: clickedLoc,
      latitude: clickedPos?.latitude,
      longitude: clickedPos?.longitude,
    };

    try {
      await executeMutation(ADD_LOCATION, variables)
      .then(() => {
        setShowAdd(false)
      }).then(() => {
        // The reason this is different from the previous ways of reloading
        // is because this affects the cesium component and the pins in a way
        // that is more intrusive

        setTimeout(() => {
          window.location.reload();
        }, 10);
      })
      
      //! Remove/Destroy the popup here (location has been added sucessfully)
      //! Also see if the list and pins refresh after addition
      console.log("Location added!");
    } catch (err) {
      console.error("Error adding the location", err);
    }
  };

  return (
    <>
      <div
        className="text-amber-100 grid pl-6 pr-8 rounded-2xl text-sans border-2 border-solid border-purple-400 max-md:px-5 max-w-sm overflow-hidden shadow-lg bg-stone-700 text-center -translate-x-1/2 -translate-y-1/2"
        style={startOnPoint}
      >
        <div className="text-center text-2xl leading-6 self-stretch whitespace-nowrap mt-4 flex flex-col">
          <span>{clickedLoc ? clickedLoc.city : ""}</span>
          <span>{clickedLoc ? clickedLoc.country : ""}</span>
        </div>

        {/* <img className="w-full rounded-2xl p-2" src={country} alt="Location" /> */}

        <div className="text-2xl text-left">Coordinates:</div>

        <div className="bg-[#1A1818] rounded-xl shadow-lg text-xl flex flex-col p-2 space-y-2">
          <span className="flex justify-between">
            <span>Latitude:</span>
            <span>
              {clickedPos
                ? round(clickedPos.latitude, 7)
                : "Error getting latitude"}
            </span>
          </span>
          <span className="flex justify-between">
            <span>Longitude:</span>
            <span>
              {clickedPos
                ? round(clickedPos.longitude, 7)
                : "Error getting longitude"}
            </span>
          </span>
        </div>

        <div className="px-6 pt-4 pb-2">
          <button
            className="bg-[#111827] 
                                    border-2 
                                    border-[#BB9AF7] 
                                    rounded-[30px] 
                                    items-center 
                                    w-full 
                                    h-[40px]
                                    hover:bg-[#414868]
                                    hover:border-[#f7768e]
                                    text-xl"
            onClick={handle}
          >
            Add Location +
          </button>
        </div>
      </div>
      {showAdd && (
        <ConfirmPopupPrompt
          header={`Add ${clickedLoc?.display}, ${clickedLoc?.country}?`}
          text={`Are you sure you want to add ${clickedLoc?.display}, ${clickedLoc?.country}?`}
          onClose={handle}
          onConfirm={handleAddLocation}
        />
      )}
    </>
  );
}
