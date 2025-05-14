import { expect } from "@wdio/globals";
import GeoGebraPage from "../pageobjects/ggb.page.ts";

describe("My API tester site", () => {
    it("should find the canvas", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
    });

    it("should find the buttons", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
        const objectArray = GeoGebraPage.findObjects();
        await expect(objectArray).toHaveLength(3);
    });
});

