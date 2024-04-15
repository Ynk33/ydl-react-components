import { About, Contact, Footer, Galleries, Menu, Metadata, Settings } from "./types";
/**
 * Static class to call Wordpress API endpoints.
 */
declare class WordpressAPI {
    private static _instance;
    private constructor();
    static getInstance(): WordpressAPI;
    /**
     * @var {string} API_URL URL to the Wordpress API.
     */
    private API_URL;
    /**
     * @var {string} RESSOURCE_PATH Path to Wordpress API ressources (posts, pages, etc.).
     */
    private RESSOURCE_PATH;
    /**
     * @var {Object} URLs A convenient way to store the URLs to the Wordpress API
     */
    private URLs;
    /**
     * Send GET query to the specified URL.
     * @param url URL to perform the GET query to.
     * @returns A Promise with the response, in the provided T format.
     */
    private Get;
    testUrl(): string;
    /**
     * Fetch the general Settings from Wordpress API.
     * @returns The Promise to get the requested Settings.
     */
    fetchSettings(): Promise<Settings>;
    /**
     * Fetch the site's metadata from Wordpress API.
     * @returns The Promise to get the requested Metadata.
     */
    fetchMetadata(): Promise<Metadata>;
    /**
     * Fetch the Menu from Wordpress API.
     * @returns The Promise to get the requested Menu.
     */
    fetchMenu(): Promise<Menu>;
    /**
     * Fetch the Highlights (as Galleries) from Wordpress API.
     * @returns The Promise to get the requested Galleries.
     */
    fetchHighlights(): Promise<Galleries>;
    /**
     * Fetch the Galleries from Wordpress API.
     * @returns The Promise to get the requested Galleries.
     */
    fetchGalleries(): Promise<Galleries>;
    /**
     * Fetch the About page content from Wordpress API.
     * @returns The Promise to get the requested About contetn.
     */
    fetchAbout(): Promise<About>;
    /**
     * Fetch the Contact form content from the Wordpress API.
     * @returns The Promise to get the requested Contact form content.
     */
    fetchContact(): Promise<Contact>;
    /**
     * Fetch the Footer content from the Wordpress API.
     * @returns The Promise to get the Footer content.
     */
    fetchFooter(): Promise<Footer>;
}
export default WordpressAPI;
//# sourceMappingURL=WordpressAPI.d.ts.map