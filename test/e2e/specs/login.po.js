module.exports = class LoginPageObject {
    constructor(page) {
        this.page = page;
        this.getEmailInput = () => page.$('[placeholder=Email]');
        this.getPasswordInput = () => page.$('[placeholder=Password]');
        this.getConfirmButton = () =>
            page.$$('button').then(buttons =>
                Promise.all(
                    buttons.filter(async button => {
                        const text = await button.asElement().innerText;
                        return text === 'Login';
                    })
                ).then(buttons => buttons[0])
            );
    }

    async login(email, password) {
        await this.getEmailInput().then(element => element.type(email));
        await this.getPasswordInput().then(element => element.type(password));
        await this._confirm();
    }

    async _confirm() {
        await this.getConfirmButton().then(button => button.click());
    }
};
