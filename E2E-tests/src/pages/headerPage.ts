import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class HeaderPage extends BasePage {
    public myAccountButton;

    constructor(page: Page) {
        super(page);
        this.myAccountButton = page.locator('//span[text() = "MOJE KONTO"]');
    };

    async openLoginPage() {
        await this.myAccountButton.click();
    };

}