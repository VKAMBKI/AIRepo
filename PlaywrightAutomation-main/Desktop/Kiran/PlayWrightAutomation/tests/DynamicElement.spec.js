const {test, expect} = require('@playwright/test');

test("Dynamic Element Validation", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.locator('.nw1UBF.v1zwn25').fill('Shoes');
    await page.locator('.VDtK0l._1psv1ze2u._1psv1ze53._1psv1ze9x._1psv1ze7o').click();
    page.pause();
});