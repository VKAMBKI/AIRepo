const { test, expect } = require('@playwright/test');
const { text } = require('stream/consumers');

test('Browser Context playwright test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //CSS - type is depricated and fill is stable
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
    //wedriver wait
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    //type or fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(2).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});


test('Page playwrite test', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const DocumentLink = page.locator("[href*='rahulshettyacademy']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //assertion
    console.log(await page.locator(".radiotextsty").last().isChecked());
    //When action is outside we have to use await in outside. 
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    //if action is inside we have to use inside
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(DocumentLink).toHaveAttribute("class", "blinkingText");

});


test.only('@child window handle', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const DocumentLink = page.locator("[href*='rahulshettyacademy']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            DocumentLink.click(),
        ])
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@");
    const domain = arrayText[1].split(" ")[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').textContent());

});