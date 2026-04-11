const fs = require('fs');
const path = require('path');

const USERNAME = 'YongjieXue';
const API_URL = `https://alfa-leetcode-api.onrender.com/${USERNAME}/submission?limit=20`;
const JSON_PATH = path.join(__dirname, '../public/data/sections/leetcode.json');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Asks the Gemini API for a standard explanation and solution for a LeetCode problem.
 * Retries up to 3 times with exponential backoff on 429/529 errors.
 * Falls back to a blank template if API key is missing or all retries fail.
 */
async function generateNoteForProblem(problemName) {
    const blankTemplate = {
        thoughts: "这题的难点是什么... (自动生成的解答)",
        solution: "```java\n// Solution automatically synced\n```"
    };

    if (!GEMINI_API_KEY) {
        console.warn(`[!] No GEMINI_API_KEY provided in environment. Using blank template for "${problemName}".`);
        return blankTemplate;
    }

    const payload = {
        contents: [{
            parts: [{
                text: `You are an expert software engineer. I just solved the LeetCode problem "${problemName}". Please provide a short explanation in Chinese describing the main difficulty of this problem ("这题的难点是什么") in an easy to understand way in a "thoughts" field, and the optimal Java solution formatted with Markdown backticks in a "solution" field. Return ONLY a valid JSON object with the keys "thoughts" and "solution". Do not include any intro, outro, or markdown code block formatting around the overall JSON response itself.`
            }]
        }],
        generationConfig: {
            temperature: 0.2
        }
    };

    const MAX_RETRIES = 3;
    const BASE_DELAY_MS = 2000;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
            if (attempt > 0) {
                const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
                console.log(`⏳ Retry ${attempt}/${MAX_RETRIES} for "${problemName}" after ${delay / 1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }

            console.log(`🤖 Generating AI notes for: ${problemName}...`);
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if ((res.status === 429 || res.status === 529) && attempt < MAX_RETRIES) {
                console.warn(`[!] Gemini API returned ${res.status}, will retry...`);
                continue;
            }

            if (!res.ok) {
                console.error(`[!] Gemini API Error: ${res.status} ${res.statusText}`);
                return blankTemplate;
            }

            const data = await res.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                if (attempt < MAX_RETRIES) {
                    console.warn(`[!] Gemini returned empty response for "${problemName}", will retry...`);
                    continue;
                }
                return blankTemplate;
            }

            let cleanText = text.trim();
            if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
            if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
            if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);

            const aiResponse = JSON.parse(cleanText.trim());
            return {
                thoughts: aiResponse.thoughts || blankTemplate.thoughts,
                solution: aiResponse.solution || blankTemplate.solution
            };

        } catch (e) {
            if (attempt < MAX_RETRIES) {
                console.warn(`[!] Attempt ${attempt + 1} failed for "${problemName}": ${e.message}, retrying...`);
                continue;
            }
            console.error(`[!] Failed to parse or fetch AI note for "${problemName}" after ${MAX_RETRIES + 1} attempts:`, e.message);
            return blankTemplate;
        }
    }

    return blankTemplate;
}

async function sync() {
    try {
        console.log(`Fetching latest submissions for ${USERNAME}...`);
        const response = await fetch(API_URL);
        const data = await response.json();
        const submissions = data?.submission || [];

        if (submissions.length === 0) {
            console.log('No submissions found or API is down.');
            return;
        }

        const rawJson = fs.readFileSync(JSON_PATH, 'utf-8');
        const leetcodeData = JSON.parse(rawJson);

        let trackingConfig = leetcodeData.articles[0].tracking;
        let staticProblems = trackingConfig.recentProblems || [];
        let notesConfig = trackingConfig.notes || {};
        let addedCount = 0;
        let notesAddedCount = 0;

        // Process from oldest to newest so unshifting puts the absolute newest at index 0
        const reversedSubmissions = [...submissions].reverse();

        for (const sub of reversedSubmissions) {
            const title = sub.title || sub.titleSlug;
            if (!title) continue;

            const existingIdx = staticProblems.findIndex(p => p.name === title);
            const timestamp = sub.timestamp ? new Date(parseInt(sub.timestamp) * 1000).toLocaleDateString() : '';
            const status = sub.statusDisplay === 'Accepted' ? 'solved' : 'attempted';

            const problemObj = {
                id: null,
                name: title,
                difficulty: sub.difficulty || '',
                status: status,
                tags: [],
                timestamp: timestamp
            };

            // 1. Maintain the permanent list
            if (existingIdx !== -1) {
                problemObj.tags = staticProblems[existingIdx].tags || [];
                if (!problemObj.difficulty && staticProblems[existingIdx].difficulty) {
                    problemObj.difficulty = staticProblems[existingIdx].difficulty;
                }
                if (staticProblems[existingIdx].id) {
                    problemObj.id = staticProblems[existingIdx].id;
                }
                
                staticProblems.splice(existingIdx, 1);
                staticProblems.unshift(problemObj);
            } else {
                staticProblems.unshift(problemObj);
                addedCount++;
                console.log(`Added deeply new permanent problem: ${title}`);
            }

            // 2. Generate a note automatically if it doesn't have one and was successfully solved
            if (status === 'solved' && !notesConfig[title]) {
                const autoNote = await generateNoteForProblem(title);
                notesConfig[title] = autoNote;
                notesAddedCount++;
            }
        }

        leetcodeData.articles[0].tracking.recentProblems = staticProblems;
        leetcodeData.articles[0].tracking.notes = notesConfig;

        fs.writeFileSync(JSON_PATH, JSON.stringify(leetcodeData, null, 4), 'utf-8');
        console.log(`Sync complete! Added ${addedCount} brand new permanent problems and auto-generated ${notesAddedCount} notes.`);

    } catch (e) {
        console.error('Error syncing LeetCode data:', e);
        process.exit(1);
    }
}

sync();
