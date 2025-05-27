import { keys } from "../../utils/constants";
import Page from "./page";

class TestAllTheThings extends Page {
    public async openComponent() {
        await super.open("GeoGebraAnalytics.html");
    }

    public async interactWithAllObjects() {
        const objectArray = await this.findObjects();
        for (const object of objectArray) {
            const randomNum = Math.round(Math.random() * 2000);
            if (randomNum % 6 === 0) {
                return;
            }
            await this.selectObject(object);
            if (randomNum % 2 === 0) {
                await this.pressKey(keys.k);
            }
            if (randomNum % 7 === 0) {
                await this.pressKey(keys.upArrow);
                await this.pressKey(keys.downArrow);
            }
            if (randomNum % 11 === 0) {
                await this.pressKey(keys.leftArrow);
                await this.pressKey(keys.rightArrow);
            }

            const waitTime = Math.round(Math.random() * 100);
            await browser.pause(waitTime);
            if (waitTime % 2 === 0) {
                await this.pressKey(keys.space);
                await browser.execute(() => {
                    const button = document.querySelector("button");
                    button?.click();
                });
            }
        }
        await this.pressKey(keys.escape);
    }
}

export const testAllTheThings = new TestAllTheThings();
