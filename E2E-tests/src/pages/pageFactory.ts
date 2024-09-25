import { Page } from "@playwright/test";
import BasePage from "./basePage";
import { HomePage } from "./homePage";
import { SearchPage } from "./searchPage";
import { HeaderPage } from "./headerPage";
import { LoginPage } from "./loginPage";
import { ResetPasswordPage } from "./resetPasswordPage";
import { RegistrationPage } from "./registrationPage";
import { MyAccountPage } from "./myAccountPage";
import { SlotsForExamPKKPage } from "./slotsForExamPKKPage";


class PageFactory {
    static getPage(page: Page, pageName: string) {
        switch (pageName) {
            case "BasePage":
                return new BasePage(page);
            case "HomePage":
                return new HomePage(page);
            case "SearchPage":
                return new SearchPage(page);
            case "HeaderPage":
                return new HeaderPage(page);
            case "LoginPage":
                return new LoginPage(page);
            case "ResetPasswordPage":
                return new ResetPasswordPage(page);
            case "RegistrationPage":
                return new RegistrationPage(page);
            case "MyAccountPage":
                return new MyAccountPage(page);
            case "SlotsForExamPKKPage":
                return new SlotsForExamPKKPage(page);
            default:
                return new BasePage(page);
        }
    }
}

export { PageFactory };