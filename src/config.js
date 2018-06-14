const dev = {
    API_URL: "http://localhost:4000",
}

const prod = {
    API_URL: "https://api.dfirreview.com",
}

const config = (process.env.NODE_ENV === 'production') ? prod : dev;

export default {
    COINBASE_COMMERCE_URL: "https://commerce.coinbase.com/checkout/31d28fb6-22aa-47ea-8399-362e34c9ee3d",
    ...config
};