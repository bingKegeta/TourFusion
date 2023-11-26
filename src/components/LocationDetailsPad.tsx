import React, { useState } from "react";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";
import useMutation from "../common/useMutation";
import country from "/bestcountry.jpg";
import { CCLocation, CCPosition, TourFusionLocation } from "../common/types";

interface LocationDetailsProps {
  isRecommend: boolean;
  clickedCard: TourFusionLocation;
  updateSetReload?: () => void;
}

export default function LocationDetailsPad({
  isRecommend,
  clickedCard,
  updateSetReload,
}: LocationDetailsProps) {
  const [showDelete, setShowDelete] = useState<Boolean>(false);
  const [showEdit, setShowEdit] = useState<Boolean>(false);

  const handleDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  return (
    <>
      <div
        className={`relative ${
          isRecommend
            ? "bg-gradient-to-l from-[royalblue] via-[#ff9e64] to-indigo-500"
            : "bg-gradient-to-r from-[darkred] via-[#bb9af7] to-red-300"
        } animate-gradient-x`}
      >
        <div
          className="absolute inset-4
                bg-[#3A3535]
                  font-sans
                  text-[#FCEACB] p-4 rounded-2xl"
        >
          <img
            src={country}
            alt="best"
            className="border-2 rounded-2xl border-[#BB9AF7]"
          ></img>
          <div
            className="text-3xl
                            p-2"
          >
            {clickedCard.name.display}, {clickedCard.name.country}
          </div>
          <div
            className="font-serif
                      text-lg
                      grid
                    text-[#FCEACB]"
          >
            <ul className="flex flex-col text-xl space-y-2 bg-gray-900 rounded-2xl p-4 font-sans">
              <li className="flex justify-between">
                <span>Average Temperature:</span>{" "}
                <span>{clickedCard.averageTemperature}</span>
              </li>
              <li className="flex justify-between">
                <span>Elevation:</span> <span>{clickedCard.elevation}</span>
              </li>
              <li className="flex justify-between">
                <span>Climate:</span> <span>{clickedCard.climateZone}</span>
              </li>
              <li className="flex justify-between">
                <span>Trewartha Classification:</span>{" "}
                <span>{clickedCard.trewarthaClassification}</span>
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
      </div>
      {showDelete && (
        <ConfirmPopupPrompt
          header="Delete Location?"
          text="Are you sure you want to delete this location?"
          onConfirm={() => console.log("Yes Clicked!")}
          onClose={handleDelete}
        />
      )}
    </>
  );
}
