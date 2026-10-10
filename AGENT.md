# AGENT.md

## LeetCode Notes

When discussing any LeetCode (or similar coding) problem, include the following details in the response:

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
