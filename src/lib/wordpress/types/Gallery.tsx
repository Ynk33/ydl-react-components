import { Picture } from "./Picture";

export type Gallery = {
  id: number;
  title: {
    rendered: string;
  };
  acf: {
    photo_gallery: {
      pictures: [[Picture]];
    };
  };
};