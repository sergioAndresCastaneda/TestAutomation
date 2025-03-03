import { test, expect } from '@playwright/test';
import { loginPage } from './pageObjects/loginPage';

test('Test-Uno', async ({ page }, testInfo) => {
    await page.goto('https://www.saucedemo.com/');

    const login = new loginPage(page)
    await login.loginWhitCredentials('standard_user','secret_sauce')
    await login.checkSuccessFullLogin()
    //await page.screenshot({ path: 'screenshots/login.png', fullPage:true })
    await testInfo.attach('login', {
        body: await page.screenshot(),
        contentType: 'image/png'
    })

     const itemsContainer = await page.locator('#inventory_container .inventory_item'). all();
     const randomIndex = Math.floor(Math.random() * itemsContainer.length);
     const randomItems = itemsContainer[randomIndex]

     const expectedDescription = await randomItems.locator('.inventory_item_desc').innerText();
     const expectedName = await randomItems.locator('.inventory_item_name').innerText();
     const expectedPrice = await randomItems.locator('.inventory_item_price').innerText();

     console.log(`Name: ${expectedName} Description: ${expectedDescription} Price: ${expectedPrice}`);

     await randomItems.getByRole('button', {name: 'Add to cart'}).click();
     await page.locator("//a[@class='shopping_cart_link']").click();
     //await page.screenshot({ path: 'screenshots/itemSelection.png', fullPage:true })
     await testInfo.attach('itemSelection', {
        body: await page.screenshot(),
        contentType: 'image2/png'
    })

    expect(page.getByRole('button', {name: 'Checkout'})).toBeVisible();

    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    expect(actualName).toEqual(expectedName)
    expect(actualDescription).toEqual(expectedDescription)
    expect(actualPrice).toEqual(expectedPrice)

    await page.getByRole('button', {name: 'Checkout'}).click();
    await page.getByRole('textbox', {name: 'First Name'}).fill('Sergio');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Test');
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('110452');
    await page.getByRole('button', {name: 'Continue'}).click();
    await page.getByRole('button', {name: 'Finish'}).click();

    expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();

    //await page.pause()
});

test('Navigate', async ({ page }) => {

    //await page.goto(process.env.URL);

    /*const login = new loginPage(page)
    await login.loginWhitCredentials('standard_user','secret_sauce')
    await login.checkSuccessFullLogin()
    //await page.pause()*/
});

