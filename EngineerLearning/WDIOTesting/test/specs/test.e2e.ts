import { expect } from "@wdio/globals";
import GeoGebraPage from "../pageobjects/ggb.page.ts";
import { keys } from "../../utils/constants.ts";
import { testAllTheThings } from "../pageobjects/testAllTheThings.page.ts";

describe("My API tester site", () => {
    it("should find the canvas", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
    });

    it("should find the buttons", async () => {
        await GeoGebraPage.open();
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
        const objectArray = await GeoGebraPage.findObjects("button");
        await expect(objectArray).toHaveLength(4);
    });

    it("should press a button", async () => {
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
        await GeoGebraPage.selectObject(objectArray[1]);
        await GeoGebraPage.pressKey(keys.space);
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

    it("should press all the buttons", async () => {
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
        for (const object of objectArray) {
            await GeoGebraPage.selectObject(object);
            await GeoGebraPage.pressKey(keys.space);
            await browser.execute(() => {
                const button = document.querySelector("button");
                button?.click();
            });
            const waitTime = Math.round(Math.random() * 2000);
            await browser.pause(waitTime);
        }
        await GeoGebraPage.pressKey(keys.escape);
    });

    it("should press all the buttons", async () => {
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
        for (const object of objectArray) {
            await GeoGebraPage.selectObject(object);
            await GeoGebraPage.pressKey(keys.space);
            await browser.execute(() => {
                const button = document.querySelector("button");
                button?.click();
            });
            const waitTime = Math.round(Math.random() * 2000);
            await browser.pause(waitTime);
        }
        await GeoGebraPage.pressKey(keys.escape);
    });

    it("should test all the things once", async () => {
        await testAllTheThings.open("GeoGebraAnalytics.html");
        await expect(GeoGebraPage.ggbCanvas).toBeExisting();
        await testAllTheThings.interactWithAllObjects();
    });

    it("should test all the things repeatedly", async () => {
        const numTimes = Math.round(Math.random() * 10);
        for (let i = 0; i < numTimes; i++) {
            await testAllTheThings.open("GeoGebraAnalytics.html");
            await expect(GeoGebraPage.ggbCanvas).toBeExisting();
            await testAllTheThings.interactWithAllObjects();
        }
    });
});

