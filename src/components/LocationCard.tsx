import React , { useEffect, useState } from "react";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";

export default function LocationCard({tfc} : any) {
    return (
        <div key={tfc.location.longitude} className="cursor-pointer bg-[#24283] border-solid border-[1px] border-[#050209]">
            <div className="user-location-container-title">
              {tfc.name}
            </div>
            <div className="user-location-container-details">
              Average Temperature: {tfc.averageTemperature}<br/>
              Elevation: {tfc.elevation}<br/>
              Climate: {tfc.climateZone}<br/>
              Trewartha Classification: {tfc.trewarthaClassification}<br/>
            </div>
        </div>
    )

}