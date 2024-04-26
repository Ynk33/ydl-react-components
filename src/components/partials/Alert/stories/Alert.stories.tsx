import { ClientFontInitializer } from "../../../../lib";
import { primaryFont, secondaryFont } from "@/fonts";
import AlertProvider from "../AlertProvider/AlertProvider";
import AlertPositions from "../AlertPositions";
import AlertTester from "./AlertTester";

export default {
  title: "Partials/Alert",
  component: AlertProvider,
  tags: ["autodocs"],
};

export const Alert = () => {
  return (
    <>
      <AlertProvider
        position={AlertPositions.TOP_RIGHT}
        timeout={5000}
      >
        <ClientFontInitializer
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
        <AlertTester />
      </AlertProvider>
    </>
  );
};
