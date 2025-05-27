import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    public open(path: string) {
        return browser.url(
            `https://khager29.github.io/EngineerLearning/GeoGebraAnalyticsAPI/${path}`
        );
    }

    public async findObjects(type?: string) {
        return await browser.execute((objectType?: string) => {
            return (window as any).ggbApplet.getAllObjectNames([objectType]);
        }, type);
    }

    public async selectObject(selectedObject: string) {
        await browser.execute((selected: string) => {
            return (window as any).ggbApplet.evalCommand(
                `SelectObjects(${selected})`
            );
        }, selectedObject);
        browser.pause(3000);
    }

    public async pressKey(keyToPress: KeyboardEventInit) {
        await browser.execute((key: KeyboardEventInit) => {
            const element = document.querySelector("canvas");
            const event = new KeyboardEvent("keyup", key);
            element?.dispatchEvent(event);
        }, keyToPress);
        browser.pause(3000);
    }
}

