import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import "../styles/LocationUpdatePrompt.css";
import useMutation from "../common/useMutation";
import { TourFusionLocation } from "../common/types";
import { UPDATE_LOCATION } from "../common/mutations";

interface UpdateProps {
  onClose: () => void;
  item: TourFusionLocation;
  setReload: (args0: boolean) => void;
  handleCard: () => void;
}

const LocationUpdatePrompt = ({ onClose, item, setReload, handleCard }: UpdateProps) => {
  const [name, setName] = useState<string>("");

  const { executeMutation, loading, error } = useMutation(
    "http://localhost:5000/api"
  );

  const onConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    const variables = {
      id: item.id,
      newData: {
        name: {
          display: name,
          country: item.name.country,
        },
      },
    };

    try {
      await executeMutation(UPDATE_LOCATION, variables)
        .then(() => {
          setReload(true);
        }).then(() => {
          handleCard();
        }).finally(() => {
          console.log("asd");
        })
    } catch (err) {
      console.error("Error updating the location name: ", err);
    }
  };

  return (
    <>
      <div className="backdrop"></div>
      <div className="alert-container">
        <h2>Update Location</h2>
        <form onSubmit={onConfirm} className="form-container">
          <Input
            labelText="Enter the name of the location"
            placeholder="Atlantis"
            value={name}
            onChange={setName}
          />
          <div className="buttons">
            <Button text="Change" onClick={() => console.log("Clicked")} />
            <Button text="Cancel" onClick={onClose} />
          </div>
        </form>
      </div>
    </>
  );
};

export default LocationUpdatePrompt;
