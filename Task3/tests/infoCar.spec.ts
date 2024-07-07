import { test, expect } from '@playwright/test';
import { PageFactory } from '../src/pages/pageFactory';
import BasePage from '../src/pages/basePage';
import { HomePage } from '../src/pages/homePage';
import { SearchPage } from '../src/pages/searchPage';
import { HeaderPage } from '../src/pages/headerPage';
import { LoginPage } from '../src/pages/loginPage';
import { ResetPasswordPage } from '../src/pages/resetPasswordPage';
import { RegistrationPage } from '../src/pages/registrationPage';
import { MyAccountPage } from '../src/pages/myAccountPage';
import { SlotsForExamPKKPage } from '../src/pages/slotsForExamPKKPage';


test.describe('10 tests for https://info-car.pl', () => {
    let basePage, 
    homePage, 
    searchPage, 
    headerPage, 
    loginPage, 
    resetPasswordPage, 
    registrationPage, 
    myAccountPage, 
    slotsForExamPKKPage;

    test.describe('search', () => {
        test.beforeEach('Setup', async ({ page }) => {
            basePage = PageFactory.getPage(page, "BasePage") as BasePage;
            homePage = PageFactory.getPage(page, "HomePage") as HomePage;
            searchPage = PageFactory.getPage(page, "SearchPage") as SearchPage;
            await basePage.openWebsite('https://info-car.pl/new/');
            await basePage.acceptCookies();
        });
        test('search with results', async ({ page }) => {
        await homePage.search('egzamin');
        await expect(searchPage.resultsTitle).toHaveText('egzamin');
        });

        test('search without results', async ({ page }) => {
        await homePage.fillInText('lorem');
        await expect(homePage.searchInfoMessage).toHaveText('Brak wyników');
        });
    });

    test.describe('login', () => {
        test.beforeEach('Setup', async ({ page }) => {
            basePage = PageFactory.getPage(page, "BasePage") as BasePage;
            homePage = PageFactory.getPage(page, "HomePage") as HomePage;
            headerPage = PageFactory.getPage(page, "HeaderPage") as HeaderPage;
            loginPage = PageFactory.getPage(page, "LoginPage") as LoginPage;
            resetPasswordPage = PageFactory.getPage(page, "ResetPasswordPage") as ResetPasswordPage;
            myAccountPage = PageFactory.getPage(page, "MyAccountPage") as MyAccountPage;
            await basePage.openWebsite('https://info-car.pl/new/');
            await basePage.acceptCookies();
            await headerPage.openLoginPage();
        });

        test('login with valid creadentials', async ({ page }) => {
            await loginPage.fillInEmail('anoshkalen+3@gmail.com');
            await loginPage.fillInPassword('Qwer1234!');
            await loginPage.login();
            await expect(myAccountPage.accountName).toBeVisible();;
            await expect(page).toHaveURL('https://info-car.pl/new/konto');
        });

        test('login with invalid email', async ({ page }) => {
            await loginPage.fillInEmail('test@gmail.com');
            await loginPage.fillInPassword('Qwer1234!');
            await loginPage.login();
            await expect(loginPage.invalidEmailError).toBeVisible();
            await expect(loginPage.infobox).toBeVisible();
        });

        test('reset password', async ({ page }) => {
            await loginPage.forgotPasswordLink.click();
            await resetPasswordPage.resetPassword('anoshkalen+1@gmail.com');
            await expect(resetPasswordPage.infobox).toHaveText(' UWAGA! Na podany adres e-mail zostało wysłany link pozwalający na ustawienie nowego hasła.')
            });

        });

        test.describe('sign up for individual usage', () => {
            test.beforeEach('Setup', async ({ page }) => {
                basePage = PageFactory.getPage(page, "BasePage") as BasePage;
                registrationPage = PageFactory.getPage(page, "RegistrationPage") as RegistrationPage;
                loginPage = PageFactory.getPage(page, "LoginPage") as LoginPage;
                await basePage.openWebsite('https://info-car.pl/oauth2/login');
                await loginPage.signUpButton.click();
                await registrationPage.individualRegistrationButton.click();
            });
            test('sign up with valid credentials', async ({ page }) => {
                await registrationPage.fillInSignUpForm('Lena', 'A', 'anoshkalen+3@gmail.com', 'Qwer1234!', 'Qwer1234!');
                await expect(registrationPage.successMessage).toHaveText(' Rejestracja prawidłowa')
            });

            test('sign up with invalid password', async ({ page }) => {
                await registrationPage.fillInSignUpForm('Lena', 'A', 'anoshkalen+3@gmail.com', 'wer1234!', 'wer1234!');
                await expect(registrationPage.invalidPasswordMessage).toBeVisible();
            });
        });

        test.describe('checking slotes for exam for driving licence PKK, for users', () => {
            test.beforeEach('Setup', async ({ page }) => {
                basePage = PageFactory.getPage(page, "BasePage") as BasePage;
                slotsForExamPKKPage = PageFactory.getPage(page, "SlotsForExamPKKPage") as SlotsForExamPKKPage;
                headerPage = PageFactory.getPage(page, "HeaderPage") as HeaderPage;
                loginPage = PageFactory.getPage(page, "LoginPage") as LoginPage;
                myAccountPage = PageFactory.getPage(page, "MyAccountPage") as MyAccountPage;
                await basePage.openWebsite('https://info-car.pl/new/');
                await basePage.acceptCookies();
                await headerPage.openLoginPage();
                await loginPage.fillInEmail('anoshkalen+3@gmail.com');
                await loginPage.fillInPassword('Qwer1234!');
                await loginPage.login();
                await page.waitForURL('https://info-car.pl/new/konto');
            });

            test('examination centres field in disabled until province is chosen', async ({ page }) => {
                await myAccountPage.chooseToCheckExamTermines();
                await slotsForExamPKKPage.choosePKKexam();
                await expect(slotsForExamPKKPage.examCentreDropdown).toBeDisabled();
            });

            test('examination centre are shown according to chosen area', async ({ page }) => {
                await myAccountPage.chooseToCheckExamTermines();
                await slotsForExamPKKPage.choosePKKexam();
                await slotsForExamPKKPage.chooseProvince('opolskie');
                await expect(slotsForExamPKKPage.examCentreDropdown).toBeEnabled();
                await slotsForExamPKKPage.openExamCentreDropdown();
                await expect(slotsForExamPKKPage.wordOpoleExamCentre).toBeVisible();
            });

            test('slots page opens when province, exam centre, category are chosen', async ({ page }) => {
                await myAccountPage.chooseToCheckExamTermines();
                await slotsForExamPKKPage.choosePKKexam();
                await slotsForExamPKKPage.chooseProvince('opolskie');
                await slotsForExamPKKPage.openExamCentreDropdown();
                await slotsForExamPKKPage.chooseWordOpoleExamCentre();
                await slotsForExamPKKPage.openCategoryDropdown();
                await slotsForExamPKKPage.chooseCategoryA();
                await slotsForExamPKKPage.showSlots();
                await expect(page).toHaveURL('https://info-car.pl/new/prawo-jazdy/sprawdz-wolny-termin/wybor-terminu');
            });

        });
    })