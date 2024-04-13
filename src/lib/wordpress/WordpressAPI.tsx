import { unstable_noStore as noStore } from "next/cache";
import { About, Contact, Footer, Galleries, Menu, Metadata, Settings } from "./types";

/**
 * Static class to call Wordpress API endpoints.
 */
class WordpressAPI {

  private static _instance: WordpressAPI;
  private constructor() { }

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
    try {
      const response: Response = await fetch(url);
      console.log("Fetching " + url + "...");
      if (!response.ok) {
        throw new Error("Network response was not OK.");
      }

      const data = await response.json();

      console.log("Fetch successful!");

      return data;
    } catch (error) {
      console.error("There has been a problem with your fetch operation.", error);
      return Promise.reject(error);
    }
  }

  public testUrl() {
    return this.URLs.metadata;
  }

  /**
   * Fetch the general Settings from Wordpress API.
   * @returns The Promise to get the requested Settings. 
   */
  public async fetchSettings(): Promise<Settings> {
    noStore();
    return await this.Get<Settings>(this.URLs.settings);
  }

  /**
   * Fetch the site's metadata from Wordpress API.
   * @returns The Promise to get the requested Metadata.
   */
  public async fetchMetadata(): Promise<Metadata> {
    noStore();
    return await this.Get<Metadata>(this.URLs.metadata);
  }

  /**
   * Fetch the Menu from Wordpress API.
   * @returns The Promise to get the requested Menu.
   */
  public async fetchMenu(): Promise<Menu> {
    noStore();
    return await this.Get<Menu>(this.URLs.menu);
  }

  /**
   * Fetch the Highlights (as Galleries) from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public async fetchHighlights(): Promise<Galleries> {
    noStore();
    return await this.Get<Galleries>(this.URLs.highlights);
  }

  /**
   * Fetch the Galleries from Wordpress API.
   * @returns The Promise to get the requested Galleries.
   */
  public async fetchGalleries(): Promise<Galleries> {
    noStore();
    return await this.Get<Galleries>(this.URLs.galleries);
  }

  /**
   * Fetch the About page content from Wordpress API.
   * @returns The Promise to get the requested About contetn.
   */
  public async fetchAbout(): Promise<About> {
    noStore();
    return await this.Get<About>(this.URLs.about);
  }

  /**
   * Fetch the Contact form content from the Wordpress API.
   * @returns The Promise to get the requested Contact form content.
   */
  public async fetchContact(): Promise<Contact> {
    noStore();
    return await this.Get<Contact>(this.URLs.contact);
  }

  /**
   * Fetch the Footer content from the Wordpress API.
   * @returns The Promise to get the Footer content.
   */
  public async fetchFooter(): Promise<Footer> {
    noStore();
    return await this.Get<Footer>(this.URLs.footer);
  }
}

export default WordpressAPI;
