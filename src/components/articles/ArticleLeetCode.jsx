import "./ArticleLeetCode.scss"
import React, {useEffect, useState, useMemo, useCallback} from 'react'
import Article from "/src/components/articles/base/Article.jsx"

const LEETCODE_API_BASE = "https://alfa-leetcode-api.onrender.com"

/**
 * @param {ArticleDataWrapper} dataWrapper
 * @param {Number} id
 * @return {JSX.Element}
 * @constructor
 */
function ArticleLeetCode({ dataWrapper, id }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)
    const [liveData, setLiveData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Get config from JSON (username + fallback data)
    const trackingConfig = dataWrapper.rawData?.tracking || {}
    const username = trackingConfig.username || ""
    const profileUrl = trackingConfig.profileUrl || `https://leetcode.com/u/${username}`

    // Fallback to static JSON data if API fails
    const fallbackData = trackingConfig
    const [selectedNote, setSelectedNote] = useState(null)

    const fetchLeetCodeData = useCallback(async () => {
        if (!username) {
            setError("No LeetCode username configured")
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        try {
            // Fetch solved stats and recent submissions in parallel
            const [solvedRes, submissionRes, calendarRes] = await Promise.allSettled([
                fetch(`${LEETCODE_API_BASE}/${username}/solved`),
                fetch(`${LEETCODE_API_BASE}/${username}/submission?limit=20`),
                fetch(`${LEETCODE_API_BASE}/${username}/calendar`)
            ])

            const solved = solvedRes.status === 'fulfilled' ? await solvedRes.value.json() : null
            const submissions = submissionRes.status === 'fulfilled' ? await submissionRes.value.json() : null
            const calendar = calendarRes.status === 'fulfilled' ? await calendarRes.value.json() : null

            // Check if the user was found
            if (solved?.errors && solved?.data?.matchedUser === null) {
                throw new Error(`LeetCode user "${username}" not found`)
            }

            // Parse solved stats
            const stats = parseSolvedStats(solved)

            // Parse recent submissions into problem list
            const recentProblems = parseSubmissions(submissions, fallbackData)

            // Parse submission calendar into heatmap
            const activity = parseCalendar(calendar)

            setLiveData({
                stats,
                recentProblems,
                activity,
                streakDays: calendar?.data?.matchedUser?.userCalendar?.streak || trackingConfig.streakDays || 0
            })
        } catch (err) {
            console.warn("LeetCode API fetch failed, using fallback data:", err.message)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [username])

    useEffect(() => {
        fetchLeetCodeData()
    }, [fetchLeetCodeData])

    // Use live data if available, otherwise fall back to static JSON
    const displayData = useMemo(() => {
        if (liveData) {
            return {
                stats: liveData.stats,
                streakDays: liveData.streakDays,
                activity: liveData.activity,
                recentProblems: liveData.recentProblems,
                notes: fallbackData.notes || {},
                profileUrl
            }
        }
        // Fallback to static JSON data
        return {
            stats: fallbackData.stats || { easy: 0, medium: 0, hard: 0, totalSolved: 0, totalAttempted: 0 },
            streakDays: fallbackData.streakDays || 0,
            activity: fallbackData.activity || [],
            recentProblems: fallbackData.recentProblems || [],
            notes: fallbackData.notes || {},
            profileUrl
        }
    }, [liveData, fallbackData, profileUrl])

    // Close modal on escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedNote(null)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-leetcode`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}
                 forceHideTitle={true}>
            <div className="leetcode-dashboard">
                {/* Header Bar */}
                <div className="leetcode-header">
                    <div className="leetcode-header-left">
                        <i className="fa-solid fa-terminal leetcode-header-icon"/>
                        <span className="leetcode-header-title">LeetCode Tracker</span>
                        <span className={`leetcode-status-badge ${liveData ? 'leetcode-status-live' : ''}`}>
                            <span className="leetcode-status-dot"/>
                            {loading ? 'SYNCING...' : liveData ? 'LIVE' : 'OFFLINE'}
                        </span>
                    </div>
                    <div className="leetcode-header-right">
                        {error && !liveData && (
                            <button className="leetcode-retry-btn" onClick={fetchLeetCodeData} title="Retry sync">
                                <i className="fa-solid fa-rotate-right"/>
                            </button>
                        )}
                        <span className="leetcode-timestamp">
                            @{username || 'not configured'}
                        </span>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="leetcode-loading">
                        <div className="leetcode-loading-bar"/>
                        <span>Fetching data from LeetCode...</span>
                    </div>
                )}

                {/* Stats Overview */}
                {!loading && (
                    <>
                        <div className="leetcode-stats-row">
                            <LeetCodeStatCard 
                                label="Streak" 
                                value={displayData.streakDays} 
                                suffix="days" 
                                icon="fa-solid fa-fire"
                                accentColor="var(--lc-accent)"
                            />
                            <LeetCodeStatCard 
                                label="Solved" 
                                value={displayData.stats.totalSolved}
                                suffix={`/ ${displayData.stats.totalAttempted}`}
                                icon="fa-solid fa-check-double"
                                accentColor="var(--lc-accent)"
                            />
                            <LeetCodeStatCard 
                                label="Easy" 
                                value={displayData.stats.easy} 
                                icon="fa-solid fa-circle-check"
                                accentColor="#00b8a3"
                            />
                            <LeetCodeStatCard 
                                label="Medium" 
                                value={displayData.stats.medium} 
                                icon="fa-solid fa-star-half-stroke"
                                accentColor="#ffc01e"
                            />
                            <LeetCodeStatCard 
                                label="Hard" 
                                value={displayData.stats.hard} 
                                icon="fa-solid fa-fire"
                                accentColor="#ef4743"
                            />
                        </div>

                        {/* Activity Heatmap */}
                        <div className="leetcode-section-panel">
                            <div className="leetcode-panel-header">
                                <i className="fa-solid fa-chart-bar"/>
                                <span>Activity Heatmap</span>
                                <span className="leetcode-panel-sub">
                                    {displayData.activity.length} weeks tracked
                                </span>
                            </div>
                            <LeetCodeHeatmap activity={displayData.activity} />
                        </div>

                        {/* Recent Problems */}
                        <div className="leetcode-section-panel">
                            <div className="leetcode-panel-header">
                                <i className="fa-solid fa-list-check"/>
                                <span>Recent Submissions</span>
                                <span className="leetcode-panel-sub">
                                    {liveData ? 'Live from LeetCode' : 'From local data'}
                                </span>
                            </div>
                            <div className="leetcode-problems-list">
                                {displayData.recentProblems.map((problem, idx) => {
                                    const note = displayData.notes[problem.name]
                                    return (
                                        <LeetCodeProblemRow 
                                            key={idx} 
                                            problem={problem} 
                                            note={note}
                                            onClick={note ? () => setSelectedNote({ problemName: problem.name, ...note }) : undefined}
                                        />
                                    )
                                })}
                                {displayData.recentProblems.length === 0 && (
                                    <div className="leetcode-empty-state">
                                        <i className="fa-solid fa-code"/>
                                        <span>No recent submissions</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Link */}
                        <a href={displayData.profileUrl} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="leetcode-profile-link">
                            <i className="fa-solid fa-arrow-up-right-from-square"/>
                            <span>View Full LeetCode Profile</span>
                            <span className="leetcode-profile-link-arrow">&gt;&gt;</span>
                        </a>
                    </>
                )}

                {/* Note Modal Overlay */}
                {selectedNote && (
                    <LeetCodeNoteModal 
                        note={selectedNote} 
                        onClose={() => setSelectedNote(null)} 
                    />
                )}
            </div>
        </Article>
    )
}

// ─── API Data Parsers ─────────────────────────────────────────────

function parseSolvedStats(data) {
    if (!data) {
        return { easy: 0, medium: 0, hard: 0, totalSolved: 0, totalAttempted: 0 }
    }

    // alfa-leetcode-api /solved endpoint returns flat fields
    if (data.solvedProblem !== undefined) {
        const totalQuestions = data.totalSubmissionNum?.find(s => s.difficulty === 'All')?.count || 0
        return {
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            totalSolved: data.solvedProblem || 0,
            totalAttempted: totalQuestions
        }
    }

    // Fallback: nested GraphQL-style response
    const acSubmissions = data.data?.matchedUser?.submitStats?.acSubmissionNum || []
    const allQuestions = data.data?.allQuestionsCount || []

    let easy = 0, medium = 0, hard = 0, totalSolved = 0
    acSubmissions.forEach(item => {
        if (item.difficulty === 'Easy') easy = item.count
        else if (item.difficulty === 'Medium') medium = item.count
        else if (item.difficulty === 'Hard') hard = item.count
        else if (item.difficulty === 'All') totalSolved = item.count
    })

    let totalQuestions = 0
    allQuestions.forEach(item => {
        if (item.difficulty === 'All') totalQuestions = item.count
    })

    return { easy, medium, hard, totalSolved, totalAttempted: totalQuestions }
}

function parseSubmissions(data, fallbackData = {}) {
    const submissions = data?.data?.recentSubmissionList || data?.submission || []
    const staticProblems = fallbackData.recentProblems || []
    const notes = fallbackData.notes || {}
    
    // Create a map to combine data
    const mergedMap = new Map()

    // 1. Add static fallback data
    for (const sub of staticProblems) {
        if (sub.name) {
            mergedMap.set(sub.name, { 
                id: sub.id || null,
                name: sub.name,
                difficulty: sub.difficulty || '',
                status: sub.status || 'solved',
                tags: sub.tags || [],
                timestamp: sub.timestamp || '',
                retention: sub.retention
            })
        }
    }

    // 2. Add properties for any problem that has notes
    for (const noteName of Object.keys(notes)) {
        if (!mergedMap.has(noteName)) {
            mergedMap.set(noteName, {
                id: null,
                name: noteName,
                difficulty: '',
                status: 'solved',
                tags: [],
                timestamp: ''
            })
        }
    }

    // 3. Keep track of live submission order
    const liveOrder = []
    
    for (const sub of submissions) {
        const title = sub.title || sub.titleSlug || ''
        if (!title) continue
        
        if (!liveOrder.includes(title)) {
            liveOrder.push(title)
        }

        const timestamp = sub.timestamp ? new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString() : ''
        const status = sub.statusDisplay === 'Accepted' ? 'solved' : 'attempted'
        
        if (mergedMap.has(title)) {
            const existing = mergedMap.get(title)
            if (!existing.timestamp) existing.timestamp = timestamp
            existing.status = status
            if (sub.difficulty && !existing.difficulty) existing.difficulty = sub.difficulty
        } else {
            mergedMap.set(title, {
                id: null,
                name: title,
                difficulty: sub.difficulty || '',
                status,
                tags: [],
                timestamp
            })
        }
    }

    // Construct final array prioritizing live order first
    const finalProblems = []
    
    for (const title of liveOrder) {
        finalProblems.push(mergedMap.get(title))
        mergedMap.delete(title) 
    }
    
    // Next, cleanly push all the older pinned problems
    const remaining = Array.from(mergedMap.values())
    // Sort the older ones alphabetically
    remaining.sort((a, b) => a.name.localeCompare(b.name))
    
    finalProblems.push(...remaining)

    return finalProblems
}

function parseCalendar(data) {
    // alfa-leetcode-api may return submissionCalendar directly or nested
    let calendarStr = data?.submissionCalendar || data?.data?.matchedUser?.userCalendar?.submissionCalendar
    if (!calendarStr) return []

    try {
        const calendarObj = typeof calendarStr === 'string' ? JSON.parse(calendarStr) : calendarStr
        const entries = Object.entries(calendarObj)
            .map(([ts, count]) => ({ date: new Date(parseInt(ts) * 1000), count }))
            .sort((a, b) => a.date - b.date)

        if (entries.length === 0) return []

        // Build a 26-week (6 month) heatmap
        const now = new Date()
        const startDate = new Date(now)
        startDate.setDate(startDate.getDate() - (26 * 7))

        const weeks = []
        let currentDate = new Date(startDate)
        // Align to Sunday
        currentDate.setDate(currentDate.getDate() - currentDate.getDay())

        const countMap = {}
        entries.forEach(e => {
            const key = e.date.toISOString().split('T')[0]
            countMap[key] = e.count
        })

        for (let w = 0; w < 26; w++) {
            const week = []
            for (let d = 0; d < 7; d++) {
                const key = currentDate.toISOString().split('T')[0]
                const count = countMap[key] || 0
                // Map count to intensity level (0-4)
                let intensity = 0
                if (count >= 4) intensity = 4
                else if (count >= 3) intensity = 3
                else if (count >= 2) intensity = 2
                else if (count >= 1) intensity = 1
                week.push(intensity)
                currentDate.setDate(currentDate.getDate() + 1)
            }
            weeks.push(week)
        }

        return weeks
    } catch {
        return []
    }
}

// ─── Sub-Components ───────────────────────────────────────────────

function LeetCodeStatCard({ label, value, suffix, icon, accentColor }) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const numValue = parseInt(value) || 0
        if (numValue === 0) {
            setDisplayValue(0)
            return
        }
        
        let start = 0
        const duration = 1200
        const stepTime = Math.max(Math.floor(duration / numValue), 20)
        
        const timer = setInterval(() => {
            start += 1
            setDisplayValue(start)
            if (start >= numValue) clearInterval(timer)
        }, stepTime)
        
        return () => clearInterval(timer)
    }, [value])

    return (
        <div className="leetcode-stat-card">
            <div className="leetcode-stat-icon" style={{ color: accentColor }}>
                <i className={icon}/>
            </div>
            <div className="leetcode-stat-value" style={{ color: accentColor }}>
                {displayValue}
                {suffix && <span className="leetcode-stat-suffix">{suffix}</span>}
            </div>
            <div className="leetcode-stat-label">{label}</div>
        </div>
    )
}

