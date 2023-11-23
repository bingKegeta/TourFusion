import React, { useEffect, useRef } from "react";
import country from '/bestcountry.jpg';
import { CCLocation, CCPosition } from "../common/types";

interface CardProps {
    x: number;
    y: number;
    clickedPos : CCPosition;
  }

export default function PopUpCard({x, y, clickedPos} : CardProps) {
    const style = {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
    }
    {/*<div className=" flex flex-col pl-6 pr-8 rounded-2xl border-2 border-solid border-purple-400 max-md:px-5" style={style}>
            <div className="text-amber-100 text-center text-xl leading-6 self-stretch whitespace-nowrap mt-4">
                Orlando, United States
            </div>
    </div>*/}
    return (

        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-stone-700 text-center">
            <img className="w-full" src={country} alt="Location" />
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{location}</div>
            <p className="text-gray-700 text-base">
                Coordinates:
            </p>
            <p className="text-gray-700 text-base">
                Latitude: {clickedPos.latitude}
            </p>
            <p className="text-gray-700 text-base">
                Longitude: {clickedPos.longitude}
            </p>
            </div>
            <div className="px-6 pt-4 pb-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Add Location +
            </button>
            </div>
        </div>
    );
}