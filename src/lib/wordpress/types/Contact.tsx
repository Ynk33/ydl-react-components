import { Picture } from "./Picture";

/**
 * CONTACT
 */
type SocialMedia = {
  headline: string,
  instagram: string
};

export type Contact = {
  headline: string;
  content: string;
  picture: Picture;
  social_media: SocialMedia;
}
