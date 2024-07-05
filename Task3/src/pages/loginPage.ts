import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class LoginPage extends BasePage {
    public emailField;
    public passwordField;
    public regesterButton;
    public invalidEmailError;
    public infobox;
    public forgotPasswordLink;
    public signUpButton;

    constructor(page: Page) {
        super(page);
        this.emailField = page.locator('input#username');
        this.passwordField = page.locator('input#password');
        this.regesterButton = page.locator('button#register-button');
        this.invalidEmailError = page.locator('//span[text() = "E-mail bądź hasło nieprawidłowe. Popraw dane"]');
        this.infobox = page.locator('fieldset.infobox');
        this.forgotPasswordLink = page.locator('//a[text()="Nie pamiętam hasła"]');
        this.signUpButton = page.locator('button.register-button');
    };

    async fillInEmail(text) {
        await this.emailField.fill(text);
    };

    async fillInPassword(text) {
        await this.passwordField.fill(text);
    };
    async login() {
        await this.regesterButton.click();
    };


}