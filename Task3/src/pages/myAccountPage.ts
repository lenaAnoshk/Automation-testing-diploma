import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class MyAccountPage extends BasePage {
    public accountName;
    public bookDrivingExamLink;
    public checkExamsSlotesLink;


    constructor(page: Page) {
        super(page);
        this.accountName = page.locator('//h1[text() = " Moje konto "]');
        this.bookDrivingExamLink = page.locator('a[href="/new/prawo-jazdy/zapisz-sie-na-egzamin-na-prawo-jazdy"]');
        this.checkExamsSlotesLink = page.locator('a[href="/new/prawo-jazdy/sprawdz-wolny-termin"]');
    };
    async chooseToCheckExamTermines() {
        await this.bookDrivingExamLink.click();
        await this.checkExamsSlotesLink.click();

    };


}