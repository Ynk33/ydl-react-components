/**
 * GALLERY AND PICTURES
 */
type Size = {
  width: number;
  height: number;
}
export type Picture = {
  id: number;
  title: string;
  caption: string;
  full_image_url: string;
  media_details: {
    width: number;
    height: number;
    sizes: {
      thumbnail: Size;
      medium: Size;
      medium_large: Size;
      large: Size
    }
  };
};
