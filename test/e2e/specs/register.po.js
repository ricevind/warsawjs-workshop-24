module.exports = class RegisterPageObject {
    constructor(page) {
        this.page = page;
        this.getEmailInput = () => page.$('[placeholder=Email]');
        this.getPasswordInput = () => page.$('[placeholder=Password]');
        this.getConfirmPasswordInput = () =>
            page.$('[placeholder="Repeat password"]');
        this.getConfirmButton = () =>
            page.$$('button').then(buttons =>
                Promise.all(
                    buttons.filter(async button => {
                        const text = await button.asElement().innerText;
                        return text === 'Sign up';
                    })
                ).then(buttons => buttons[0])
            );
    }

    async register(email, password) {
        await this.getEmailInput().then(element => element.type(email));
        await this.getPasswordInput().then(element => element.type(password));
        await this.getConfirmPasswordInput().then(element =>
            element.type(password)
        );
        await this._confirm();
    }

    async _confirm() {
        await this.getConfirmButton().then(button => button.click());
        return new Promise(resolve => {
            const listener = this.page.on('dialog', dialog => {
                setTimeout(() => {
                    dialog.dismiss();
                    resolve(listener);
                }, 1000);
            });
        })
            .then(listener => console.log(listener))
            .then(() => true);
    }
};
