import React, { useEffect, useRef } from "react";
import country from '/bestcountry.jpg';
import { CCLocation, CCPosition } from "../common/types";

interface CardProps {
    x: number;
    y: number;
    clickedPos : CCPosition | null;
    clickedLoc : CCLocation | null;
  }

export default function PopUpCard({x, y, clickedPos, clickedLoc} : CardProps) {
    const startOnPoint = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
    }
    {/*<div className=" " style={style}>

    </div>*/}
    return (

        <div className="text-amber-100 grid pl-6 pr-8 rounded-2xl text-sans border-2 border-solid border-purple-400 max-md:px-5 max-w-sm overflow-hidden shadow-lg bg-stone-700 text-center -translate-x-1/2 -translate-y-1/2" style={startOnPoint}>
            <div className="text-center text-2xl leading-6 self-stretch whitespace-nowrap mt-4 flex flex-col">
                <span>
                    {clickedLoc ? clickedLoc.city : ""}
                </span>
                <span>
                    {clickedLoc ? clickedLoc.country : ""}
                </span>
            </div>

            <img className="w-full rounded-2xl p-2" src={country} alt="Location" />

            <div className="text-2xl text-left">Coordinates:</div>

            <div className="bg-[#1A1818] rounded-xl shadow-lg text-xl flex flex-col p-2 space-y-2">
                <span className="flex justify-between">
                    <span>Latitude:</span><span>{clickedPos ? clickedPos.latitude : "Error getting latitude"}</span>
                </span>
                <span className="flex justify-between">
                    <span>Longitude:</span><span>{clickedPos ? clickedPos.longitude : "Error getting longitude"}</span>
                </span>
            </div>

            <div className="px-6 pt-4 pb-2">
                <button className="bg-[#111827] 
                                    border-2 
                                    border-[#BB9AF7] 
                                    rounded-[30px] 
                                    items-center 
                                    w-full 
                                    h-[40px]
                                    hover:bg-[#414868]
                                    hover:border-[#f7768e]
                                    text-xl">
                    Add Location +
                </button>
            </div>
        </div>
    );
}