import {mkdirSync, writeFileSync} from "fs";
import {dirname, resolve} from "path";
import {fileURLToPath} from "url";
import {DEFAULT_PERIOD1, fetchFinanceOverview} from "../server/finance/marketData.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = resolve(__dirname, "../public/data/finance/overview.json")
const period1 = process.env.FINANCE_PERIOD1 || DEFAULT_PERIOD1

mkdirSync(dirname(outputPath), {recursive: true})

const overview = await fetchFinanceOverview({period1})
writeFileSync(outputPath, JSON.stringify(overview, null, 2) + "\n", "utf-8")

console.log(`Finance snapshot written to ${outputPath}`)
