import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/pages/pageFactory';
import BasePage from '../src/pages/basePage';
import { HomePage } from '../src/pages/homePage';
import { SearchPage } from '../src/pages/searchPage';
import { HeaderPage } from '../src/pages/headerPage';
import { LoginPage } from '../src/pages/loginPage';
import { ResetPasswordPage } from '../src/pages/resetPasswordPage';
import { RegestrationPage } from '../src/pages/regestrationPage';


test.describe('10 tests for https://info-car.pl', () => {
   let basePage: BasePage, homePage: HomePage, searchPage: SearchPage, headerPage, loginPage, resetPasswordPage, regestrationPage;
    // test.describe('search', () => {
    //     test.beforeEach('Setup', async ({ page }) => {
    //         basePage = PageFactory.getPage(page, "BasePage") as BasePage;
    //         homePage = PageFactory.getPage(page, "HomePage") as HomePage;
    //         searchPage = PageFactory.getPage(page, "SearchPage") as SearchPage;
    //     });
    //     test('search with results', async ({ page }) => {
    //     await basePage.openWebsite('https://info-car.pl/new/');
    //     await basePage.acceptCookies();
    //     await homePage.search('egzamin');
    //     await expect(searchPage.resultsTitle).toHaveText('egzamin');
    //     });

    //     test('search without results', async ({ page }) => {
    //     await basePage.openWebsite('https://info-car.pl/new/');
    //     await basePage.acceptCookies();
    //     await homePage.fillInText('lorem');
    //     await homePage.waiterForSearchInfoMessage()
    //     await expect(homePage.searchInfoMessage).toHaveText('Brak wyników');
    //     });
    // });

    test.describe('login', () => {
        test.beforeEach('Setup', async ({ page }) => {
            basePage = PageFactory.getPage(page, "BasePage") as BasePage;
            homePage = PageFactory.getPage(page, "HomePage") as HomePage;
            headerPage = PageFactory.getPage(page, "HeaderPage") as HeaderPage;
            loginPage = PageFactory.getPage(page, "LoginPage") as LoginPage;
            resetPasswordPage = PageFactory.getPage(page, "ResetPasswordPage") as ResetPasswordPage;
        });
        // test('login with invalid email', async ({ page }) => {
        // await basePage.openWebsite('https://info-car.pl/new/');
        // await basePage.acceptCookies();
        // await headerPage.openLoginPage();
        // await loginPage.fillInEmail('test@gmail.com');
        // await loginPage.fillInPassword('123456');
        // await loginPage.login();
        // await expect(loginPage.invalidEmailError).toBeVisible();
        // await expect(loginPage.infobox).toBeVisible();
        // });
        // test('reset password', async ({ page }) => {
        //     await basePage.openWebsite('https://info-car.pl/new/');
        //     await basePage.acceptCookies();
        //     await headerPage.openLoginPage();
        //     await loginPage.forgotPasswordLink.click();
        //     await resetPasswordPage.resetPassword('anoshkalen+1@gmail.com');
        //     await expect(resetPasswordPage.infobox).toHaveText(' UWAGA! Na podany adres e-mail zostało wysłany link pozwalający na ustawienie nowego hasła.')
        //     });
    
        // });
    
        test.describe('sign up', () => {
            test.beforeEach('Setup', async ({ page }) => {
                basePage = PageFactory.getPage(page, "BasePage") as BasePage;
                regestrationPage = PageFactory.getPage(page, "RegestrationPage") as RegestrationPage;
            });
            test('sign up for individual usage with valid credentials', async ({ page }) => {
                await basePage.openWebsite('https://info-car.pl/oauth2/login');
                await loginPage.signUpButton.click();
                await regestrationPage.individualRegestrationButton.click();
                await regestrationPage.fillInSignUpForm('Lena', 'A', 'anoshkalen+3@gmail.com', 'Qwer1234!', 'Qwer1234!');
                await expect(regestrationPage.successMessage).toHaveText(' Rejestracja prawidłowa')
            });
        });
    })
})