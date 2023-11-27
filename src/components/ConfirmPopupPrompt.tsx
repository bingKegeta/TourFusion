import React from "react";
import "../styles/ConfirmPopupPrompt.css";
import Button from "./Button";

interface PopupProps {
  header: string;
  text: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmPopupPrompt = ({
  header,
  text,
  onConfirm,
  onClose,
}: PopupProps) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className="alert-container">
        <h2>{header}</h2>
        <p className="main-prompt-text">{text}</p>
        <div className="buttons">
          <Button text="Yes" onClick={onConfirm} />
          <Button text="No" onClick={onClose} />
        </div>
      </div>
    </>
  );
};

export default ConfirmPopupPrompt;
