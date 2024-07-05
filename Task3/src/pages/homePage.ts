import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class HomePage extends BasePage {
    public searchField;
    public searchAll;
    public searchInfoMessage;

    constructor(page: Page) {
        super(page);
        this.searchField = page.locator('input[aria-label="Wpisz nazwę szukanej usługi"]');
        this.searchAll = page.locator('button.ic-btn');
        this.searchInfoMessage = page.locator('h2[ _ngcontent-tjh-c80=""]');
    };

    async search(text: string) {
        await this.searchField.fill(text);
        await this.searchAll.scrollIntoViewIfNeeded();
        await this.searchAll.click();
    };

    async fillInText(text: string) {
        await this.searchField.fill(text);
    };

    async waiterForSearchInfoMessage(){
        await this.page.waitForSelector('h2[ _ngcontent-tjh-c80=""]', { state: 'visible' });
    }

}