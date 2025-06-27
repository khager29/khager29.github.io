import DownloadPage from "../pageobjects/download.page.js";
import { didSotGlobalIds } from "./didSotGlobalIds.ts";

describe("Batch download test", () => {
    it("should process all downloads", async () => {
        const mainHandle = await browser.getWindowHandle();

        for (const id of didSotGlobalIds) {
            console.log("FIND ME:", id);
            await DownloadPage.open();
            await DownloadPage.login(id);
            await browser.pause(30_000);
            await browser.closeWindow();
            await browser.switchToWindow(mainHandle);
        }
    });
});

