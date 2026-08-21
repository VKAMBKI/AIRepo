const {test, expect} = require('@playwright/test');

test('Client app login', async ({page}) =>
{
    const email = "ramenk@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("King@123");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name: "Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name: "Cart"}).click();
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name: "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name:"India"}).nth(1).click();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.getByText("PLACE ORDER").click();
    await expect (page.getByText(" Thankyou for the order. ")).toBeVisible();

        /*const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderId);

        await page.locator("button[routerlink*='myorders']").click();
        await page.locator("tbody").waitFor();
        const row = await page.locator("tbody tr");

        for(let i=0; i<await row.count(); ++i)
        {
            const rowOrderId = await row.nth(i).locator("th").textContent();
            if(orderId.includes(rowOrderId))
            {
                await row.nth(i).locator("button").first().click();
                break;
            }
        }
        const orderIdDetails = await page.locator(".col-text").textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();*/

  
});





