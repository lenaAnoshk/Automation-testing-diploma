import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class RegistrationPage extends BasePage {
    public individualRegistrationButton;
    public name;
    public surname;
    public email;
    public password;
    public confirmPassword;
    public agreements;
    public signUpButton;
    public successMessage;
    public invalidPasswordMessage;

    constructor(page: Page) {
        super(page);
        this.individualRegistrationButton = page.locator('a[href="/new/rejestracja/formularz"]');
        this.name = page.locator('input#firstName');
        this.surname = page.locator('input#surname');
        this.email = page.locator('input#email');
        this.password = page.locator('input#password');
        this.confirmPassword = page.locator('input#confirmPassword');
        this.agreements = page.locator('input#ALL');
        this.signUpButton = page.locator('//span[text() = "Zarejestruj się"]');
        this.successMessage = page.locator('//h2[@class = "registration-success-header"]');
        this.invalidPasswordMessage = page.locator('//span[text() = "Hasło nie spełnia wymogów. Wprowadź inne hasło"]');
    };

    async fillInSignUpForm(name, surname, email, password, confirmPassword) {
        await this.name.fill(name);
        await this.surname.fill(surname);
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.agreements.click();
        await this.signUpButton.click();
    };
}