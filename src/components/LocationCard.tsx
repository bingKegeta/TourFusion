import React , { useEffect, useState } from "react";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";

export default function LocationCard({onClick, item} : any) {

    return (
        <div key={item.location.longitude} className="border-2
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
                                           onClick={onClick}>
            <div className="text-2xl
                            p-2">
              {item.name.display}, {item.name.country}
            </div>
            <div className="p-2
                            font-serif
                            text-lg
                            grid
                          text-[#FCEACB]
                            ">
              <ul className="flex flex-col text-xl space-y-2 ">
                <li className="flex justify-between">
                  <span>Average Temperature:</span> <span>{item.averageTemperature}</span>
                </li>
                <li className="flex justify-between">
                  <span>Elevation:</span> <span>{item.elevation}</span>
                </li>
                <li className="flex justify-between">
                  <span>Climate:</span> <span>{item.climateZone}</span>
                </li>
                <li className="flex justify-between">
                  <span>Trewartha Classification:</span> <span>{item.trewarthaClassification}</span>
                </li>
              </ul>

              <div className="flex flex-row self-center justify-between p-2 pl-2 pr-2">
                <button className="bg-[#111827] 
                                     border-2 
                                     border-[#BB9AF7] 
                                     rounded-[30px] 
                                     items-center 
                                     w-32 
                                     h-[40px]
                                     hover:bg-[#414868]
                                     hover:border-[#e0af68]">Edit</button>
                <button className="bg-[#111827] 
                      border-2 
                      border-[#BB9AF7] 
                      rounded-[30px] 
                      items-center 
                      w-32 
                      h-[40px]
                      hover:bg-[#414868]
                      hover:border-[#e0af68]">Delete</button>
              </div>

            </div>
        </div>
    )




    
                              
                              
                              
                              
                              
                              
                            
                            
}