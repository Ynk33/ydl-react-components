import Image from "next/image";

import { SocialButtonProps } from "@/partials/SocialMedia/buttons/_SocialButtonProps";
import instaLogo from "@/partials/social-media/buttons/assets/instagram.svg";

export default function SocialButton(props: SocialButtonProps) {
  return (
    <SocialButton {...props}>
      <Image src={instaLogo} alt="Instagram" width={props.size} height={props.size} />
    </SocialButton>
  );
}
