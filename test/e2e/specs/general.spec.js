const puppeteer = require('puppeteer');
const RegisterPageObject = require('./register.po');
const NavPageObject = require('./nav.po');
const LoginPageObject = require('./login.po');

describe('General', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
    let browser = null;
    let page = null;
    let registerPo;
    let navPo;
    let loginPo;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            defaultViewport: null,
            slowMo: 50
        });
        page = await browser.newPage();
        await page.goto('https://ricevind.github.io/ng-deckbuilder', { waitUntil: 'networkidle2' });
        registerPo = new RegisterPageObject(page);
        navPo = new NavPageObject(page);
        loginPo = new LoginPageObject(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should set correct title', async () => {
        expect(await page.title()).toBe('ng-deckbuilder');
    });

    it('register and login', async () => {
        const email = 'aaa1@gmail.com';
        const password = 'password';
        await navPo.goToRegisterForm();
        await registerPo.register(email, password);
        await navPo.goToLoginForm();
        await loginPo.login(email, password);
    });
});
