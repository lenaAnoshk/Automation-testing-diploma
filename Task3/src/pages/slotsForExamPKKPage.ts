
import { Page } from "@playwright/test";
import BasePage from "./basePage"

export class SlotsForExamPKKPage extends BasePage {
    public PKKcheckbox;
    public provinceDropdown;
    public examCentreDropdown;
    public wordOpoleExamCentre ;
    public examCentre;
    public categoryDropdown;
    public categoryA;
    public submitButton;


    constructor(page: Page) {
        super(page);
        this.PKKcheckbox = page.locator('//span[text() = "Egzamin na prawo jazdy (PKK)"]');
        this.provinceDropdown = page.locator('input#province');
        this.examCentreDropdown = page.locator('input#organization');
        this.wordOpoleExamCentre = page.locator('li#word-opole');
        this.categoryDropdown = page.locator('input#category-select');
        this.categoryA = page.locator('li#a');
        this.submitButton = page.locator('//span[text()= "Dalej"]');
    };

    async chooseProvince(provinceName: string) {
        await this.provinceDropdown.click();
        await this.page.locator(`li#${provinceName}`).click();
    };


    async choosePKKexam() {
        await this.PKKcheckbox.click();
    };

    async openExamCentreDropdown() {
        await this.examCentreDropdown.click();
    };

    async chooseWordOpoleExamCentre() {
        await this.wordOpoleExamCentre.click();
    };

    async openCategoryDropdown() {
        await this.categoryDropdown.click();
    };
    async chooseCategoryA() {
        await this.categoryA.click();
    };

    async showSlots() {
        await this.submitButton.click();
    };

};