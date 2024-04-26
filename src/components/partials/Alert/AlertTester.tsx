import { useState } from "react";
import Alert, { AlertProps } from "./Alert";

export default function AlertTester(props : AlertProps) {
  const [showAlert, setShowAlert] = useState(false);

  const display = () => {
    setShowAlert(true);
  }

  const hide = () => {
    setShowAlert(false);
  }

  return (
    <>
      <Alert {...props} show={showAlert} onHide={hide} />
      <button
        style={{
          display: "block",
          position: "absolute",
          width: "100px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px"
        }}
        onClick={display}
      >
        Show Alert
      </button>
    </>
  )
}