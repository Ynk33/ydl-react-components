import { Picture } from "./Picture";
import { SocialMedia } from "./SocialMedia";

/**
 * CONTACT
 */
export type Contact = {
  headline: string;
  content: string;
  picture: Picture;
  social_media: SocialMedia;
}

export type ContactMessage = {
  contact_name: string;
  contact_email: string;
  contact_message: string;
}

export type ContactMessageResponse = {
  status: number;
  message: string;
}