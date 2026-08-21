const{test, expect} = require("@playwright/test")

test.describe.configure({mode: 'parallel'})
test("Home page test", async({browser}) =>
{
     const context = await browser.newContext();
     const page = await context.newPage();

     await page.goto("https://www.agoda.com/");
     const searchdropdown = await page.locator('#autocomplete-box').fill("Bangalore");  
     await  searchdropdown.selectOption("banglore");
    
})