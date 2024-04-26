import useAlert from "../../../../lib/hooks/useAlert";

export default function AlertTester() {

  const alert = useAlert();

  const info = () => {
    alert.info("Info");
  }

  const success = () => {
    alert.success("Success");
  }

  const warning = () => {
    alert.warning("Warning");
  }

  const danger = () => {
    alert.danger("Danger");
  }

  return (
    <>
      <button onClick={info}>Info</button>
      <button onClick={success}>Success</button>
      <button onClick={warning}>Warning</button>
      <button onClick={danger}>Danger</button>
    </>
  );
}