import React, { useEffect, useState } from "react";
import LocationCard from "./LocationCard";
import LocationDetailsPad from "./LocationDetailsPad";
import BackToList from "./GoBackToList";
import AddNewLocation from "./AddNewLocation";
import {
  CCLocation,
  CCPosition,
  RecommendLocation,
  TourFusionLocation,
} from "../common/types";
import { RecommendLocationToTourFusionLocation } from "../common/extras";

interface ListViewProps {
  updateStateClickedCard: (card: TourFusionLocation) => void;
  updateStateClickedLoc: (loc: CCLocation) => void;
  zoomToPosition: (arg0: CCPosition) => void;
  clickedCard: TourFusionLocation | null;
  clickedPos: CCPosition | null;
  clickedLoc: CCLocation | null;
  userLocations: TourFusionLocation[];
  recommendedLocations: RecommendLocation[];
}

export default function ListView({
  updateStateClickedCard,
  updateStateClickedLoc,
  zoomToPosition,
  clickedCard,
  clickedPos,
  clickedLoc,
  userLocations,
  recommendedLocations,
}: ListViewProps) {
  const maxHeight = 1000000.0;

  if (clickedCard) {
    return (
      <div className="grid z-20 bg-gray-900 text-white absolute overflow-y-auto w-full h-full md:static">
        <LocationDetailsPad
          clickedCard={clickedCard}
          isRecommend={clickedCard.id == "" ? false : true}
        />
        {/*This button is in charge of destroying the NewCard view, and going back to the list by setting it to null*/}
        <BackToList updateStateList={updateStateClickedCard} />
      </div>
    );
  }

  return (
    <div
      className="grid z-20 
                    bg-gradient-to-r 
                    from-[#8f5e15] via-[#5a4a78] to-[#f7768e] animate-gradient-x 
                    text-white 
                    absolute 
                    overflow-y-auto 
                    w-full 
                    h-full 
                    md:static"
    >
      <div className="box-border md:p-4 md:m-4 mt-4 grid justify-items-center">
        <div
          className="border-2
                          border-[#BB9AF7]
                          bg-[#35373a]
                          rounded-2xl
                          text-[#FCEACB]
                          w-11/12
                          sm:w-full
                          "
        >
          <div className="p-2 grid font-sans text-[#FCEACB]">
            <ul className="flex flex-col text-2xl space-y-2">
              <li className="flex justify-between pl-[10px]">
                <span>Your Locations</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 w-11/12 sm:w-full pt-3 pb-3">
          {userLocations.map((card, i) => (
            <LocationCard
              zoom={() => {
                zoomToPosition({
                  latitude: card.location.latitude,
                  longitude: card.location.longitude,
                  height: maxHeight,
                });
                updateStateClickedCard(card);
              }}
              item={card}
              isRecommend={false}
              key={i}
            />
          ))}
        </div>
        <div
          className="border-2
                          border-[#BB9AF7]
                          bg-[#3A3535]
                          rounded-2xl
                          text-[#FCEACB]
                          w-11/12
                          sm:w-full
                          "
        >
          <div className="p-2 grid font-sans text-[#FCEACB]">
            <ul className="flex flex-col text-2xl space-y-2">
              <li className="flex justify-between pl-[10px]">
                <span>Recommended for You</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4 w-11/12 sm:w-full pt-3 pb-3">
          {recommendedLocations.map((rec, j) => (
            <LocationCard
              zoom={() => {
                zoomToPosition({
                  latitude: rec.location.latitude,
                  longitude: rec.location.longitude,
                  height: maxHeight,
                });
                updateStateClickedCard(
                  RecommendLocationToTourFusionLocation(rec)
                );
              }}
              item={rec}
              isRecommend={true}
              key={j}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
