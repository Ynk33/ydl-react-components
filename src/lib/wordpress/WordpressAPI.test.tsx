import WordpressAPI from "./WordpressAPI";
import fetch from "isomorphic-fetch";

describe("Test WordpressAPI", () => {

  const env = process.env;

  beforeEach(() => {
    jest.resetModules();

    global.fetch = fetch;

    process.env = {
      ...env,
      NEXT_PUBLIC_WORDPRESS_API_URL: "http://localhost"
    }
  });

  afterEach(() => {
    process.env = env;
  });

  it("WordpressAPI.URLs should point to http://localhost", () => {
    expect(WordpressAPI.getInstance().testUrl()).toContain("http://localhost");
  });

  it("WordpressAPI.fetchMetadata() should return something not empty", async () => {

    const metadata = await WordpressAPI.getInstance().fetchMetadata();

    expect(metadata).not.toBe(undefined);
    expect(metadata.title).not.toBe(undefined);
  });
});