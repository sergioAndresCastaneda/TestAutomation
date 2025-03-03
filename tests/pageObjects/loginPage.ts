import { expect, Locator, Page } from "@playwright/test";

export class loginPage {
    
    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shopingCardIcon: Locator

    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', {name: 'Username'})
        this.passwordTextbox = page.getByRole('textbox', {name: 'Password'})
        this.loginButton = page.getByRole('button', {name: 'Login'})
        this.shopingCardIcon = page.locator("xpath=//a[@class='shopping_cart_link']")
    }

    async loginWhitCredentials(username: string, password: string) {
        await this.usernameTextbox.fill(username)
        await this.passwordTextbox.fill(password)
        await this.loginButton.click()
    }

    async checkSuccessFullLogin() {
        await expect(this.shopingCardIcon).toBeVisible()
    }
}