const { Given, when, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect} = require('@playwright/test');
const {playwright} = require('@playwright/test');

Given('Login to Ecommerse application with {string} And {string}', {timeout: 100*1000}, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const browser = playwright.chromium.launch()
    const context = await browser.newContext();
    const page = await Context.newPage();
    this.poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const products = page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

});

When('Add {string} to cart', async function (productName) 
{
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} added to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Enter the valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
});

Then('Verify the order is present in OrderHistory page', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});