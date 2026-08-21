class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/auth/login',
            { data: this.loginPayLoad }
        );
        if (!loginResponse.ok()) {
            throw new Error(`API login failed with status ${loginResponse.status()}`);
        }
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad) {
        const token = await this.getToken();
        const orderResponse = await this.apiContext.post(
            'https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: orderPayLoad,
                headers: {
                    Authorization: token,
                },
            }
        );
        if (!orderResponse.ok()) {
            throw new Error(`API order creation failed with status ${orderResponse.status()}`);
        }
        const orderResponseJson = await orderResponse.json();
        return {
            token,
            orderId: orderResponseJson.orders[0],
        };
    }
}

module.exports = { APiUtils };
