import { expect } from "@wdio/globals";
import GeoGebraPage from "../pageobjects/ggb.page.ts";

describe("My API tester site", () => {
    // it("should find the canvas", async () => {
    //     await GeoGebraPage.open();
    //     await expect(GeoGebraPage.ggbCanvas).toBeExisting();
    // });

    // it("should find the buttons", async () => {
    //     await GeoGebraPage.open();
    //     await expect(GeoGebraPage.ggbCanvas).toBeExisting();
    //     const objectArray = await GeoGebraPage.findObjects("button");
    //     await expect(objectArray).toHaveLength(3);
    // });

    it("should press the button", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
        const objectArray = await GeoGebraPage.findObjects("button");
        await expect(JSON.stringify(objectArray)).toBe(
            JSON.stringify([
                "button1",
                "instructionsIcon",
                "ggbButton1",
                "ggbButton2",
            ])
        );
        await GeoGebraPage.selectObject(objectArray[0]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.selectObject(objectArray[1]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await browser.waitUntil(
            async () => {
                return await browser.execute(() => {
                    return !!document
                        .querySelector("dialog")
                        ?.hasAttribute("open");
                });
            },
            { timeout: 3000, timeoutMsg: "Dialog box timed out" }
        );
        const dialogOpen = await browser.execute(() => {
            return document.querySelector("dialog")?.hasAttribute("open");
        });
        await expect(dialogOpen).toBe(true);
    });

    it("should press lots of buttons", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
        const objectArray = await GeoGebraPage.findObjects("button");
        await expect(JSON.stringify(objectArray)).toBe(
            JSON.stringify([
                "button1",
                "instructionsIcon",
                "ggbButton1",
                "ggbButton2",
            ])
        );
        await GeoGebraPage.selectObject(objectArray[0]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.selectObject(objectArray[1]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.selectObject(objectArray[2]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.selectObject(objectArray[0]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.selectObject(objectArray[1]);
        await GeoGebraPage.pressKey({
            code: "Space",
            keyCode: 32,
            key: " ",
            which: 32,
        });
        await GeoGebraPage.pressKey({
            code: "Escape",
            keyCode: 27,
            key: "Escape",
            which: 27,
        });
    });
});

