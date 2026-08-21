const {test,expect} = require("@playwright/test");

test("Calender Validation", async ({page}) =>
{
    const Monthnumber = 6;
    const date = 15;
    const year= 2027;
    const expectedList = [Monthnumber,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(Monthnumber)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const input = await page.locator(".react-date-picker__inputGroup input");
    /*const DD = await page.getByText("Delivary Date");
    console.log(expectedList);*/
    
    for(let i=0; i<input.length; i++)
    {
        const value =input[i].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }        
    
});
