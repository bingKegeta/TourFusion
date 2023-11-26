import React, { useEffect, useState } from "react";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";

export default function LocationCard({ zoom, item, isRecommend }: any) {
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = () => {
    setShowDelete(true);
  };

  const handleAdd = () => {
    setShowAdd(true);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
  };

  return (
    <>
      <div
        key={!isRecommend ? item.location.longitude : item.rank}
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
        <div
          onClick={zoom}
          className="text-2xl
                            p-2"
        >
          {!isRecommend ? item.name.display : item.city},{" "}
          {!isRecommend ? item.name.country : item.country}
        </div>
        <div
          className="p-2
                            font-serif
                            text-lg
                            grid
                            h-fit
                          text-[#FCEACB]
                            "
        >
          <ul className="flex flex-col text-xl space-y-2 " onClick={zoom}>
            <li className="flex justify-between">
              <span>Average Temperature:</span>{" "}
              <span>
                {!isRecommend ? item.averageTemperature : item.avg_temp}
              </span>
            </li>
            <li className="flex justify-between">
              <span>Elevation:</span> <span>{item.elevation}</span>
            </li>
            <li className="flex justify-between">
              <span>Climate:</span>{" "}
              <span>{!isRecommend ? item.climateZone : item.climate_zone}</span>
            </li>
            <li className="flex justify-between">
              <span>Trewartha Classification:</span>{" "}
              <span>
                {!isRecommend ? item.trewarthaClassification : item.trewartha}
              </span>
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
          onClose={handleCloseDelete}
        />
      )}
    </>
  );
}
