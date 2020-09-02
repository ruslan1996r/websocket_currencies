export class Fetch {
    static baseUrl = "http://localhost:8000/path?path="

    static allInstruments = async () => {
        const res = await fetch(`${this.baseUrl}/api/v1/instrument/active`).then(r => r.json())
        return res.map(i => ({
            symbol: i.symbol,
            lastPrice: i.lastPrice
        }))

    }
    static quotesHistory = async (symbol) => {
        console.log(symbol, "symbol?");
        const res = await fetch(`${this.baseUrl}/api/v1/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`)
            .then(r => r.json())
        return res.map(i => ({
            timestamp: i.timestamp,
            open: i.open,
            high: i.high,
            low: i.low,
            close: i.close,
            grossValue: i.trades
        }))
    }
    static createOrder = async (order) => {
        const res = await fetch(`${this.baseUrl}/api/v1/order`, { method: "POST", body: order })
            .then(r => r.json())
        return res
    }
    static ordersHistory = async () => {
        const res = await fetch(`${this.baseUrl}/api/v1/order`).then(r => r.json())
        return res
    }
}