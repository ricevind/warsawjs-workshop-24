module.exports = class NavPageObject {
    constructor(page) {
        this.page = page;
        this.registerButton = () => page.$('[routerlink=signup]');
        this.loginButton = () =>
            page.$$('a').then(buttons =>
                Promise.all(
                    buttons.filter(async button => {
                        const text = await button.asElement().innerText;
                        return text === 'Login';
                    })
                ).then(buttons => buttons[0])
            );
    }

    async goToRegisterForm() {
        await this.registerButton().then(button => button.click());
    }

    async goToLoginForm() {
        await this.loginButton().then(button => button.click());
    }
};
