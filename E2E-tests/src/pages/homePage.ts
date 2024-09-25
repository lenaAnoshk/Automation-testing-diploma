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
        this.searchInfoMessage = page.locator('div.no-results h2');
    };

    async search(text: string) {
        await this.searchField.fill(text);
        await this.searchAll.scrollIntoViewIfNeeded();
        await this.searchAll.click();
    };

    async fillInText(text: string) {
        await this.searchField.fill(text);
    };


}