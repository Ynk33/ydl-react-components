import Image from "next/image";

import { SocialButtonProps } from "./_SocialButtonProps";
import SocialButton from "./_SocialButton";
import instaLogo from "./assets/instagram.svg";

export default function InstagramButton(props: SocialButtonProps) {
  return (
    <SocialButton {...props}>
      <Image src={instaLogo} alt="Instagram" width={props.size} height={props.size} />
    </SocialButton>
  );
}
