import "./ArticleFinance.scss"
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Chart, registerables} from "chart.js"
import Article from "/src/components/articles/base/Article.jsx"
import {_fileUtils} from "/src/hooks/utils/_file-utils.js"
import {useTheme} from "/src/providers/ThemeProvider.jsx"
import {useLanguage} from "/src/providers/LanguageProvider.jsx"

Chart.register(...registerables)

const FINANCE_COPY = {
    en: {
        eyebrow: "Market monitor",
        title: "Index snapshot",
        subtitle: "Track NASDAQ Composite and S&P 500 performance with trailing P/E proxy data inside the portfolio layout.",
        chartTitle: "Normalized performance",
        chartSubtitle: "Base 100 from {period1} to {period2}",
        cached: "Cached",
        snapshot: "Snapshot",
        syncing: "Syncing",
        retry: "Refresh",
        updated: "Updated",
        trailingPe: "Trailing P/E",
        previousClose: "Prev close",
        proxyNote: "via {proxy}",
        cachedNotice: "Live finance refresh failed. Showing the most recent successful data.",
        unavailable: "Finance data is currently unavailable.",
        chartEmpty: "No chart data available yet.",
        baseNote: "Yahoo Finance does not expose index P/E directly, so the dashboard uses QQQ for ^IXIC and SPY for ^GSPC.",
        price: "Price",
        performance: "Performance",
        manualRefreshRequested: "Manual refresh requested.",
        manualRefreshCompleted: "Manual refresh completed from {source}.",
        initialLoadCompleted: "Finance data loaded from {source}.",
        backgroundRefreshCompleted: "Background refresh checked from {source}.",
        snapshotUpdateDetected: "New {trigger} snapshot detected.",
        refreshFailedLog: "Refresh failed. Existing data is still on screen when available.",
        dataTimestampDetail: "Data timestamp {time}.",
        snapshotGeneratedDetail: "Snapshot generated {time}.",
        snapshotUnchangedDetail: "Snapshot timestamp unchanged at {time}.",
        triggerSchedule: "scheduled GitHub",
        triggerPush: "push deploy",
        triggerWorkflowDispatch: "manual deploy",
        triggerApi: "live API",
        triggerLocal: "local build",
        triggerUnknown: "background",
    },
    zh: {
        eyebrow: "市场观察",
        title: "指数快照",
        subtitle: "在当前作品集布局中查看纳斯达克综合指数与标普 500 的表现曲线和市盈率代理数据。",
        chartTitle: "归一化走势",
        chartSubtitle: "以 100 为基准，时间范围 {period1} 至 {period2}",
        cached: "缓存数据",
        snapshot: "静态快照",
        syncing: "同步中",
        retry: "刷新",
        updated: "更新时间",
        trailingPe: "市盈率",
        previousClose: "前收盘",
        proxyNote: "通过 {proxy}",
        cachedNotice: "实时财经刷新失败，当前显示最近一次成功获取的数据。",
        unavailable: "当前无法加载财经数据。",
        chartEmpty: "暂时没有可显示的图表数据。",
        baseNote: "Yahoo Finance 不直接提供指数市盈率，因此这里使用 QQQ 作为 ^IXIC 代理、SPY 作为 ^GSPC 代理。",
        price: "价格",
        performance: "表现",
        manualRefreshRequested: "已发起手动刷新。",
        manualRefreshCompleted: "手动刷新已完成，来源：{source}。",
        initialLoadCompleted: "财经数据已加载，来源：{source}。",
        backgroundRefreshCompleted: "后台同步已检查，来源：{source}。",
        snapshotUpdateDetected: "检测到新的 {trigger} 快照更新。",
        refreshFailedLog: "刷新失败；如有旧数据，页面会继续显示旧数据。",
        dataTimestampDetail: "数据时间：{time}。",
        snapshotGeneratedDetail: "快照生成时间：{time}。",
        snapshotUnchangedDetail: "快照时间未变化：{time}。",
        triggerSchedule: "定时 GitHub",
        triggerPush: "推送部署",
        triggerWorkflowDispatch: "手动部署",
        triggerApi: "实时接口",
        triggerLocal: "本地构建",
        triggerUnknown: "后台同步",
    }
}

