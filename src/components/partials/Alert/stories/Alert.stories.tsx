import { ClientFontInitializer } from "../../../../lib";
import { primaryFont, secondaryFont } from "@/fonts";
import AlertProvider from "../AlertProvider";
import AlertAnchor from "../AlertAnchor";
import AlertVariant from "../AlertVariant";
import AlertTester from "./AlertTest";

export default {
  title: "Partials/Alert",
  component: AlertProvider,
  tags: ["autodocs"]
};

export const Alert = () => {
  return (
    <>
      <AlertProvider position={AlertAnchor.BOTTOM_LEFT} variant={AlertVariant.INFO} timeout={5000}>
        <ClientFontInitializer
          primaryFont={primaryFont}
          secondaryFont={secondaryFont}
        />
        <AlertTester />
      </AlertProvider>
    </>
  )
};