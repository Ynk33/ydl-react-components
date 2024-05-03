import { unstable_noStore as noStore } from "next/cache";
import {
  About,
  Contact,
  ContactMessage,
  ContactMessageResponse,
  Footer,
  Galleries,
  Gallery,
  Maintenance,
  Menu,
  Metadata,
  Sections,
  Settings,
  Tag,
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
    // TEST
    naked: this.API_URL,

    // GET
    settings: this.API_URL,
    tags: this.API_URL + this.RESSOURCE_PATH + "/tags",

    maintenance: this.API_URL + "/custom/maintenance",
    metadata: this.API_URL + "/custom/metadata",
    menu: this.API_URL + "/custom/menu",
    sections: this.API_URL + "/custom/sections",
    theme: this.API_URL + "/custom/theme",
    about: this.API_URL + "/custom/about",
    contact: this.API_URL + "/custom/contact",
    footer: this.API_URL + "/custom/footer",

    categories: this.API_URL + this.RESSOURCE_PATH + "/categories",
    pages: this.API_URL + this.RESSOURCE_PATH + "/pages",
    galleries: this.API_URL + this.RESSOURCE_PATH + "/gallery",
    mediaFile: this.API_URL + this.RESSOURCE_PATH + "/media",

    // POST
    sendEmail: this.API_URL + "/custom/contact/send",
  };

  /**
   * Send GET query to the specified URL.
   * @param url URL to perform the GET query to.
   * @param params Array of arguments to pass into the GET query.
   * @returns A Promise with the response, in the provided T format.
   */
  private async Get<T>(
    url: string,
    params: { [key: string]: string } = {}
  ): Promise<T> {
    // Build url with optional params.
    url += "?" + new URLSearchParams(params);

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
   * Send a POSt query to the specified URL.
   * @param url URL to perform the POST query to.
   * @param body The data to send.
   */
  private async Post<T>(url: string, body: Object): Promise<T> {
    console.log("Posting " + url + "...");
    try {
      const response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not OK: " + response.body);
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
   * Fetch Tags from Wordpress API.
   * @param args Array of arguments to pass into the GET query.
   * @returns The Promise to get a list of Tags.
   */
  public static async fetchTags(
    args: { [key: string]: string } = {}
  ): Promise<Tag[]> {
    return await WordpressAPI.getInstance().Get<Tag[]>(
      WordpressAPI.getInstance().URLs.tags,
      args
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
   * Fetch the Sections from Wordpress API.
   * @returns The Promise to get the requested Sections.
   */
  public static async fetchSections(): Promise<Sections> {
    noStore();
    return await WordpressAPI.getInstance().Get<Sections>(
      WordpressAPI.getInstance().URLs.sections
    );
  }

  /**
   * Fetch the Highlights (as Galleries) from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public static async fetchHighlights(): Promise<Gallery> {
    const tags = await WordpressAPI.fetchTags({ slug: "highlights" });
    
    noStore();
    const galleries = await WordpressAPI.getInstance().Get<Galleries>(
      WordpressAPI.getInstance().URLs.galleries,
      { tags: tags[0].id.toString() }
    );

    return galleries[0];
  }

  /**
   * Fetch the Galleries from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public static async fetchGalleries(): Promise<Galleries> {
    const tags = await WordpressAPI.fetchTags({ slug: "highlights" });

    noStore();
    return await WordpressAPI.getInstance().Get<Galleries>(
      WordpressAPI.getInstance().URLs.galleries,
      { tags_exclude: tags[0].id.toString() }
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
   * Send a message through the Wordpress API.
   * @param message The message to send.
   * @returns The Promise to get an answer from the server.
   */
  public static async sendMessage(
    message: ContactMessage
  ): Promise<ContactMessageResponse> {
    return await WordpressAPI.getInstance().Post<ContactMessageResponse>(
      WordpressAPI.getInstance().URLs.sendEmail,
      message
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
