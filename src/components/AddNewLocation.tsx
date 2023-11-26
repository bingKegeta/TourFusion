import React, { useState, useEffect } from "react";
import country from '/bestcountry.jpg';
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";

export default function AddNewLocation({ clickedLoc } : any) {
    const [showAdd, setShowAdd] = useState<Boolean>(false);
    
    const handle = () => {
        setShowAdd(!showAdd);
    }

    useEffect(() => {
        
    },[showAdd])
    
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
            {/* <img src={country} alt=""></img> */}
            <div className="text-2xl p-2">
              {clickedLoc.display}, {clickedLoc.country}
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
    
              <div className="flex flex-row self-center justify-center p-2 pl-2 pr-2">
                <button
                  className="bg-[#111827]
                                border-2 
                                border-[#BB9AF7] 
                                rounded-[30px] 
                                items-center
                                w-full
                                h-[50px]
                                hover:bg-[#414868]
                                hover:border-[#e0af68]"
                    onClick={handle}
                >
                  Add Location &#10133;
                </button>
              </div>
            </div>
          </div>
          {showAdd && (
          <ConfirmPopupPrompt
            header={`Add ?`}
            text={`Are you sure you want to add ?`}
            onConfirm={() => {console.log("hellow")}}
            onClose={handle}
          />
        )}
        
        </>
      );
}