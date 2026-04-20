import express from "express";
import {existsSync, readFileSync} from "fs";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {
    DEFAULT_PERIOD1,
    fetchFinanceOverview,
    fetchHistoricalData,
    fetchQuotesData,
    resolvePeriod1FromInterval
} from "./marketData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT || 3001)
const cache = new Map()
const overviewSnapshotPath = resolve(__dirname, "../../public/data/finance/overview.json")

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    if(req.method === "OPTIONS") {
        res.status(204).end()
        return
    }

    next()
})

app.get("/api/quotes", async (req, res) => {
    try {
        const payload = await withCache("quotes", 5 * 60 * 1000, async () => {
            return fetchQuotesData()
        })

        res.json(payload)
    } catch (error) {
        res.status(500).json({error: error?.message || "Unable to load quote data"})
    }
})

app.get("/api/historical", async (req, res) => {
    const symbol = String(req.query.symbol || "^GSPC")
    const interval = String(req.query.interval || "1d")
    const period1 = resolvePeriod1FromInterval(interval)

    try {
        const payload = await withCache(`historical:${symbol}:${interval}:${period1}`, 30 * 60 * 1000, async () => {
            return fetchHistoricalData(symbol, {
                period1,
                interval
            })
        })

        res.json(payload)
    } catch (error) {
        res.status(500).json({error: error?.message || "Unable to load historical data"})
    }
})

app.get("/api/finance/overview", async (req, res) => {
    const period1 = String(req.query.period1 || DEFAULT_PERIOD1)

    try {
        const payload = await withCache(`overview:${period1}`, 15 * 60 * 1000, async () => {
            const overview = await fetchFinanceOverview({period1})

            return {
                ...overview,
                source: "live"
            }
        }, async ({cachedValue}) => {
            if(cachedValue) {
                return {
                    ...cachedValue,
                    source: "cached"
                }
            }

            const snapshot = readOverviewSnapshot(period1)
            if(snapshot) {
                return {
                    ...snapshot,
                    source: "snapshot"
                }
            }

            return undefined
        })

        res.json(payload)
    } catch (error) {
        res.status(500).json({error: error?.message || "Unable to load finance overview"})
    }
})

app.listen(port, () => {
    console.log(`Finance API running on http://localhost:${port}`)
})

async function withCache(key, ttlMs, loader, fallback = null) {
    const now = Date.now()
    const cached = cache.get(key)

    if(cached && cached.expiresAt > now)
        return cached.value

    let value
    try {
        value = await loader()
    } catch (error) {
        if(fallback) {
            const fallbackValue = await fallback({
                cachedValue: cached?.value ?? null,
                error
            })

            if(fallbackValue !== undefined) {
                cache.set(key, {
                    value: fallbackValue,
                    expiresAt: now + Math.min(ttlMs, 60 * 1000)
                })

                return fallbackValue
            }
        }

        throw error
    }

    cache.set(key, {
        value,
        expiresAt: now + ttlMs
    })

    return value
}

function readOverviewSnapshot(period1) {
    if(!existsSync(overviewSnapshotPath))
        return null

    try {
        const snapshot = JSON.parse(readFileSync(overviewSnapshotPath, "utf-8"))
        if(!snapshot?.markets || !Array.isArray(snapshot.markets) || snapshot.markets.length === 0)
            return null

        if(period1 && snapshot.period1 && snapshot.period1 !== period1)
            return null

        return snapshot
    } catch {
        return null
    }
}
