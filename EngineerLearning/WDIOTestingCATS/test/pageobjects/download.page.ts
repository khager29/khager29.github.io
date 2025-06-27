import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DownloadPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputLessonID() {
        return $("#lessonID");
    }

    public get btnSubmit() {
        return $('button[id="pull-text"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login(lessonID: string) {
        await this.inputLessonID.setValue(lessonID);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open() {
        return super.open();
    }
}

export default new DownloadPage();

