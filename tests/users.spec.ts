import { test } from '@playwright/test';
import { loginPage } from './pageObjects/loginPage';

test('Test-standart', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const login = new loginPage(page)
    await login.loginWhitCredentials('standard_user','secret_sauce')
    await login.checkSuccessFullLogin()
    //await page.pause()
});

test('Test-locked', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const login = new loginPage(page)
    await login.loginWhitCredentials('locked_out_user','secret_sauce')
    //await page.pause()
});

test('Test-performance', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    const login = new loginPage(page)
    await login.loginWhitCredentials('performance_glitch_user','secret_sauce')
    //await page.pause()
});