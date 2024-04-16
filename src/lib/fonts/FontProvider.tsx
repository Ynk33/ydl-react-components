import { NextFont } from "next/dist/compiled/@next/font";

/**
 * Class to provide a context for sharing fonts across the application.
 */
export default class FontProvider {

  /**
   * @constructor Creates a new instance of FontProvider.
   */
  private constructor() { }

  /**
   * @var {FontProvider} _intance The singleton instance of the FontProvider.
   */
  private static _instance: FontProvider;

  /**
   * Returns the singleton instance of the FrontProvider.
   * @returns The singleton instance of the FrontProvider.
   */
  static getInstance(): FontProvider {
    console.log(("##### FONTPROVIDER #####"));
    if (FontProvider._instance === undefined) {
      console.log("##### no instance, create a new one");
      FontProvider._instance = new FontProvider();
    }

    console.log("##### return instance", FontProvider._instance);
    return FontProvider._instance;
  }

  /**
   * @var {Array<NextFont>} List of availables fonts.
   */
  private fonts: Array<NextFont> = [];

  /**
   * Initialize the FontProvider singleton with a list of available fonts.
   * @param fonts The available fonts.
   */
  public static initialize(primaryFont: NextFont, secondaryFont: NextFont) {
    FontProvider.getInstance().fonts = [primaryFont, secondaryFont];
  }

  /**
   * @returns {NextFont} The primary font.
   */
  public static get PrimaryFont(): NextFont {
    console.log(FontProvider.getInstance());
    console.log(FontProvider.getInstance().fonts);
    return FontProvider.getInstance().fonts[0];
  }

  /**
   * @returns {NextFont} The secondary font.
   */
  public static get SecondaryFont(): NextFont {
    console.log(FontProvider.getInstance());
    console.log(FontProvider.getInstance().fonts);
    return FontProvider.getInstance().fonts[1];
  }
}