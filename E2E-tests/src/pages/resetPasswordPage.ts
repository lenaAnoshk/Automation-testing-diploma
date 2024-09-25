import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class ResetPasswordPage extends BasePage {
    public emailField;
    public sendButton;
    public infobox;

    constructor(page: Page) {
        super(page);
        this.emailField = page.locator('input#email');
        this.sendButton = page.locator('button.ghost-btn[style="width: 228px;"]');
        this.infobox = page.locator('fieldset');
    };

    async resetPassword(text) {
        await this.emailField.fill(text);
        await this.sendButton.click();

    };
}