function LeetCodeHeatmap({ activity }) {
    const weeks = useMemo(() => {
        if (activity.length > 0) return activity
        const generated = []
        for (let w = 0; w < 26; w++) {
            const week = []
            for (let d = 0; d < 7; d++) {
                week.push(0)
            }
            generated.push(week)
        }
        return generated
    }, [activity])

    return (
        <div className="leetcode-heatmap">
            <div className="leetcode-heatmap-grid">
                {weeks.map((week, wIdx) => (
                    <div className="leetcode-heatmap-week" key={wIdx}>
                        {week.map((intensity, dIdx) => (
                            <div 
                                key={dIdx}
                                className={`leetcode-heatmap-cell leetcode-heatmap-level-${intensity}`}
                                title={`Week ${wIdx + 1}, Day ${dIdx + 1}: ${intensity} problem${intensity !== 1 ? 's' : ''}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div className="leetcode-heatmap-legend">
                <span className="leetcode-heatmap-legend-label">Less</span>
                <div className="leetcode-heatmap-cell leetcode-heatmap-level-0"/>
                <div className="leetcode-heatmap-cell leetcode-heatmap-level-1"/>
                <div className="leetcode-heatmap-cell leetcode-heatmap-level-2"/>
                <div className="leetcode-heatmap-cell leetcode-heatmap-level-3"/>
                <div className="leetcode-heatmap-cell leetcode-heatmap-level-4"/>
                <span className="leetcode-heatmap-legend-label">More</span>
            </div>
        </div>
    )
}

function LeetCodeProblemRow({ problem, note, onClick }) {
    const difficultyClass = `leetcode-difficulty-${problem.difficulty?.toLowerCase() || 'easy'}`
    const statusIcon = problem.status === 'solved' 
        ? 'fa-solid fa-circle-check' 
        : problem.status === 'attempted'
        ? 'fa-solid fa-circle-half-stroke'
        : 'fa-regular fa-circle'

    return (
        <div className={`leetcode-problem-row ${note ? 'leetcode-problem-row-clickable' : ''}`} onClick={onClick}>
            <div className="leetcode-problem-status">
                <i className={statusIcon}/>
            </div>
            <div className="leetcode-problem-info">
                {problem.id && <span className="leetcode-problem-id">#{problem.id}</span>}
                <span className="leetcode-problem-name">{problem.name}</span>
                {note && (
                    <span className="leetcode-problem-note-icon" title="Notes Available">
                        <i className="fa-solid fa-note-sticky" />
                    </span>
                )}
            </div>
            <div className="leetcode-problem-meta">
                {problem.tags && problem.tags.map((tag, idx) => (
                    <span key={idx} className="leetcode-problem-tag">{tag}</span>
                ))}
                {problem.difficulty && (
                    <span className={`leetcode-difficulty-badge ${difficultyClass}`}>
                        {problem.difficulty}
                    </span>
                )}
            </div>
            {problem.timestamp && (
                <div className="leetcode-problem-date">
                    <span>{problem.timestamp}</span>
                </div>
            )}
            {problem.retention && (
                <div className="leetcode-problem-retention">
                    <span className="leetcode-retention-label">Retention</span>
                    <span className="leetcode-retention-value">{problem.retention}%</span>
                </div>
            )}
        </div>
    )
}

function LeetCodeNoteModal({ note, onClose }) {
    return (
        <div className="leetcode-modal-overlay" onClick={onClose}>
            <div className="leetcode-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="leetcode-modal-header">
                    <div className="leetcode-modal-title">
                        <i className="fa-solid fa-book-journal-whills" />
                        <span>Notes: {note.problemName}</span>
                    </div>
                    <button className="leetcode-modal-close" onClick={onClose}>
                        <i className="fa-solid fa-xmark" />
                    </button>
                </div>
                
                <div className="leetcode-modal-body">
                    {note.thoughts && (
                        <div className="leetcode-modal-section">
                            <h4 className="leetcode-modal-section-title">
                                <i className="fa-solid fa-brain" /> General Thoughts
                            </h4>
                            <div className="leetcode-modal-text">
                                {note.thoughts}
                            </div>
                        </div>
                    )}
                    
                    {note.solution && (
                        <div className="leetcode-modal-section">
                            <h4 className="leetcode-modal-section-title">
                                <i className="fa-solid fa-code" /> Solution
                            </h4>
                            <div className="leetcode-modal-code">
                                <pre><code>{note.solution}</code></pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArticleLeetCode
