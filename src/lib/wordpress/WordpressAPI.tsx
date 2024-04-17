import { unstable_noStore as noStore } from "next/cache";
import {
  About,
  Contact,
  Footer,
  Galleries,
  Maintenance,
  Menu,
  Metadata,
  Settings,
} from "./types";

/**
 * Static class to call Wordpress API endpoints.
 */
class WordpressAPI {
  private static _instance: WordpressAPI;
  private constructor() {}

  public static getInstance() {
    if (WordpressAPI._instance === undefined) {
      WordpressAPI._instance = new WordpressAPI();
    }

    return WordpressAPI._instance;
  }

  /**
   * @var {string} API_URL URL to the Wordpress API.
   */
  private API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL + "/wp-json";

  /**
   * @var {string} RESSOURCE_PATH Path to Wordpress API ressources (posts, pages, etc.).
   */
  private RESSOURCE_PATH = "/wp/v2";

  /**
   * @var {Object} URLs A convenient way to store the URLs to the Wordpress API
   */
  private URLs = {
    // GET
    settings: this.API_URL,

    maintenance: this.API_URL + "/custom/maintenance",
    metadata: this.API_URL + "/custom/metadata",
    menu: this.API_URL + "/custom/menu",
    theme: this.API_URL + "/custom/theme",
    about: this.API_URL + "/custom/about",
    contact: this.API_URL + "/custom/contact",
    footer: this.API_URL + "/custom/footer",

    categories: this.API_URL + this.RESSOURCE_PATH + "/categories",
    pages: this.API_URL + this.RESSOURCE_PATH + "/pages",
    highlights: this.API_URL + this.RESSOURCE_PATH + "/highlight",
    galleries: this.API_URL + this.RESSOURCE_PATH + "/gallery",
    mediaFile: this.API_URL + this.RESSOURCE_PATH + "/media",

    // POST
    sendEmail: this.API_URL + "/custom/contact/send",
  };

  /**
   * Send GET query to the specified URL.
   * @param url URL to perform the GET query to.
   * @returns A Promise with the response, in the provided T format.
   */
  private async Get<T>(url: string): Promise<T> {
    console.log("Fetching " + url + "...");
    try {
      const response: Response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not OK.");
      }

      const data = await response.json();

      console.log("Fetch successful!");

      return data;
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation.",
        error
      );
      return Promise.reject(error);
    }
  }

  /**
   * Returns an URL example for testing purpose.
   * @returns An URL example for testing purpose.
   */
  public static testUrl() {
    return WordpressAPI.getInstance().URLs.metadata;
  }

  /**
   * Checks if the website is in maintenance mode from the Wordpress API.
   * @returns Whether the website is in maintenance mode or not.
   */
  public static async isInMaintenanceMode(): Promise<boolean> {
    noStore();
    const response = await WordpressAPI.getInstance().Get<Maintenance>(
      WordpressAPI.getInstance().URLs.maintenance
    );
    return response.maintenance === 1;
  }

  /**
   * Fetch the general Settings from Wordpress API.
   * @returns The Promise to get the requested Settings.
   */
  public static async fetchSettings(): Promise<Settings> {
    noStore();
    return await WordpressAPI.getInstance().Get<Settings>(
      WordpressAPI.getInstance().URLs.settings
    );
  }

  /**
   * Fetch the site's metadata from Wordpress API.
   * @returns The Promise to get the requested Metadata.
   */
  public static async fetchMetadata(): Promise<Metadata> {
    noStore();
    return await WordpressAPI.getInstance().Get<Metadata>(
      WordpressAPI.getInstance().URLs.metadata
    );
  }

  /**
   * Fetch the Menu from Wordpress API.
   * @returns The Promise to get the requested Menu.
   */
  public static async fetchMenu(): Promise<Menu> {
    noStore();
    return await WordpressAPI.getInstance().Get<Menu>(
      WordpressAPI.getInstance().URLs.menu
    );
  }

  /**
   * Fetch the Highlights (as Galleries) from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public static async fetchHighlights(): Promise<Galleries> {
    noStore();
    return await WordpressAPI.getInstance().Get<Galleries>(
      WordpressAPI.getInstance().URLs.highlights
    );
  }

  /**
   * Fetch the Galleries from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public static async fetchGalleries(): Promise<Galleries> {
    noStore();
    return await WordpressAPI.getInstance().Get<Galleries>(
      WordpressAPI.getInstance().URLs.galleries
    );
  }

  /**
   * Fetch the About page content from Wordpress API.
   * @returns The Promise to get the requested About contetn.
   */
  public static async fetchAbout(): Promise<About> {
    noStore();
    return await WordpressAPI.getInstance().Get<About>(
      WordpressAPI.getInstance().URLs.about
    );
  }

  /**
   * Fetch the Contact form content from the Wordpress API.
   * @returns The Promise to get the requested Contact form content.
   */
  public static async fetchContact(): Promise<Contact> {
    noStore();
    return await WordpressAPI.getInstance().Get<Contact>(
      WordpressAPI.getInstance().URLs.contact
    );
  }

  /**
   * Fetch the Footer content from the Wordpress API.
   * @returns The Promise to get the Footer content.
   */
  public static async fetchFooter(): Promise<Footer> {
    noStore();
    return await WordpressAPI.getInstance().Get<Footer>(
      WordpressAPI.getInstance().URLs.footer
    );
  }
}

export default WordpressAPI;
