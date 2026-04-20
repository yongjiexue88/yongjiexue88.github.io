import YahooFinance from "yahoo-finance2";

export const DEFAULT_PERIOD1 = "2024-01-01"
export const DEFAULT_INTERVAL = "1d"

export const INTERVAL_MAX_DAYS = {
    "1m": 7,
    "5m": 60,
    "1h": 730,
    "1d": 3650,
    "1wk": 3650,
    "1mo": 3650,
}

export const DEFAULT_MARKETS = [
    {
        symbol: "^IXIC",
        displaySymbol: "IXIC",
        name: "NASDAQ Composite",
        color: "#269366",
        peProxy: "QQQ"
    },
    {
        symbol: "^GSPC",
        displaySymbol: "GSPC",
        name: "S&P 500",
        color: "#d09a2d",
        peProxy: "SPY"
    }
]

const yahooFinance = new YahooFinance({
    suppressNotices: ["yahooSurvey", "ripHistorical"]
})

export async function fetchQuotesData(markets = DEFAULT_MARKETS) {
    const quoteRequests = markets.map((market) => yahooFinance.quote(market.symbol))
    const summaryRequests = markets.map((market) => yahooFinance.quoteSummary(market.peProxy, {modules: ["summaryDetail"]}))

    const [quotes, summaries] = await Promise.all([
        Promise.all(quoteRequests),
        Promise.all(summaryRequests)
    ])

    return markets.map((market, index) => {
        const quote = quotes[index]
        const summary = summaries[index]

        return {
            ...market,
            price: roundNumber(quote?.regularMarketPrice),
            change: roundNumber(quote?.regularMarketChange),
            changePercent: roundNumber(quote?.regularMarketChangePercent),
            previousClose: roundNumber(quote?.regularMarketPreviousClose),
            trailingPE: roundNumber(summary?.summaryDetail?.trailingPE)
        }
    })
}

export async function fetchHistoricalData(symbol, {
    period1 = DEFAULT_PERIOD1,
    period2 = getCurrentIsoDate(),
    interval = DEFAULT_INTERVAL
} = {}) {
    const rows = await yahooFinance.historical(symbol, {
        period1,
        period2,
        interval
    })

    return rows
        .filter((row) => row?.date && typeof row?.close === "number")
        .map((row) => ({
            x: toIsoDateString(row.date),
            y: roundNumber(row.close)
        }))
}

export async function fetchFinanceOverview({
    period1 = DEFAULT_PERIOD1,
    period2 = getCurrentIsoDate(),
    markets = DEFAULT_MARKETS
} = {}) {
    const [quoteData, historicalData] = await Promise.all([
        fetchQuotesData(markets),
        Promise.all(markets.map((market) => fetchHistoricalData(market.symbol, {
            period1,
            period2,
            interval: DEFAULT_INTERVAL
        })))
    ])

    const marketsWithPerformance = quoteData.map((market, index) => {
        const normalizedPerformance = normalizePerformance(historicalData[index])

        return {
            ...market,
            normalizedPerformance
        }
    })

    return {
        generatedAt: new Date().toISOString(),
        period1,
        period2,
        markets: marketsWithPerformance
    }
}

export function getCurrentIsoDate() {
    return toIsoDateString(new Date())
}

export function resolvePeriod1FromInterval(interval = DEFAULT_INTERVAL) {
    const maxDays = INTERVAL_MAX_DAYS[interval] ?? 365
    return toIsoDateString(new Date(Date.now() - maxDays * 86400000))
}

function normalizePerformance(points = []) {
    const firstValue = points[0]?.y
    if(!firstValue)
        return []

    return points.map((point) => ({
        x: point.x,
        y: roundNumber((point.y / firstValue) * 100)
    }))
}

function roundNumber(value, precision = 2) {
    if(value === null || value === undefined || Number.isNaN(Number(value)))
        return null

    return Number(Number(value).toFixed(precision))
}

function toIsoDateString(value) {
    const date = value instanceof Date ? value : new Date(value)
    return date.toISOString().slice(0, 10)
}
