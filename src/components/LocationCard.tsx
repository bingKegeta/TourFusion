import React, { useEffect, useState } from "react";
import ConfirmPopupPrompt from "./ConfirmPopupPrompt";
import useMutation from "../common/useMutation";
import { ADD_LOCATION, DELETE_LOCATION } from "../common/mutations";
import { RecommendLocation, TourFusionLocation } from "../common/types";
import LocationUpdatePrompt from "./LocationUpdatePrompt";
import { getSessionToken, round } from "../common/extras";
import config from "../config";

interface LocationCardProps {
  zoom: () => void;
  setReload: (args0: boolean) => void;
  isRecommend: Boolean;
  handleCard: () => void;
  item: any; //? Putting TourFusionLocation | RecommendLocation keeps throwing weird errors
}

export default function LocationCard({
  zoom,
  setReload,
  handleCard,
  item,
  isRecommend,
}: LocationCardProps) {
  //* Handle the case where the name is null for some reason
  if (!isRecommend && !item.name) {
    return <></>;
  }

  const endpoint = config.API_URL + "/api";
  const { executeMutation, loading, error } = useMutation(endpoint);

  const [showDelete, setShowDelete] = useState<Boolean>(false);
  const [showEdit, setShowEdit] = useState<Boolean>(false);

  const handleDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleEdit = () => {
    setShowEdit(!showEdit);
  };

  const handleDeleteLocation = async () => {
    const variables = {
      id: item.id,
    };

    try {
      await executeMutation(DELETE_LOCATION, variables)
        .then(() => {
          handleDelete();
        })
        .finally(() => {
          setReload(true);
        });
    } catch (err) {
      console.error("Error deleting the entry: ", err);
    }
  };

  const handleAddLocation = async () => {
    const variables = {
      user_id: getSessionToken(),
      name: {
        display: item.city,
        country: item.country,
      },
      latitude: item.location.latitude,
      longitude: item.location.longitude,
    };

    try {
      await executeMutation(ADD_LOCATION, variables)
        .then(() => {
          handleEdit();
        })
        .finally(() => {
          setReload(true);
        });
    } catch (err) {
      console.error("Error adding the location:", err);
    }
  };

  const displayEditOrAdd = () => {
    if (showEdit) {
      if (isRecommend) {
        return (
          <ConfirmPopupPrompt
            header={`Add ${item.city}, ${item.country}?`}
            text={`Are you sure you want to add ${item.city} to your locations?`}
            onClose={handleEdit}
            onConfirm={handleAddLocation}
          />
        );
      } else {
        return <LocationUpdatePrompt item={item} 
                                    onClose={handleEdit} 
                                    handleCard={handleCard}
                                    setReload={setReload}/>;
      }
    } else {
      return <></>;
    }
  };

  return (
    <>
      <div
        className={`border-2
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
                  ${
                    !isRecommend
                      ? "hover:border-[royalblue]"
                      : "hover:border-[darkred]"
                  }
                  p-2`}
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
          <ul
            className="bg-[#1A1818] rounded-xl shadow-lg text-xl flex flex-col p-2 space-y-2 font-sans"
            onClick={zoom}
          >
            <li className="flex justify-between">
              <span>Average Temperature:</span>{" "}
              <span>
                {round((!isRecommend ? item.averageTemperature : item.avg_temp), 6)}
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
              onClick={handleEdit}
            >
              {!isRecommend ? <>&#9998;</> : <>&#65291;</>}
            </button>
            {!isRecommend && (
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
            )}
          </div>
        </div>
      </div>
      {displayEditOrAdd()}
      {showDelete && (
        <ConfirmPopupPrompt
          header="Delete Location?"
          text="Are you sure you want to delete this location?"
          onConfirm={handleDeleteLocation}
          onClose={handleDelete}
        />
      )}
    </>
  );
}