function ArticleFinance({ dataWrapper }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const [overview, setOverview] = useState(null)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState(null)

    const theme = useTheme()
    const language = useLanguage()
    const mountedRef = useRef(true)
    const overviewRef = useRef(null)

    const financeConfig = dataWrapper.rawData?.tracking || {}
    const apiBase = import.meta.env.VITE_FINANCE_API_BASE?.replace(/\/$/, "")
    const liveEndpoint = financeConfig.apiEndpoint || `${apiBase || ""}/api/finance/overview`
    const fallbackEndpoint = financeConfig.fallbackEndpoint || "/data/finance/overview.json"
    const refreshIntervalMs = financeConfig.refreshIntervalMs || 0
    const shouldTryLiveApi = Boolean(financeConfig.apiEndpoint || apiBase || import.meta.env.DEV)

    const copy = useMemo(() => {
        return FINANCE_COPY[language.selectedLanguageId] || FINANCE_COPY.en
    }, [language.selectedLanguageId])

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    useEffect(() => {
        overviewRef.current = overview
    }, [overview])

    const resolveUrl = useCallback((path) => {
        if(!path)
            return path

        if(path.startsWith("http://") || path.startsWith("https://"))
            return path

        return _fileUtils.resolvePath(path)
    }, [])

    const loadJson = useCallback(async (url, fetchOptions = undefined) => {
        const response = await fetch(resolveUrl(url), fetchOptions)
        if(!response.ok)
            throw new Error(`${response.status} ${response.statusText}`)

        const data = await response.json()
        if(!data?.markets || !Array.isArray(data.markets) || data.markets.length === 0)
            throw new Error("Invalid finance payload")

        return data
    }, [resolveUrl])

    const appendActivity = useCallback((entry) => {
        const activity = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            recordedAt: new Date().toISOString(),
            ...entry
        }

        const consoleMethod = activity.tone === "error"
            ? console.error
            : activity.tone === "warning"
                ? console.warn
                : console.info

        consoleMethod("[finance-sync]", activity.message, {
            detail: activity.detail || null,
            source: activity.sourceLabel || null,
            trigger: activity.triggerLabel || null,
            runUrl: activity.runUrl || null
        })
    }, [])

    const loadOverview = useCallback(async ({ reason = "initial" } = {}) => {
        const hasOverview = Boolean(overviewRef.current)
        const previousOverview = overviewRef.current
        const previousGeneratedAt = previousOverview?.generatedAt || null

        if(mountedRef.current) {
            setLoading(!hasOverview)
            setRefreshing(hasOverview)
            setError(null)
        }

        if(reason === "manual") {
            appendActivity({
                tone: "info",
                message: copy.manualRefreshRequested
            })
        }

        try {
            if(shouldTryLiveApi) {
                const liveOverview = await loadJson(liveEndpoint, {cache: "no-store"})
                if(!mountedRef.current)
                    return

                appendActivity(createSuccessActivityEntry({
                    reason,
                    source: liveOverview.source || "live",
                    overview: liveOverview,
                    previousGeneratedAt,
                    copy,
                    languageId: language.selectedLanguageId
                }))
                setOverview(liveOverview)
                return
            }
        } catch (liveError) {
            appendActivity({
                tone: "warning",
                message: copy.cachedNotice,
                detail: liveError?.message || null
            })
        }

        try {
            const snapshotOverview = await loadJson(fallbackEndpoint, {cache: "no-store"})
            if(!mountedRef.current)
                return

            appendActivity(createSuccessActivityEntry({
                reason,
                source: "snapshot",
                overview: snapshotOverview,
                previousGeneratedAt,
                copy,
                languageId: language.selectedLanguageId
            }))
            setOverview(snapshotOverview)
        } catch (snapshotError) {
            if(!mountedRef.current)
                return

            setOverview(null)
            setError(snapshotError?.message || copy.unavailable)
            appendActivity({
                tone: "error",
                message: copy.refreshFailedLog,
                detail: snapshotError?.message || copy.unavailable
            })
        } finally {
            if(mountedRef.current) {
                setLoading(false)
                setRefreshing(false)
            }
        }
    }, [
        appendActivity,
        copy,
        fallbackEndpoint,
        language.selectedLanguageId,
        liveEndpoint,
        loadJson,
        shouldTryLiveApi
    ])

    useEffect(() => {
        loadOverview({reason: "initial"})
    }, [loadOverview])

    useEffect(() => {
        if(!refreshIntervalMs)
            return

        const intervalId = window.setInterval(() => {
            loadOverview({reason: "interval"})
        }, refreshIntervalMs)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [loadOverview, refreshIntervalMs])

    const visibleMarkets = overview?.markets?.filter((market) => {
        return Array.isArray(market?.normalizedPerformance) && market.normalizedPerformance.length > 0
    }) || []

    const isSyncing = loading || refreshing

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-finance`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}
                 forceHideTitle={true}>
            <div className={`finance-dashboard`}>
                <div className={`finance-dashboard-shell`}>
                    <div className={`finance-dashboard-header`}>
                        <div className={`finance-dashboard-heading`}>
                            <span className={`finance-dashboard-eyebrow text-2`}>{copy.eyebrow}</span>
                            <h4 className={`finance-dashboard-title mb-2`}>{copy.title}</h4>
                            <p className={`finance-dashboard-subtitle text-3 mb-0`}>{copy.subtitle}</p>
                        </div>

                        <div className={`finance-dashboard-actions`}>
                            <div className={`finance-dashboard-status-row`}>
                                {isSyncing && (
                                    <span className={`finance-status-pill finance-status-pill-loading`}>
                                        <span className={`finance-status-dot`}/>
                                        {copy.syncing}
                                    </span>
                                )}

                                <button className={`finance-refresh-button`}
                                        type={`button`}
                                        onClick={() => loadOverview({reason: "manual"})}
                                        disabled={isSyncing}>
                                    <i className={`fa-solid fa-rotate-right`}/>
                                    <span>{copy.retry}</span>
                                </button>
                            </div>

                            {overview?.generatedAt && (
                                <div className={`finance-dashboard-timestamp text-2`}>
                                    <span>{copy.updated}</span>
                                    <strong>{formatTimestamp(overview.generatedAt, language.selectedLanguageId)}</strong>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <FinanceBanner tone={`error`} text={error}/>
                    )}

                    {loading && !overview && (
                        <FinanceLoadingState/>
                    )}

                    {!loading && overview && (
                        <>
                            <div className={`finance-market-grid`}>
                                {overview.markets.map((market) => (
                                    <FinanceMetricCard key={market.symbol}
                                                       market={market}
                                                       copy={copy}/>
                                ))}
                            </div>

                            <div className={`finance-chart-panel`}>
                                <div className={`finance-chart-panel-header`}>
                                    <div className={`finance-chart-panel-copy`}>
                                        <h5 className={`mb-1`}>{copy.chartTitle}</h5>
                                        <p className={`finance-chart-panel-subtitle text-3 mb-0`}>
                                            {copy.chartSubtitle
                                                .replace("{period1}", overview.period1 || "N/A")
                                                .replace("{period2}", overview.period2 || "N/A")}
                                        </p>
                                    </div>

                                    <div className={`finance-chart-legend`}>
                                        {visibleMarkets.map((market) => (
                                            <div className={`finance-chart-legend-item text-2`}
                                                 key={market.symbol}>
                                                <span className={`finance-chart-legend-swatch`}
                                                      style={{backgroundColor: market.color}}/>
                                                <span>{market.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {visibleMarkets.length > 0 ? (
                                    <FinanceChart markets={visibleMarkets}
                                                  languageId={language.selectedLanguageId}
                                                  themeId={theme.getSelectedTheme()?.id}/>
                                ) : (
                                    <div className={`finance-chart-empty text-3`}>
                                        {copy.chartEmpty}
                                    </div>
                                )}
                            </div>

                            <div className={`finance-footer-note text-2`}>
                                <i className={`fa-solid fa-circle-info`}/>
                                <span>{copy.baseNote}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Article>
    )
}

function FinanceBanner({ tone, text }) {
    return (
        <div className={`finance-banner finance-banner-${tone}`}>
            <i className={`fa-solid ${tone === "error" ? "fa-triangle-exclamation" : "fa-circle-info"}`}/>
            <span>{text}</span>
        </div>
    )
}

function FinanceLoadingState() {
    return (
        <div className={`finance-loading-state`}>
            <div className={`finance-loading-card`}/>
            <div className={`finance-loading-card`}/>
            <div className={`finance-loading-chart`}/>
        </div>
    )
}

function FinanceMetricCard({ market, copy }) {
    const changeDirection = market.change >= 0 ? "positive" : "negative"

    return (
        <div className={`finance-metric-card`}>
            <div className={`finance-metric-card-header`}>
                <div>
                    <div className={`finance-metric-card-symbol text-2`}>
                        {market.name}
                    </div>
                    <h5 className={`finance-metric-card-name mb-0`}>
                        {market.displaySymbol || market.symbol}
                    </h5>
                </div>

                <span className={`finance-metric-card-icon`}
                      style={{color: market.color}}>
                    <i className={`fa-solid fa-chart-line`}/>
                </span>
            </div>

            <div className={`finance-metric-card-price-row`}>
                <div className={`finance-metric-card-price-block`}>
                    <span className={`finance-metric-label text-2`}>{copy.price}</span>
                    <div className={`finance-metric-card-price`}>
                        {formatNumber(market.price)}
                    </div>
                </div>

                <div className={`finance-metric-card-pe-block`}>
                    <span className={`finance-metric-label text-2`}>{copy.trailingPe}</span>
                    <div className={`finance-metric-card-pe`}>
                        {formatNumber(market.trailingPE)}
                    </div>
                    <span className={`finance-metric-card-proxy text-2`}>
                        {copy.proxyNote.replace("{proxy}", market.peProxy || "N/A")}
                    </span>
                </div>
            </div>

            <div className={`finance-metric-card-footer`}>
                <div className={`finance-metric-card-change finance-metric-card-change-${changeDirection}`}>
                    <i className={`fa-solid ${changeDirection === "positive" ? "fa-arrow-trend-up" : "fa-arrow-trend-down"}`}/>
                    <span>{formatSignedNumber(market.change)}</span>
                    <span>{formatSignedPercent(market.changePercent)}</span>
                </div>

                <div className={`finance-metric-card-close text-2`}>
                    <span>{copy.previousClose}</span>
                    <strong>{formatNumber(market.previousClose)}</strong>
                </div>
            </div>
        </div>
    )
}

function FinanceChart({ markets, languageId, themeId }) {
    const canvasRef = useRef(null)
    const chartRef = useRef(null)

    useEffect(() => {
        if(!canvasRef.current || markets.length === 0)
            return

        const cssVariables = window.getComputedStyle(document.documentElement)
        const textColor = cssVariables.getPropertyValue("--theme-texts-light-2").trim() || "#7a7a7a"
        const gridColor = cssVariables.getPropertyValue("--theme-standard-borders-3").trim() || "rgba(128, 128, 128, 0.15)"
        const tooltipBackground = cssVariables.getPropertyValue("--theme-pop-ups-background").trim() || "#101010"
        const tooltipText = cssVariables.getPropertyValue("--theme-texts").trim() || "#eeeeee"

        const labels = markets[0].normalizedPerformance.map((point) => point.x)
        const datasets = markets.map((market) => {
            return {
                label: `${market.name} (${market.displaySymbol || market.symbol})`,
                data: market.normalizedPerformance.map((point) => point.y),
                borderColor: market.color,
                backgroundColor: `${market.color}20`,
                borderWidth: 2.5,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointHitRadius: 16,
                fill: false,
                tension: 0.22,
            }
        })

        chartRef.current?.destroy()
        chartRef.current = new Chart(canvasRef.current, {
            type: "line",
            data: {
                labels,
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                interaction: {
                    mode: "index",
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: tooltipBackground,
                        titleColor: tooltipText,
                        bodyColor: tooltipText,
                        borderColor: gridColor,
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            title: (items) => {
                                return formatAxisDate(items[0]?.label, languageId)
                            },
                            label: (context) => {
                                return `${context.dataset.label}: ${formatNumber(context.parsed.y)}`
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColor,
                            autoSkip: true,
                            maxTicksLimit: 7,
                            callback: (_, index) => formatAxisTick(labels[index], languageId)
                        },
                        grid: {
                            color: gridColor,
                            drawBorder: false
                        },
                        border: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            color: textColor,
                            callback: (value) => formatNumber(value)
                        },
                        grid: {
                            color: gridColor,
                            drawBorder: false
                        },
                        border: {
                            display: false
                        }
                    }
                }
            }
        })

        return () => {
            chartRef.current?.destroy()
            chartRef.current = null
        }
    }, [languageId, markets, themeId])

    return (
        <div className={`finance-chart-canvas-wrapper`}>
            <canvas ref={canvasRef}/>
        </div>
    )
}

function formatNumber(value) {
    if(value === null || value === undefined || Number.isNaN(Number(value)))
        return "N/A"

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(value))
}

function formatSignedNumber(value) {
    if(value === null || value === undefined || Number.isNaN(Number(value)))
        return "N/A"

    const cast = Number(value)
    const prefix = cast > 0 ? "+" : ""
    return `${prefix}${formatNumber(cast)}`
}

function formatSignedPercent(value) {
    if(value === null || value === undefined || Number.isNaN(Number(value)))
        return "N/A"

    const cast = Number(value)
    const prefix = cast > 0 ? "+" : ""
    return `${prefix}${formatNumber(cast)}%`
}

function formatTimestamp(value, languageId = "en") {
    try {
        const date = new Date(value)
        return new Intl.DateTimeFormat(languageId, {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }).format(date)
    } catch (error) {
        return value
    }
}

function formatAxisTick(value, languageId = "en") {
    if(!value)
        return ""

    try {
        const date = new Date(value)
        return new Intl.DateTimeFormat(languageId, {
            month: "short",
            year: "2-digit"
        }).format(date)
    } catch (error) {
        return value
    }
}

function formatAxisDate(value, languageId = "en") {
    if(!value)
        return ""

    try {
        const date = new Date(value)
        return new Intl.DateTimeFormat(languageId, {
            year: "numeric",
            month: "short",
            day: "numeric"
        }).format(date)
    } catch (error) {
        return value
    }
}

function createSuccessActivityEntry({
    reason,
    source,
    overview,
    previousGeneratedAt,
    copy,
    languageId
}) {
    const sourceLabel = resolveSourceLabel(source, copy)
    const triggerLabel = resolveTriggerLabel(overview?.sync?.trigger, copy)
    const generatedAtChanged = previousGeneratedAt !== overview?.generatedAt
    const detail = buildActivityDetail({
        source,
        generatedAt: overview?.generatedAt,
        generatedAtChanged,
        copy,
        languageId
    })

    let message = copy.backgroundRefreshCompleted.replace("{source}", sourceLabel)
    let tone = "info"

    if(reason === "manual") {
        message = copy.manualRefreshCompleted.replace("{source}", sourceLabel)
        tone = source === "cached" ? "warning" : "success"
    } else if(reason === "initial") {
        message = copy.initialLoadCompleted.replace("{source}", sourceLabel)
    } else if(source === "snapshot" && generatedAtChanged) {
        message = copy.snapshotUpdateDetected.replace("{trigger}", triggerLabel || sourceLabel)
        tone = "success"
    } else if(source === "cached") {
        tone = "warning"
    }

    return {
        tone,
        message,
        detail,
        sourceLabel,
        triggerLabel: source === "snapshot" ? triggerLabel : null,
        runUrl: overview?.sync?.runUrl || null
    }
}

function buildActivityDetail({
    source,
    generatedAt,
    generatedAtChanged,
    copy,
    languageId
}) {
    if(!generatedAt)
        return null

    const timestamp = formatTimestamp(generatedAt, languageId)
    if(source === "snapshot") {
        return generatedAtChanged
            ? copy.snapshotGeneratedDetail.replace("{time}", timestamp)
            : copy.snapshotUnchangedDetail.replace("{time}", timestamp)
    }

    return copy.dataTimestampDetail.replace("{time}", timestamp)
}

function resolveSourceLabel(source, copy) {
    if(source === "cached")
        return copy.cached

    if(source === "snapshot")
        return copy.snapshot

    return "API"
}

function resolveTriggerLabel(trigger, copy) {
    switch (trigger) {
        case "schedule":
            return copy.triggerSchedule
        case "push":
            return copy.triggerPush
        case "workflow_dispatch":
            return copy.triggerWorkflowDispatch
        case "api":
            return copy.triggerApi
        case "local":
            return copy.triggerLocal
        default:
            return trigger ? trigger.replace(/_/g, " ") : copy.triggerUnknown
    }
}

function resolveActivityIcon(tone) {
    switch (tone) {
        case "success":
            return "fa-circle-check"
        case "warning":
            return "fa-clock-rotate-left"
        case "error":
            return "fa-triangle-exclamation"
        default:
            return "fa-arrows-rotate"
    }
}

export default ArticleFinance
