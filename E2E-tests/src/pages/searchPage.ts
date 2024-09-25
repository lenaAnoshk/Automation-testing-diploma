import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class SearchPage extends BasePage {
    public resultsTitle;

    constructor(page: Page) {
        super(page);
        this.resultsTitle = page.locator('span.search-results__title--highlited');
    };

}