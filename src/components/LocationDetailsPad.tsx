import React, { useState } from "react";
import Button from "./Button";
import { TourFusionLocation } from "../common/types";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";
import useMutation from "../common/useMutation";
import { ADD_LOCATION } from "../common/mutations";
import country from '/bestcountry.jpg';

export default function LocationDetailsPad({ clickedLoc, clickedPos, updateSetReload }: any) {
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleAddClose = () => {
    setShowAdd(false);
  };

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleClose = () => {
    setShowDelete(false);
  };

  return (
    <>
      <div
        className="border-2
                border-[#BB9AF7]
                bg-[#3A3535]
                  rounded-2xl
                  font-sans
                  hover:-translate-y-1 
                  transition
                  text-[#FCEACB] 
                  duration-100
                  ease-in-out
                  box-border
                  hover:border-[#e0af68]
                  p-2"
      >
        <img src={country} alt="best"></img>
        <div
          className="text-2xl
                            p-2"
        >
          {"clickedLoc.name.display"}, {"clickedLoc.name.country"}
        </div>
        <div
          className="p-2
                            font-serif
                            text-lg
                            grid
                          text-[#FCEACB]
                            "
        >
          <ul className="flex flex-col text-xl space-y-2">
            <li className="flex justify-between">
              <span>Average Temperature:</span>{" "}
              <span>{"clickedLoc.averageTemperature"}</span>
            </li>
            <li className="flex justify-between">
              <span>Elevation:</span> <span>{"clickedLoc.elevation"}</span>
            </li>
            <li className="flex justify-between">
              <span>Climate:</span> <span>{"clickedLoc.climateZone"}</span>
            </li>
            <li className="flex justify-between">
              <span>Trewartha Classification:</span>{" "}
              <span>{"clickedLoc.trewarthaClassification"}</span>
            </li>
          </ul>

          <div className="flex flex-row self-center justify-between p-2 pl-2 pr-2">
            <button
              className="bg-[#111827] 
                                     border-2 
                                     border-[#BB9AF7] 
                                     rounded-[30px] 
                                     items-center 
                                     w-24 
                                     h-[40px]
                                     hover:bg-[#414868]
                                     hover:border-[#e0af68]"
            >
              &#9998;
            </button>
            <button
              className="bg-[#111827] 
                      border-2 
                      border-[#BB9AF7] 
                      rounded-[30px] 
                      items-center 
                      w-24 
                      h-[40px]
                      hover:bg-[#414868]
                      hover:border-[#f7768e]"
              onClick={handleDelete}
            >
              &#128465;
            </button>
          </div>
        </div>
      </div>
      {showDelete && (
        <ConfirmPopupPrompt
          header="Delete Location?"
          text="Are you sure you want to delete this location?"
          onConfirm={() => console.log("Yes Clicked!")}
          /*onClose={handleCloseDelete}*/
        />
      )}
    </>
  );

  
}
