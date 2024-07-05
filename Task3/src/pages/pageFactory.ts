import { Page } from "@playwright/test";
import BasePage from "./basePage";
import {HomePage} from "./homePage";
import { SearchPage } from "./searchPage";
import { HeaderPage } from "./headerPage";
import { LoginPage } from "./loginPage";
import { ResetPasswordPage } from "./resetPasswordPage";
import { RegestrationPage } from "./regestrationPage";


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
            case "RegestrationPage":
                return new RegestrationPage(page);
            default:
                return new BasePage(page);
        }
    }
}

export { PageFactory };