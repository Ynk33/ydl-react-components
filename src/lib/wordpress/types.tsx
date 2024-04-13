/**
 * SETTINGS
 */
export type Settings = {
  name: string;
  description: string;
}

/**
 * Metadata
 */
export type Metadata = {
  title: string;
  description: string;
  image: Picture;
}

/**
 * NAVBAR
 */
export type MenuItem = {
  ID: number;
  title: string;
  url: string;
};

export type Menu = [MenuItem];

/**
 * GALLERY AND PICTURES
 */
export type Size = {
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

export type Galleries = [Gallery];

/**
 * ABOUT
 */
export type About = {
  headline: string;
  subtitle: string;
  picture: Picture;
  content: string;
  background: Picture;
};

/**
 * CONTACT
 */
export type SocialMedia = {
  headline: string,
  instagram: string
};

export type Contact = {
  headline: string;
  content: string;
  picture: Picture;
  social_media: SocialMedia;
}

/**
 * FOOTER
 */
export type Footer = {
  content: string;
}