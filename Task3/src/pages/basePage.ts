import {Page} from '@playwright/test'

export default class BasePage {
    readonly page: Page;
    public acceptCookiesButton;
    constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.locator('//div[text() = " Akceptuję "]');
    }

    async openWebsite(url: string) {
        await this.page.goto(url);
        await this.page.waitForSelector('svg.car', { state: 'hidden' });
    };

    async acceptCookies() {
        await this.acceptCookiesButton.click();
    }




}