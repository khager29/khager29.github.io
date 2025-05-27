import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class GeoGebraPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get ggbCanvas() {
        return $("canvas");
    }

    // open website
    public open() {
        return super.open("GeoGebraAnalytics.html");
    }

}

export default new GeoGebraPage();

