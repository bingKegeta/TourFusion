import React , { useEffect, useState } from "react";
import { CCPosition, CCLocation, TourFusionLocation } from "../common/types";
import "../styles/LocationCard.css"

export default function LocationCard({onClick, tfc} : any) {
    return (
        <div key={tfc.location.longitude} className="user-location-container" onClick={onClick}>
        {/* <div key={tfc.location.longitude} className="cursor-pointer bg-[#24283] border-solid border-[1px] border-[#050209]"> */}
            <div className="user-location-container-title">
              {tfc.name.city}, {tfc.name.country}
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