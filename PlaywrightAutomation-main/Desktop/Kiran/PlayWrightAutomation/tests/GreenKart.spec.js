const {test, expect} =require("@playwright/test");
const path = require("path");

test('Greenkart page validation', async({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
        await page.locator("(//button[text()='ADD TO CART'])[1]").click();
        await page.locator("div[class='products-wrapper'] div:nth-child(3) div:nth-child(1)");
        await page.locator("img[alt='Cart']").click();
        await page.getByRole("button",{name: 'PROCEED TO CHECKOUT'}).click();
        await page.screenshot({path: 'screenshot.png'});
        await page.getByRole("button",{name: 'Place Order'}).click();
        await page.locator("select").screenshot({path:'NewScreen.png'});
        await page.locator("select").selectOption("India");
        const checkbox=await page.locator(".chkAgree");
        await checkbox.check();
      
        console.log("checkbox selected", await checkbox.isChecked());
        await page.click('text=Proceed');
        
    })

    test.only('screenshot match', async({page})=>
    {
        await page.goto('https://www.rediff.com/');
        expect (await page.screenshot()).toMatchSnapshot('landingpage.png');
    })