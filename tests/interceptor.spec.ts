import { test, expect } from '@playwright/test';
import { loginPage } from './pageObjects/loginPage';

test('Interceptor an Item', async ({ page }, testInfo) => {

    page.on('request', req => {
        console.log (req.url())
    })

    await page.route("**/*.{png,jpg,jpeg,svg}", (route) => route.abort())
    //await page.route("https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5.jpg", route => route.abort())

    await page.goto('https://www.saucedemo.com/');
    const login = new loginPage(page)
    await login.loginWhitCredentials('standard_user','secret_sauce')
    await login.checkSuccessFullLogin()

    const itemsContainer = await page.locator('#inventory_container .inventory_item'). all();

    await page.screenshot({ path: 'login.png', fullPage: true  })

});

test('Interceptor books', async ({ page }, testInfo) => {

    await page.route(
        "https://demoqa.com/BookStore/v1/Books",
        (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    "Content-Type": "application/json"
                },
                body: 
                `{
                    "books": [
                        {
                            "isbn": "9781593277574",
                            "title": "Libro Modificado",
                            "subTitle": "The Definitive Guide for JavaScript Developers",
                            "author": "Nicholas C. Zakas",
                            "publish_date": "2016-09-03T00:00:00.000Z",
                            "publisher": "No Starch Press",
                            "pages": 500,
                            "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
                            "website": "https://leanpub.com/understandinges6/read"
                        }
                    ]
                }`
            })
        }
    );

    await page.goto("https://demoqa.com/books")
    await page.screenshot({ path: 'books.png', fullPage: true  })
    //await page.pause()

})
