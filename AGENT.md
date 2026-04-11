# AGENT.md

## Notion Repo Notes

For every substantive conversation, sync concise notes to Notion.

### Setup

1. Determine the repo name from the current working directory basename.
2. Find or create a child page under the notes root whose title exactly matches the repo name.
3. Treat that page as the running knowledge base. **Append only** — never overwrite unless explicitly asked.

### What to Capture

- Key learnings and explanations
- Decisions and rationale
- Code changes and affected endpoints
- Testing steps and results
- Open questions and next steps

### What NOT to Capture

- Greetings, filler, trivial back-and-forth
- Repeated content that adds nothing new

---

## LeetCode Notes

When discussing any LeetCode (or similar coding) problem, append a structured note with:

| Field | Description |
|---|---|
| **Problem** | Title and number (e.g. `#200 Number of Islands`) |
| **Category / Tags** | e.g. BFS, DFS, Dynamic Programming, Sliding Window, Graph, Two Pointers |
| **Difficulty** | Easy / Medium / Hard |
| **Key Syntax** | Language-specific patterns or APIs used (e.g. `collections.defaultdict`, `Array.prototype.reduce`, bit manipulation tricks) |
| **Hard Parts** | What made this problem tricky — edge cases, non-obvious observations, complexity traps |
| **Approach Summary** | 2-3 sentence description of the solution strategy |
| **Complexity** | Time and space |

### Example Note

```
## #200 Number of Islands — Medium
**Tags:** BFS, DFS, Matrix, Union-Find
**Key Syntax:** `deque` for BFS, in-place grid marking
**Hard Parts:** Remembering to mark visited *before* enqueueing to avoid duplicates; handling edge traversal order
**Approach:** Iterate every cell; on finding '1', BFS/DFS to mark the entire island, increment count.
**Complexity:** O(m×n) time, O(m×n) space worst-case for queue
```

---

## Response Rule

- After a successful Notion update → say **"Notion updated."**
- If Notion fails → say why in one sentence.
