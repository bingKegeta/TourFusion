import React , { useEffect, useState } from "react";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";

export default function LocationCard({onClick, item} : any) {

    return (
        <div key={item.location.longitude} className="border
                                                    border-gray-700
                                                      cursor-pointer
                                                    hover:bg-gray-700
                                                    transition 
                                                    duration-100 
                                                    ease-in-out" 
                                           onClick={onClick}>
        {/* <div key={item.location.longitude} className="cursor-pointer bg-[#24283] border-solid border-[1px] border-[#050209]"> */}
            <div className="border text-xl p-2">
              {item.name.display}, {item.name.country}
            </div>
            <div className="p-2
                            font-serif
                            text-lg
                            grid
                          text-gray-300
                            ">
              <ul className="flex flex-col">
                <li>Average Temperature: {item.averageTemperature}</li>
                <li>Elevation: {item.elevation}</li>
                <li>Climate: {item.climateZone}</li>
                <li>Trewartha Classification: {item.trewarthaClassification}</li>
              </ul>
            </div>
        </div>
    )

}