# The 2-Month DSA Mentor Plan (JavaScript Edition)

**How many problems should you solve?** Aim for **150–180 total problem-attempts** across two months — roughly **110–130 unique problems** plus **spaced revisits** of your weakest ~40. This mirrors the most widely used curated lists: the **Blind 75** (75 problems) and its successor the **NeetCode 150** (150 problems, 28 Easy / 97 Medium / 25 Hard, organized into 18 topic categories), which multiple independent sources confirm is the standard 2–3 month, ~10 hrs/week interview-prep list.<cite index="7-1,10-1">The NeetCode 150 list contains 28 Easy, 97 Medium, and 25 Hard problems, and most developers complete it in 6-8 weeks at 10 hours per week</cite> You don't have 3 months, so this plan is a **focused 120-problem core subset** of NeetCode 150 + Blind 75 (the two lists overlap heavily — <cite index="11-1">every problem in Blind 75 appears in NeetCode 150</cite>), sequenced for a true beginner, plus a light revision layer. Quality of understanding per problem matters far more than raw count — grinding all 150 blindly is explicitly warned against by experienced preppers.

---

## Sources used (research basis)

I cross-checked multiple current, reputable sources rather than copying one list wholesale:

- **NeetCode roadmap/150** — neetcode.io — the topic taxonomy and problem sequencing used throughout this plan
- **Blind 75** — the original 75-problem foundational list (subset of NeetCode 150)
- **LeetCode** — leetcode.com — problem statements, constraints, official editorial solutions
- **GeeksforGeeks** — geeksforgeeks.org — pattern explanations, complexity references
- Independent 2026 prep-strategy write-ups analyzing NeetCode 150 usage and pacing (Medium/CodeGrey, crackr.dev, Leon Consulting) — used only to validate structure/pacing, not as a source of specific company-tagged claims

Where sources disagreed (e.g., "do all 150" vs. "75 is enough"), I resolved it toward: **do the full pattern coverage of NeetCode 150's core, but trim repetitive/hard-tail problems**, because you have 2 months and are a beginner — breadth of pattern recognition matters more than volume.

---

## 1. Executive Summary

You're going from "I know some JS" to "I can solve a fresh Medium LeetCode problem in an interview, explain my approach, and analyze complexity" in 8 weeks. The plan has four pillars:

1. **Weeks 1–2:** JS-for-DSA fundamentals + linear structures (Arrays, Hashing, Two Pointers, Sliding Window, Stack)
2. **Weeks 3–5:** Non-linear structures (Linked Lists, Trees, Heaps, Tries) + core algorithmic techniques (Binary Search, Backtracking, Graphs/BFS/DFS)
3. **Weeks 6–7:** Dynamic Programming, Greedy, Intervals, Bit Manipulation, Union-Find, advanced graphs
4. **Week 8:** Mixed review, mock interviews, and the 7-day bootcamp

Every pattern is taught as: **recognize → understand why → derive → implement in JS → analyze complexity**, never "memorize this solution."

---

## 2. Assumptions About Your Current Level

I'm assuming you:
- Know basic JavaScript syntax (variables, loops, functions) but **not** DSA-specific JS (Map vs Object, closures for memoization, array method complexities)
- Have **not** implemented a linked list, stack, queue, tree, or graph from scratch before
- Do **not** know Big-O formally, even if you have intuition
- Can dedicate roughly **2–3 hours/day, 6 days/week** (~15–18 hrs/week). If you have less time, stretch Weeks 1–6 and compress by doing fewer optional problems — never skip the "must-solve" tier.

If any of this is wrong (e.g., you already know JS fundamentals well), skip the Week 1 JS-only days and start Week 1 on Arrays & Hashing directly — reclaim that time for extra revision.

---

## 3. JavaScript Prerequisites — Crash Course

Spend Day 1–2 on this before touching problems. You don't need to master it in isolation — you'll reinforce it while solving — but you need to recognize these tools exist.

| Concept | Why it matters for DSA | Key gotcha |
|---|---|---|
| `Array` methods: `push/pop/shift/unshift`, `slice/splice`, `map/filter/reduce`, `sort` | Core data manipulation | `shift/unshift` are **O(n)**, not O(1). `.sort()` **defaults to string sort** — always pass a comparator: `arr.sort((a,b) => a-b)` |
| `Map` vs plain `Object` | Hashing pattern relies on this | `Map` preserves insertion order, allows any key type, has O(1) `.size`, and is faster for frequent add/delete. Prefer `Map`/`Set` over `{}` for DSA |
| `Set` | Dedup, existence checks | O(1) average `has()`/`add()` |
| Strings are immutable | Affects in-place string manipulation | Convert to array (`str.split('')`) to mutate, then `.join('')` back |
| Objects/Arrays are reference types | Mutation bugs, especially in recursion/backtracking | Passing an array into recursive calls passes a reference — you often need to **push then pop** (backtrack) rather than create new arrays each time (for performance) |
| Default/rest params, destructuring | Cleaner code, faster to write under time pressure | `const [i, j] = [0, arr.length-1]` |
| Closures | Needed for memoization | A closure over a `Map` cache is the standard JS memoization pattern |
| Recursion & call stack | Trees, backtracking, DFS, divide-and-conquer | JS has **no tail-call optimization** in practice (V8 doesn't implement it) — very deep recursion (>~10,000) can stack-overflow; know when to convert to iterative |
| `class` syntax | Implementing linked lists, trees, tries, heaps | `class Node { constructor(val){this.val=val; this.next=null;} }` |
| No built-in Queue/Deque/Heap/PriorityQueue | You'll implement these yourself | Use arrays as stacks (`push/pop`), arrays as *rough* queues (`push/shift` — O(n) shift, or track a head index for O(1)), and build a **MinHeap class** yourself (below) |
| `BigInt` | Rare, but needed if numbers can exceed `2^53-1` | Use `10n`, `typeof x === 'bigint'`; most interview problems avoid this, but flag it if constraints show huge numbers |
| Custom comparators | Sorting objects, heaps | `arr.sort((a,b) => a.freq - b.freq)` — always explicit, never rely on default |
| `for...of` vs `for...in` | Iterating arrays vs object keys | Use `for...of` for arrays/Maps/Sets; `for...in` iterates keys (including inherited/enumerable ones) — avoid for arrays |

**JS performance notes specific to interviews:**
- Nested array/object destructuring and spread (`[...arr]`, `{...obj}`) are convenient but create **new copies — O(n)**; don't spread inside a loop unintentionally (accidental O(n²)).
- Recursion depth limits mean very deep DFS on huge inputs can crash in JS where it might not in Java/C++ — mention this if asked.
- `Array(n).fill(0)` for pre-sized arrays; `Array.from({length: n}, () => [])` to avoid **shared-reference bugs** (a classic JS trap: `Array(n).fill([])` makes all rows point to the *same* array).

### Boilerplate structures you'll implement in Week 1–3

```javascript
// Singly Linked List Node
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Binary Tree Node
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Simple Queue using head-pointer trick (avoids O(n) shift)
class Queue {
  constructor() { this.items = []; this.head = 0; }
  enqueue(item) { this.items.push(item); }
  dequeue() { return this.items[this.head++]; }
  isEmpty() { return this.head >= this.items.length; }
  peek() { return this.items[this.head]; }
}

// MinHeap (array-based binary heap) — JS has no built-in priority queue
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.heap = [];
    this.compare = compare;
  }
  size() { return this.heap.length; }
  peek() { return this.heap[0]; }
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._bubbleDown(0);
    }
    return top;
  }
  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.compare(this.heap[i], this.heap[parent]) < 0) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.compare(this.heap[l], this.heap[smallest]) < 0) smallest = l;
      if (r < n && this.compare(this.heap[r], this.heap[smallest]) < 0) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}
```

Keep this file open in a separate tab/gist — you'll reuse these classes constantly.

---

## 4. DSA Patterns You Must Master

Refined list based on cross-referencing NeetCode's roadmap categories against Blind-75/GfG pattern taxonomies (order = teaching order, not difficulty order):

1. Arrays & Hashing
2. Two Pointers
3. Sliding Window
4. Stack (incl. Monotonic Stack)
5. Binary Search
6. Linked List (incl. Fast & Slow Pointers)
7. Trees (DFS/BFS traversal, BST properties)
8. Tries
9. Heap / Priority Queue
10. Backtracking
11. Graphs (BFS, DFS, Topological Sort, Union-Find)
12. 1-D Dynamic Programming
13. 2-D Dynamic Programming
14. Greedy
15. Intervals
16. Bit Manipulation
17. Math & Geometry (light touch — matrix rotation, etc.)
18. Prefix Sum (folded into Arrays & Sliding Window where it naturally occurs)

This matches the **NeetCode Roadmap order**: <cite index="10-1">Arrays and Hashing first, then Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Tries, Heap, Backtracking, Graphs, 1D Dynamic Programming, 2D Dynamic Programming, Greedy, Intervals, Math and Geometry, and Bit Manipulation last</cite>, which multiple sources independently converge on as the pedagogically correct sequence because <cite index="10-1">each topic builds on skills from the previous one</cite>.

---

## 5. Pattern Recognition Guide

Use this table during problem-reading, before you write any code.

| Clue in problem statement | Likely pattern |
|---|---|
| "subarray/substring", contiguous, "at most k distinct" | Sliding Window |
| Sorted array/list, "pair that sums to", "closest to" | Two Pointers |
| "top k", "kth largest/smallest", "k closest" | Heap |
| Need next-greater/smaller element, "span", histogram | Monotonic Stack |
| Sorted (or rotatable-sorted) array, "find target in O(log n)" | Binary Search |
| "minimize the maximum" / "maximize the minimum" | Binary Search on the Answer |
| Tree traversal, "path sum", "depth", "ancestor" | Tree DFS/BFS |
| "number of islands", grid connectivity, "shortest path unweighted" | Graph BFS/DFS |
| "prerequisite", "order of tasks", "can finish" | Topological Sort |
| "connected components", "redundant connection", dynamic connectivity | Union-Find (DSU) |
| "all subsets/permutations/combinations", "generate all valid" | Backtracking |
| "min/max cost/ways to reach", overlapping subproblems, "count ways" | Dynamic Programming |
| "merge intervals", "free time", scheduling overlap | Intervals |
| "minimum number of," "greedy choice works," local-optimal claims | Greedy |
| Prefix/word lookup, autocomplete | Trie |
| XOR tricks, "without extra space," "single number" | Bit Manipulation |
| Cycle detection in linked list, "middle of list" | Fast & Slow Pointers |

**How to identify from scratch (framework):** input size + constraints often *tell you* the expected complexity, which narrows the pattern:
- n ≤ ~20: brute force / backtracking (2ⁿ acceptable)
- n ≤ ~1,000: O(n²) acceptable → maybe DP or nested loops
- n ≤ ~10⁵–10⁶: need O(n) or O(n log n) → hashing, two pointers, sliding window, heap, sort+scan
- n ≤ ~10⁹ but asking for one value: O(log n) → binary search

---

## 6. Complete 8-Week Roadmap

Each week: **Learn → Solve (Easy→Med→Hard) → Review → Revise older problems → light mock at week's end (from Week 3 onward)**.

### Week 1 — JS Foundations + Arrays & Hashing + Two Pointers
- **Learn:** JS crash course (Section 3), Big-O basics, hashing with Map/Set, two-pointer technique on sorted arrays/strings
- **JS prerequisites:** Map/Set, array methods, string immutability
- **Problems (12):** Two Sum, Contains Duplicate, Valid Anagram, Group Anagrams, Top K Frequent Elements, Product of Array Except Self, Longest Consecutive Sequence, Valid Palindrome, Two Sum II, 3Sum, Container With Most Water, Trapping Rain Water
- **Daily target:** 2 problems/day + concept reading
- **Revision:** Day 6 — re-solve Day 1–2 problems without notes
- **By week's end you should:** solve any "find a pair/triplet" or "count frequency" problem confidently in O(n) or O(n log n)

### Week 2 — Sliding Window + Stack + Binary Search
- **Learn:** fixed vs. variable window, monotonic stack, binary search template (including "search on answer")
- **Problems (14):** Best Time to Buy/Sell Stock, Longest Substring Without Repeating Characters, Longest Repeating Character Replacement, Permutation in String, Minimum Window Substring, Sliding Window Maximum, Valid Parentheses, Min Stack, Evaluate RPN, Daily Temperatures, Car Fleet, Binary Search, Search in Rotated Sorted Array, Koko Eating Bananas
- **Daily target:** 2 problems/day
- **Revision:** re-solve 3 Week-1 problems
- **Mock (light):** 1 timed Easy + 1 timed Medium, 30 min combined
- **By week's end:** recognize window problems instantly; implement binary search without off-by-one bugs

### Week 3 — Linked Lists + Trees (traversal & properties)
- **Learn:** pointer manipulation, dummy-node technique, fast/slow pointers, DFS (pre/in/post-order) vs BFS, recursion patterns on trees
- **Problems (16):** Reverse Linked List, Merge Two Sorted Lists, Linked List Cycle, Reorder List, Remove Nth Node From End, Copy List with Random Pointer, Add Two Numbers, LRU Cache, Invert Binary Tree, Maximum Depth of Binary Tree, Diameter of Binary Tree, Balanced Binary Tree, Same Tree, Subtree of Another Tree, Binary Tree Level Order Traversal, Validate Binary Search Tree
- **Daily target:** 2–3 problems/day (linked-list problems are quick; trees take longer)
- **Revision:** Week 1 problems (7-day mark)
- **Mock:** 1 mock (2 problems, 45 min)
- **By week's end:** implement any linked-list reversal/merge from scratch; write recursive tree DFS without hesitation

### Week 4 — Trees (advanced) + Tries + Heaps
- **Learn:** LCA, tree construction from traversals, trie structure, heap mechanics (use your MinHeap class)
- **Problems (14):** Kth Smallest Element in BST, LCA of a BST, Binary Tree Right Side View, Count Good Nodes, Construct Binary Tree from Preorder/Inorder, Binary Tree Maximum Path Sum (hard, attempt with hints), Implement Trie, Design Add and Search Words, Kth Largest Element in a Stream, Last Stone Weight, K Closest Points to Origin, Kth Largest Element in an Array, Task Scheduler, Find Median From Data Stream (hard)
- **Daily target:** 2 problems/day
- **Revision:** Week 2 problems
- **Mock:** 1 mock (2 problems, 45 min)
- **By week's end:** know when a heap beats sorting; implement a trie unaided

### Week 5 — Backtracking + Graphs (BFS/DFS)
- **Learn:** backtracking template (choose → explore → un-choose), grid BFS/DFS, adjacency list construction
- **Problems (16):** Subsets, Combination Sum, Permutations, Subsets II, Combination Sum II, Word Search, Palindrome Partitioning, Letter Combinations of a Phone Number, Number of Islands, Clone Graph, Max Area of Island, Pacific Atlantic Water Flow, Surrounded Regions, Rotting Oranges, Course Schedule, Course Schedule II
- **Daily target:** 2–3 problems/day
- **Revision:** Week 3 problems
- **Mock:** 1 mock (2 problems, 45 min)
- **By week's end:** write backtracking solutions to any "generate all X" problem; comfortable with grid BFS/DFS

### Week 6 — Graphs (advanced) + Union-Find + 1-D Dynamic Programming
- **Learn:** topological sort (Kahn's + DFS), Union-Find with path compression, DP fundamentals (memoization → tabulation)
- **Problems (16):** Redundant Connection, Number of Connected Components, Graph Valid Tree, Word Ladder, Min Cost to Connect All Points, Network Delay Time, Climbing Stairs, House Robber, House Robber II, Longest Palindromic Substring, Palindromic Substrings, Decode Ways, Coin Change, Maximum Product Subarray, Word Break, Longest Increasing Subsequence
- **Daily target:** 2 problems/day (DP problems take longer — budget extra time)
- **Revision:** Week 4 problems
- **Mock:** 1 mock (2 problems, 45 min)
- **By week's end:** convert any 1-D recursive relation into a DP table; explain the difference between top-down and bottom-up

### Week 7 — 2-D DP + Greedy + Intervals + Bit Manipulation
- **Learn:** 2-D DP grids, interval sorting/merging, greedy-proof intuition, bit tricks
- **Problems (16):** Unique Paths, Longest Common Subsequence, Best Time to Buy/Sell Stock with Cooldown, Coin Change II, Target Sum, Interleaving String, Edit Distance, Maximum Subarray, Jump Game, Jump Game II, Gas Station, Merge Intervals, Insert Interval, Non-overlapping Intervals, Meeting Rooms II, Number of 1 Bits
- **Daily target:** 2 problems/day
- **Revision:** Week 5 problems
- **Mock:** 1 mock (3 problems, 60 min, timed like a real interview)
- **By week's end:** solve most Medium DP/greedy/interval problems within 25–30 minutes

### Week 8 — Mixed Review + 7-Day Bootcamp
- **Days 1–3:** interleaved mixed-pattern practice (see Section 15) — problems randomly drawn from Weeks 1–7, no pattern label given
- **Days 4–7:** the Final Interview Bootcamp (Section 15)
- **Revision:** every problem you got wrong or slow (>30 min) in Weeks 1–7, spaced by the system in Section 14
- **By week's end:** you should be able to open a random Medium LeetCode problem you've never seen, identify the pattern within 2–3 minutes, and code a working solution within 25 minutes

---

## 7. Daily Study Schedule

Adjusted for a realistic beginner pace (not the 60/90/30/30 template verbatim — that underweights review, which is where retention actually happens):

**Standard weekday (2.5–3 hrs):**
| Block | Time | Activity |
|---|---|---|
| 1 | 20 min | Concept/pattern reading (once per new pattern, not daily) |
| 2 | 60–75 min | Solve new problem #1 (timer on — cap attempt at 25 min before allowing a hint) |
| 3 | 60–75 min | Solve new problem #2 |
| 4 | 15 min | Review your own solution vs. the official/NeetCode solution — note what you missed |
| 5 | 15–20 min | Revision: re-solve 1 problem from the spaced-repetition queue (Section 14) *from memory, no notes* |

**Weekly revision day (Day 6 of each week, ~2 hrs):** no new problems — only re-solve the week's problems cold, plus anything due in the spaced-repetition queue.

**Rest/light day (Day 7):** optional 30–45 min reading only (articles, pattern recap) — real rest matters for retention.

**Distinguish clearly:**
- **Learning** = reading pattern explanations, watching one solution walkthrough max per problem
- **Solving** = attempting a new problem cold, timer on
- **Reviewing** = comparing your finished solution to a reference solution
- **Re-solving** = attempting a previously-solved problem again, from scratch, no peeking
- **Revision** = the scheduled spaced-repetition pass (Section 14)
- **Mock interviews** = starting Week 3, timed, out loud (talk through your approach as if to an interviewer), 1×/week rising to 3×/week in Week 8

---

## 8. Pattern-by-Pattern Question Sheet

For every pattern: what it is, when to recognize it, template, complexity, common mistakes, then problems ordered Easy → Medium → Hard. **Bold** = must-solve; others are optional if time allows.

### Pattern 1: Arrays & Hashing
- **What:** Use a hash map/set to trade space for O(1) average lookup, turning O(n²) brute force into O(n).
- **Recognize:** "find if exists," "count frequency," "find pair/group with property X," duplicates, anagrams.
- **Template:**
```javascript
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}
```
- **Complexity:** O(n) time, O(n) space typically.
- **Common mistakes:** forgetting the hash map must be built/checked in the *same pass* for "complement" problems (not two separate passes when order matters); using Object instead of Map for non-string keys.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 1 | **Two Sum** | Easy | LeetCode | https://leetcode.com/problems/two-sum/ | https://neetcode.io/solutions/two-sum |
| 2 | **Contains Duplicate** | Easy | LeetCode | https://leetcode.com/problems/contains-duplicate/ | https://neetcode.io/solutions/contains-duplicate |
| 3 | **Valid Anagram** | Easy | LeetCode | https://leetcode.com/problems/valid-anagram/ | https://neetcode.io/solutions/valid-anagram |
| 4 | **Group Anagrams** | Medium | LeetCode | https://leetcode.com/problems/group-anagrams/ | https://neetcode.io/solutions/group-anagrams |
| 5 | **Top K Frequent Elements** | Medium | LeetCode | https://leetcode.com/problems/top-k-frequent-elements/ | https://neetcode.io/solutions/top-k-frequent-elements |
| 6 | **Product of Array Except Self** | Medium | LeetCode | https://leetcode.com/problems/product-of-array-except-self/ | https://neetcode.io/solutions/product-of-array-except-self |
| 7 | Longest Consecutive Sequence | Medium | LeetCode | https://leetcode.com/problems/longest-consecutive-sequence/ | https://neetcode.io/solutions/longest-consecutive-sequence |
| 8 | Valid Sudoku | Medium | LeetCode | https://leetcode.com/problems/valid-sudoku/ | https://leetcode.com/problems/valid-sudoku/solutions/ |

### Pattern 2: Two Pointers
- **What:** Two indices moving through a structure (often sorted) to avoid nested loops.
- **Recognize:** sorted input, "pair/triplet that sums to X," palindrome checks, merging.
- **Template:**
```javascript
function isPalindrome(s) {
  let l = 0, r = s.length - 1;
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++; r--;
  }
  return true;
}
```
- **Complexity:** O(n) time, O(1) space.
- **Common mistakes:** forgetting to skip duplicates in 3Sum-style problems; off-by-one when pointers cross.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 9 | **Valid Palindrome** | Easy | LeetCode | https://leetcode.com/problems/valid-palindrome/ | https://neetcode.io/solutions/valid-palindrome |
| 10 | **Two Sum II** | Medium | LeetCode | https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/ | https://neetcode.io/solutions/two-sum-ii-input-array-is-sorted |
| 11 | **3Sum** | Medium | LeetCode | https://leetcode.com/problems/3sum/ | https://neetcode.io/solutions/3sum |
| 12 | **Container With Most Water** | Medium | LeetCode | https://leetcode.com/problems/container-with-most-water/ | https://neetcode.io/solutions/container-with-most-water |
| 13 | Trapping Rain Water | Hard | LeetCode | https://leetcode.com/problems/trapping-rain-water/ | https://neetcode.io/solutions/trapping-rain-water |

### Pattern 3: Sliding Window
- **What:** Maintain a "window" (subarray/substring) that expands/contracts based on a condition, avoiding recomputation.
- **Recognize:** "longest/shortest contiguous subarray/substring with property X."
- **Fixed vs variable:** fixed window = size is given upfront; variable = grows until invalid, then shrinks.
- **Template:**
```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
```
- **Complexity:** O(n) time (each pointer moves forward only), O(k) space.
- **Common mistakes:** shrinking the window one step too many/few times; forgetting to update the "best" answer inside the loop vs. after.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 14 | **Best Time to Buy and Sell Stock** | Easy | LeetCode | https://leetcode.com/problems/best-time-to-buy-and-sell-stock/ | https://neetcode.io/solutions/best-time-to-buy-and-sell-stock |
| 15 | **Longest Substring Without Repeating Characters** | Medium | LeetCode | https://leetcode.com/problems/longest-substring-without-repeating-characters/ | https://neetcode.io/solutions/longest-substring-without-repeating-characters |
| 16 | Longest Repeating Character Replacement | Medium | LeetCode | https://leetcode.com/problems/longest-repeating-character-replacement/ | https://neetcode.io/solutions/longest-repeating-character-replacement |
| 17 | Permutation in String | Medium | LeetCode | https://leetcode.com/problems/permutation-in-string/ | https://neetcode.io/solutions/permutation-in-string |
| 18 | **Minimum Window Substring** | Hard | LeetCode | https://leetcode.com/problems/minimum-window-substring/ | https://neetcode.io/solutions/minimum-window-substring |
| 19 | Sliding Window Maximum | Hard | LeetCode | https://leetcode.com/problems/sliding-window-maximum/ | https://neetcode.io/solutions/sliding-window-maximum |

### Pattern 4: Stack (incl. Monotonic Stack)
- **What:** LIFO structure; monotonic stack keeps elements in increasing/decreasing order to answer "next greater/smaller" in O(n).
- **Recognize:** parentheses matching, "next greater element," histogram/span problems.
- **Template (monotonic):**
```javascript
function dailyTemperatures(temps) {
  const res = new Array(temps.length).fill(0);
  const stack = []; // indices, decreasing temps
  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const idx = stack.pop();
      res[idx] = i - idx;
    }
    stack.push(i);
  }
  return res;
}
```
- **Complexity:** O(n) — each element pushed/popped once.
- **Common mistakes:** pushing values instead of indices when you need the index later.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 20 | **Valid Parentheses** | Easy | LeetCode | https://leetcode.com/problems/valid-parentheses/ | https://neetcode.io/solutions/valid-parentheses |
| 21 | **Min Stack** | Medium | LeetCode | https://leetcode.com/problems/min-stack/ | https://neetcode.io/solutions/min-stack |
| 22 | Evaluate Reverse Polish Notation | Medium | LeetCode | https://leetcode.com/problems/evaluate-reverse-polish-notation/ | https://neetcode.io/solutions/evaluate-reverse-polish-notation |
| 23 | **Daily Temperatures** | Medium | LeetCode | https://leetcode.com/problems/daily-temperatures/ | https://neetcode.io/solutions/daily-temperatures |
| 24 | Car Fleet | Medium | LeetCode | https://leetcode.com/problems/car-fleet/ | https://neetcode.io/solutions/car-fleet |
| 25 | Largest Rectangle in Histogram | Hard | LeetCode | https://leetcode.com/problems/largest-rectangle-in-histogram/ | https://neetcode.io/solutions/largest-rectangle-in-histogram |

### Pattern 5: Binary Search
- **What:** Halve the search space each step using a monotonic (sorted or "answer-monotonic") property.
- **Recognize:** sorted/rotated array; "minimize the max" or "maximize the min" (binary search *on the answer*, not the array).
- **Template:**
```javascript
function binarySearch(nums, target) {
  let lo = 0, hi = nums.length - 1;
  while (lo <= hi) {
    const mid = lo + ((hi - lo) >> 1);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}
```
- **Complexity:** O(log n) time, O(1) space.
- **Common mistakes:** `<=` vs `<` in the loop condition; integer overflow (not a JS issue, but mid calculation style matters for clarity); infinite loops when `lo`/`hi` don't shrink.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 26 | **Binary Search** | Easy | LeetCode | https://leetcode.com/problems/binary-search/ | https://neetcode.io/solutions/binary-search |
| 27 | **Search in Rotated Sorted Array** | Medium | LeetCode | https://leetcode.com/problems/search-in-rotated-sorted-array/ | https://neetcode.io/solutions/search-in-rotated-sorted-array |
| 28 | Find Minimum in Rotated Sorted Array | Medium | LeetCode | https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/ | https://neetcode.io/solutions/find-minimum-in-rotated-sorted-array |
| 29 | **Koko Eating Bananas** | Medium | LeetCode | https://leetcode.com/problems/koko-eating-bananas/ | https://neetcode.io/solutions/koko-eating-bananas |
| 30 | Median of Two Sorted Arrays | Hard | LeetCode | https://leetcode.com/problems/median-of-two-sorted-arrays/ | https://neetcode.io/solutions/median-of-two-sorted-arrays |

### Pattern 6: Linked List (incl. Fast & Slow Pointers)
- **What:** Pointer manipulation without random access; fast/slow pointers detect cycles/find midpoints in O(n)/O(1).
- **Recognize:** "reverse," "merge," "cycle," "middle," "kth from end," "duplicate detection via cycle."
- **Template:**
```javascript
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
```
- **Complexity:** O(n) time, O(1) space (iterative).
- **Common mistakes:** losing the reference to `next` before reassigning; forgetting a dummy head node for merge/remove problems.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 31 | **Reverse Linked List** | Easy | LeetCode | https://leetcode.com/problems/reverse-linked-list/ | https://neetcode.io/solutions/reverse-linked-list |
| 32 | **Merge Two Sorted Lists** | Easy | LeetCode | https://leetcode.com/problems/merge-two-sorted-lists/ | https://neetcode.io/solutions/merge-two-sorted-lists |
| 33 | **Linked List Cycle** | Easy | LeetCode | https://leetcode.com/problems/linked-list-cycle/ | https://neetcode.io/solutions/linked-list-cycle |
| 34 | **Reorder List** | Medium | LeetCode | https://leetcode.com/problems/reorder-list/ | https://neetcode.io/solutions/reorder-list |
| 35 | Remove Nth Node From End of List | Medium | LeetCode | https://leetcode.com/problems/remove-nth-node-from-end-of-list/ | https://neetcode.io/solutions/remove-nth-node-from-end-of-list |
| 36 | Copy List with Random Pointer | Medium | LeetCode | https://leetcode.com/problems/copy-list-with-random-pointer/ | https://neetcode.io/solutions/copy-list-with-random-pointer |
| 37 | Add Two Numbers | Medium | LeetCode | https://leetcode.com/problems/add-two-numbers/ | https://neetcode.io/solutions/add-two-numbers |
| 38 | **LRU Cache** | Medium | LeetCode | https://leetcode.com/problems/lru-cache/ | https://neetcode.io/solutions/lru-cache |
| 39 | Merge k Sorted Lists | Hard | LeetCode | https://leetcode.com/problems/merge-k-sorted-lists/ | https://neetcode.io/solutions/merge-k-sorted-lists |
| 40 | Reverse Nodes in k-Group | Hard | LeetCode | https://leetcode.com/problems/reverse-nodes-in-k-group/ | https://neetcode.io/solutions/reverse-nodes-in-k-group |

### Pattern 7: Trees
- **What:** Recursive DFS (preorder/inorder/postorder) or iterative BFS (level order) over a hierarchical structure.
- **Recognize:** "depth," "path," "ancestor," "balanced," "same/subtree," anything phrased about a tree.
- **Template:**
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
function levelOrder(root) {
  if (!root) return [];
  const res = [], queue = [root];
  while (queue.length) {
    const level = [], size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift(); // for large trees prefer the Queue class from Sec.3
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
```
- **Complexity:** O(n) time (visit every node once), O(h) space for DFS recursion (h = height), O(n) for BFS.
- **Common mistakes:** not handling the null/empty-tree base case; confusing BST validation with just comparing to immediate children (must track valid range).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 41 | **Invert Binary Tree** | Easy | LeetCode | https://leetcode.com/problems/invert-binary-tree/ | https://neetcode.io/solutions/invert-binary-tree |
| 42 | **Maximum Depth of Binary Tree** | Easy | LeetCode | https://leetcode.com/problems/maximum-depth-of-binary-tree/ | https://neetcode.io/solutions/maximum-depth-of-binary-tree |
| 43 | Diameter of Binary Tree | Easy | LeetCode | https://leetcode.com/problems/diameter-of-binary-tree/ | https://neetcode.io/solutions/diameter-of-binary-tree |
| 44 | Balanced Binary Tree | Easy | LeetCode | https://leetcode.com/problems/balanced-binary-tree/ | https://neetcode.io/solutions/balanced-binary-tree |
| 45 | Same Tree | Easy | LeetCode | https://leetcode.com/problems/same-tree/ | https://neetcode.io/solutions/same-tree |
| 46 | Subtree of Another Tree | Easy | LeetCode | https://leetcode.com/problems/subtree-of-another-tree/ | https://neetcode.io/solutions/subtree-of-another-tree |
| 47 | **Lowest Common Ancestor of a BST** | Medium | LeetCode | https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/ | https://neetcode.io/solutions/lowest-common-ancestor-of-a-binary-search-tree |
| 48 | **Binary Tree Level Order Traversal** | Medium | LeetCode | https://leetcode.com/problems/binary-tree-level-order-traversal/ | https://neetcode.io/solutions/binary-tree-level-order-traversal |
| 49 | Binary Tree Right Side View | Medium | LeetCode | https://leetcode.com/problems/binary-tree-right-side-view/ | https://neetcode.io/solutions/binary-tree-right-side-view |
| 50 | Count Good Nodes in Binary Tree | Medium | LeetCode | https://leetcode.com/problems/count-good-nodes-in-binary-tree/ | https://neetcode.io/solutions/count-good-nodes-in-binary-tree |
| 51 | **Validate Binary Search Tree** | Medium | LeetCode | https://leetcode.com/problems/validate-binary-search-tree/ | https://neetcode.io/solutions/validate-binary-search-tree |
| 52 | Kth Smallest Element in a BST | Medium | LeetCode | https://leetcode.com/problems/kth-smallest-element-in-a-bst/ | https://neetcode.io/solutions/kth-smallest-element-in-a-bst |
| 53 | Construct Binary Tree from Preorder and Inorder Traversal | Medium | LeetCode | https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/ | https://neetcode.io/solutions/construct-binary-tree-from-preorder-and-inorder-traversal |
| 54 | Binary Tree Maximum Path Sum | Hard | LeetCode | https://leetcode.com/problems/binary-tree-maximum-path-sum/ | https://neetcode.io/solutions/binary-tree-maximum-path-sum |
| 55 | Serialize and Deserialize Binary Tree | Hard | LeetCode | https://leetcode.com/problems/serialize-and-deserialize-binary-tree/ | https://neetcode.io/solutions/serialize-and-deserialize-binary-tree |

### Pattern 8: Tries
- **What:** Tree of characters for prefix-based lookup.
- **Recognize:** "prefix," "autocomplete," "word search in dictionary."
- **Template:**
```javascript
class TrieNode {
  constructor() { this.children = {}; this.isEnd = false; }
}
class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isEnd;
  }
}
```
- **Complexity:** O(L) per insert/search, L = word length. Space O(total characters).
- **Common mistakes:** forgetting `isEnd` flag (so "car" incorrectly matches when only "card" was inserted).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 56 | **Implement Trie (Prefix Tree)** | Medium | LeetCode | https://leetcode.com/problems/implement-trie-prefix-tree/ | https://neetcode.io/solutions/implement-trie-prefix-tree |
| 57 | Design Add and Search Words Data Structure | Medium | LeetCode | https://leetcode.com/problems/design-add-and-search-words-data-structure/ | https://neetcode.io/solutions/design-add-and-search-words-data-structure |
| 58 | Word Search II | Hard | LeetCode | https://leetcode.com/problems/word-search-ii/ | https://neetcode.io/solutions/word-search-ii |

### Pattern 9: Heap / Priority Queue
- **What:** Always access min/max in O(log n); use your MinHeap class from Section 3 (negate values for a max-heap).
- **Recognize:** "kth largest/smallest," "top k," "median of stream," "merge k sorted."
- **Complexity:** O(log n) insert/remove, O(1) peek.
- **Common mistakes:** rebuilding the heap from scratch every time instead of maintaining it incrementally; using a full sort (O(n log n)) when a size-k heap gives O(n log k).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 59 | Kth Largest Element in a Stream | Easy | LeetCode | https://leetcode.com/problems/kth-largest-element-in-a-stream/ | https://neetcode.io/solutions/kth-largest-element-in-a-stream |
| 60 | Last Stone Weight | Easy | LeetCode | https://leetcode.com/problems/last-stone-weight/ | https://neetcode.io/solutions/last-stone-weight |
| 61 | **K Closest Points to Origin** | Medium | LeetCode | https://leetcode.com/problems/k-closest-points-to-origin/ | https://neetcode.io/solutions/k-closest-points-to-origin |
| 62 | **Kth Largest Element in an Array** | Medium | LeetCode | https://leetcode.com/problems/kth-largest-element-in-an-array/ | https://neetcode.io/solutions/kth-largest-element-in-an-array |
| 63 | Task Scheduler | Medium | LeetCode | https://leetcode.com/problems/task-scheduler/ | https://neetcode.io/solutions/task-scheduler |
| 64 | Find Median from Data Stream | Hard | LeetCode | https://leetcode.com/problems/find-median-from-data-stream/ | https://neetcode.io/solutions/find-median-from-data-stream |

### Pattern 10: Backtracking
- **What:** Choose → recurse/explore → un-choose (undo), pruning invalid branches early.
- **Recognize:** "all possible," "generate," permutations/combinations/subsets, constraint satisfaction (N-Queens).
- **Template:**
```javascript
function subsets(nums) {
  const res = [], path = [];
  function backtrack(start) {
    res.push([...path]);
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop(); // undo
    }
  }
  backtrack(0);
  return res;
}
```
- **Complexity:** typically O(2ⁿ) or O(n!) — inherently exponential; the goal is correct pruning, not a magic optimization.
- **Common mistakes:** pushing `path` by reference instead of `[...path]` (classic JS bug — all results end up identical/empty because they share the same array reference).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 65 | **Subsets** | Medium | LeetCode | https://leetcode.com/problems/subsets/ | https://neetcode.io/solutions/subsets |
| 66 | **Combination Sum** | Medium | LeetCode | https://leetcode.com/problems/combination-sum/ | https://neetcode.io/solutions/combination-sum |
| 67 | **Permutations** | Medium | LeetCode | https://leetcode.com/problems/permutations/ | https://neetcode.io/solutions/permutations |
| 68 | Subsets II | Medium | LeetCode | https://leetcode.com/problems/subsets-ii/ | https://neetcode.io/solutions/subsets-ii |
| 69 | Combination Sum II | Medium | LeetCode | https://leetcode.com/problems/combination-sum-ii/ | https://neetcode.io/solutions/combination-sum-ii |
| 70 | **Word Search** | Medium | LeetCode | https://leetcode.com/problems/word-search/ | https://neetcode.io/solutions/word-search |
| 71 | Palindrome Partitioning | Medium | LeetCode | https://leetcode.com/problems/palindrome-partitioning/ | https://neetcode.io/solutions/palindrome-partitioning |
| 72 | Letter Combinations of a Phone Number | Medium | LeetCode | https://leetcode.com/problems/letter-combinations-of-a-phone-number/ | https://neetcode.io/solutions/letter-combinations-of-a-phone-number |
| 73 | N-Queens | Hard | LeetCode | https://leetcode.com/problems/n-queens/ | https://neetcode.io/solutions/n-queens |

### Pattern 11: Graphs (BFS, DFS, Topological Sort, Union-Find)
- **What:** Traverse nodes/edges; BFS for shortest path (unweighted), DFS for reachability/cycles, topological sort for ordering with dependencies, Union-Find for dynamic connectivity.
- **Recognize:** grids, "islands," "prerequisite courses," "connected components," "can you finish all tasks."
- **Template (BFS on grid):**
```javascript
function numIslands(grid) {
  const rows = grid.length, cols = grid[0].length;
  let count = 0;
  function bfs(r, c) {
    const queue = [[r, c]];
    grid[r][c] = '0';
    while (queue.length) {
      const [row, col] = queue.shift();
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0';
          queue.push([nr, nc]);
        }
      }
    }
  }
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      if (grid[r][c] === '1') { count++; bfs(r, c); }
  return count;
}
```
- **Complexity:** O(V + E) for BFS/DFS/topological sort; Union-Find is ~O(α(n)) per operation with path compression (effectively constant).
- **Common mistakes:** forgetting to mark nodes visited *before* enqueueing (causes duplicate work/infinite loops in BFS); not detecting cycles before attempting topological sort.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 74 | **Number of Islands** | Medium | LeetCode | https://leetcode.com/problems/number-of-islands/ | https://neetcode.io/solutions/number-of-islands |
| 75 | **Clone Graph** | Medium | LeetCode | https://leetcode.com/problems/clone-graph/ | https://neetcode.io/solutions/clone-graph |
| 76 | Max Area of Island | Medium | LeetCode | https://leetcode.com/problems/max-area-of-island/ | https://neetcode.io/solutions/max-area-of-island |
| 77 | Pacific Atlantic Water Flow | Medium | LeetCode | https://leetcode.com/problems/pacific-atlantic-water-flow/ | https://neetcode.io/solutions/pacific-atlantic-water-flow |
| 78 | Surrounded Regions | Medium | LeetCode | https://leetcode.com/problems/surrounded-regions/ | https://neetcode.io/solutions/surrounded-regions |
| 79 | Rotting Oranges | Medium | LeetCode | https://leetcode.com/problems/rotting-oranges/ | https://neetcode.io/solutions/rotting-oranges |
| 80 | **Course Schedule** | Medium | LeetCode | https://leetcode.com/problems/course-schedule/ | https://neetcode.io/solutions/course-schedule |
| 81 | Course Schedule II | Medium | LeetCode | https://leetcode.com/problems/course-schedule-ii/ | https://neetcode.io/solutions/course-schedule-ii |
| 82 | Redundant Connection | Medium | LeetCode | https://leetcode.com/problems/redundant-connection/ | https://neetcode.io/solutions/redundant-connection |
| 83 | Number of Connected Components in an Undirected Graph | Medium | LeetCode | https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/ | https://neetcode.io/solutions/number-of-connected-components-in-an-undirected-graph |
| 84 | Graph Valid Tree | Medium | LeetCode | https://leetcode.com/problems/graph-valid-tree/ | https://neetcode.io/solutions/graph-valid-tree |
| 85 | Word Ladder | Hard | LeetCode | https://leetcode.com/problems/word-ladder/ | https://neetcode.io/solutions/word-ladder |

### Pattern 12: 1-D Dynamic Programming
- **What:** Break a problem into overlapping subproblems along one dimension; cache results (memoization) or build a table bottom-up (tabulation).
- **Recognize:** "number of ways to," "min/max cost to reach," "can you partition," Fibonacci-like recurrence.
- **Template:**
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    [prev2, prev1] = [prev1, prev1 + prev2];
  }
  return prev1;
}
// Memoized version for more complex recurrences:
function coinChange(coins, amount) {
  const memo = new Map();
  function dp(remaining) {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    if (memo.has(remaining)) return memo.get(remaining);
    let best = Infinity;
    for (const c of coins) best = Math.min(best, dp(remaining - c) + 1);
    memo.set(remaining, best);
    return best;
  }
  const result = dp(amount);
  return result === Infinity ? -1 : result;
}
```
- **Complexity:** typically O(n × states) time, O(n) or O(1) space (if you can roll the array down to two variables).
- **Common mistakes:** not identifying the correct state (what varies between subproblems); forgetting base cases; recomputing without memoizing (defeats the purpose).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 86 | **Climbing Stairs** | Easy | LeetCode | https://leetcode.com/problems/climbing-stairs/ | https://neetcode.io/solutions/climbing-stairs |
| 87 | Min Cost Climbing Stairs | Easy | LeetCode | https://leetcode.com/problems/min-cost-climbing-stairs/ | https://neetcode.io/solutions/min-cost-climbing-stairs |
| 88 | **House Robber** | Medium | LeetCode | https://leetcode.com/problems/house-robber/ | https://neetcode.io/solutions/house-robber |
| 89 | House Robber II | Medium | LeetCode | https://leetcode.com/problems/house-robber-ii/ | https://neetcode.io/solutions/house-robber-ii |
| 90 | Longest Palindromic Substring | Medium | LeetCode | https://leetcode.com/problems/longest-palindromic-substring/ | https://neetcode.io/solutions/longest-palindromic-substring |
| 91 | Palindromic Substrings | Medium | LeetCode | https://leetcode.com/problems/palindromic-substrings/ | https://neetcode.io/solutions/palindromic-substrings |
| 92 | Decode Ways | Medium | LeetCode | https://leetcode.com/problems/decode-ways/ | https://neetcode.io/solutions/decode-ways |
| 93 | **Coin Change** | Medium | LeetCode | https://leetcode.com/problems/coin-change/ | https://neetcode.io/solutions/coin-change |
| 94 | Maximum Product Subarray | Medium | LeetCode | https://leetcode.com/problems/maximum-product-subarray/ | https://neetcode.io/solutions/maximum-product-subarray |
| 95 | **Word Break** | Medium | LeetCode | https://leetcode.com/problems/word-break/ | https://neetcode.io/solutions/word-break |
| 96 | **Longest Increasing Subsequence** | Medium | LeetCode | https://leetcode.com/problems/longest-increasing-subsequence/ | https://neetcode.io/solutions/longest-increasing-subsequence |
| 97 | Partition Equal Subset Sum | Medium | LeetCode | https://leetcode.com/problems/partition-equal-subset-sum/ | https://neetcode.io/solutions/partition-equal-subset-sum |

### Pattern 13: 2-D Dynamic Programming
- **What:** State depends on two varying parameters (two strings, or a grid position).
- **Recognize:** "two strings," grid path-counting, edit/alignment problems.
- **Template:**
```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = text1[i-1] === text2[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[m][n];
}
```
- **Complexity:** O(m×n) time and space (often reducible to O(min(m,n)) space with row-rolling).
- **Common mistakes:** off-by-one on the padded dp table (using `dp[i+1][j+1]` vs `dp[i][j]` consistently); using `Array(n).fill([])` for the 2D grid (shared-reference bug — always use `Array.from`).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 98 | Unique Paths | Medium | LeetCode | https://leetcode.com/problems/unique-paths/ | https://neetcode.io/solutions/unique-paths |
| 99 | **Longest Common Subsequence** | Medium | LeetCode | https://leetcode.com/problems/longest-common-subsequence/ | https://neetcode.io/solutions/longest-common-subsequence |
| 100 | Best Time to Buy and Sell Stock with Cooldown | Medium | LeetCode | https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/ | https://neetcode.io/solutions/best-time-to-buy-and-sell-stock-with-cooldown |
| 101 | Coin Change II | Medium | LeetCode | https://leetcode.com/problems/coin-change-ii/ | https://neetcode.io/solutions/coin-change-ii |
| 102 | Target Sum | Medium | LeetCode | https://leetcode.com/problems/target-sum/ | https://neetcode.io/solutions/target-sum |
| 103 | **Edit Distance** | Hard | LeetCode | https://leetcode.com/problems/edit-distance/ | https://neetcode.io/solutions/edit-distance |

### Pattern 14: Greedy
- **What:** Make the locally optimal choice at each step and prove (or trust the pattern) that it leads to a globally optimal solution.
- **Recognize:** "minimum number of," interval/scheduling problems, "can you reach the end."
- **Complexity:** usually O(n) or O(n log n) if sorting is needed first.
- **Common mistakes:** applying greedy without verifying the greedy-choice property holds (it doesn't always — that's when you actually need DP).

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 104 | **Maximum Subarray** | Medium | LeetCode | https://leetcode.com/problems/maximum-subarray/ | https://neetcode.io/solutions/maximum-subarray |
| 105 | **Jump Game** | Medium | LeetCode | https://leetcode.com/problems/jump-game/ | https://neetcode.io/solutions/jump-game |
| 106 | Jump Game II | Medium | LeetCode | https://leetcode.com/problems/jump-game-ii/ | https://neetcode.io/solutions/jump-game-ii |
| 107 | Gas Station | Medium | LeetCode | https://leetcode.com/problems/gas-station/ | https://neetcode.io/solutions/gas-station |
| 108 | Hand of Straights | Medium | LeetCode | https://leetcode.com/problems/hand-of-straights/ | https://neetcode.io/solutions/hand-of-straights |

### Pattern 15: Intervals
- **What:** Sort by start (or end) time, then sweep once.
- **Recognize:** "merge," "overlap," "free time," "minimum meeting rooms."
- **Complexity:** O(n log n) (dominated by the sort).
- **Common mistakes:** sorting by the wrong field (start vs. end) for the specific sub-problem.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 109 | **Merge Intervals** | Medium | LeetCode | https://leetcode.com/problems/merge-intervals/ | https://neetcode.io/solutions/merge-intervals |
| 110 | Insert Interval | Medium | LeetCode | https://leetcode.com/problems/insert-interval/ | https://neetcode.io/solutions/insert-interval |
| 111 | Non-overlapping Intervals | Medium | LeetCode | https://leetcode.com/problems/non-overlapping-intervals/ | https://neetcode.io/solutions/non-overlapping-intervals |
| 112 | Meeting Rooms | Easy | LeetCode | https://leetcode.com/problems/meeting-rooms/ | https://neetcode.io/solutions/meeting-rooms |
| 113 | **Meeting Rooms II** | Medium | LeetCode | https://leetcode.com/problems/meeting-rooms-ii/ | https://neetcode.io/solutions/meeting-rooms-ii |

### Pattern 16: Bit Manipulation
- **What:** Use XOR/AND/OR/shift tricks for O(1)-space solutions.
- **Recognize:** "without extra space," "single number," counting set bits.
- **Key facts:** `x ^ x = 0`, `x ^ 0 = x`, `x & (x-1)` clears the lowest set bit.
- **Complexity:** O(1) or O(32) — effectively constant for fixed-width integers.

| # | Problem | Difficulty | Platform | Problem URL | Solution URL |
|---|---|---|---|---|---|
| 114 | **Single Number** | Easy | LeetCode | https://leetcode.com/problems/single-number/ | https://neetcode.io/solutions/single-number |
| 115 | Number of 1 Bits | Easy | LeetCode | https://leetcode.com/problems/number-of-1-bits/ | https://neetcode.io/solutions/number-of-1-bits |
| 116 | Counting Bits | Easy | LeetCode | https://leetcode.com/problems/counting-bits/ | https://neetcode.io/solutions/counting-bits |
| 117 | Missing Number | Easy | LeetCode | https://leetcode.com/problems/missing-number/ | https://neetcode.io/solutions/missing-number |

*(Bit manipulation is lower-frequency in JS-shop interviews than in C++/Java shops — it's the lowest priority pattern for you; treat items 115–117 as optional if short on time.)*

---

## 9. Data-Structure-Based Question Sheet (cross-reference)

Rather than repeat every row, here's the same problem set indexed by primary data structure — use this when you want to drill one structure regardless of pattern:

| Data Structure | Problems (see # in Section 8) |
|---|---|
| Array | 1, 2, 6, 7, 11, 12, 13, 104, 105, 106, 107 |
| String | 3, 4, 15, 16, 17, 18, 90, 91, 92, 103 |
| Hash Map / Set | 1, 2, 3, 4, 5, 6, 7, 15, 63, 114 |
| Linked List | 31–40 |
| Stack | 20–25 |
| Queue / Deque | 19, 74, 79 (BFS queues) |
| Tree / BST | 41–55 |
| Heap / Priority Queue | 59–64 |
| Graph | 74–85 |
| Trie | 56–58 |
| Union-Find | 82, 83, 84 |
| Matrix / Grid | 74, 76, 77, 78, 79, 98 |
| 1-D / 2-D DP tables | 86–103 |

A problem can (and often does) belong to multiple rows above — e.g. #38 LRU Cache is both Linked List *and* Hash Map.

---

## 10. Top 100 Must-Solve Problems (tiered)

This reuses the numbered problems from Section 8 to avoid duplication — full details (URLs, etc.) are there.

**Tier 1 — Absolutely Must Know (the ~40 highest-value, bolded in Section 8):** #1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 14, 15, 18, 20, 21, 23, 26, 27, 29, 31, 32, 33, 34, 38, 41, 42, 47, 48, 51, 56, 61, 62, 65, 66, 67, 70, 74, 75, 80, 86, 88, 93, 95, 96, 99, 103, 104, 105, 109, 113, 114

**Tier 2 — Very Important (next ~40, do if Tier 1 is solid):** #7, 8, 13, 16, 17, 19, 22, 24, 28, 35, 36, 37, 39, 43, 44, 45, 46, 49, 50, 52, 53, 57, 59, 60, 63, 68, 69, 71, 72, 76, 77, 78, 79, 81, 89, 90, 91, 92, 94, 97, 98, 100, 101, 102, 106, 107, 110, 111

**Tier 3 — Good to Know (do only if ahead of schedule):** #25, 30, 39, 40, 54, 55, 58, 64, 73, 82, 83, 84, 85, 108, 112, 115, 116, 117 (Hards + rarer topics)

*(Tier boundaries overlap slightly by design — a couple of Medium problems double as both a pattern-anchor and a good revision problem.)*

---

## 11. Company Interview Relevance

Being precise about evidence quality here, per your instruction not to fabricate:

**Verified / broadly corroborated pattern:** Independent 2025–2026 interview-prep analyses report that certain problems recur across FAANG-style loops. One current source cross-referencing interview reports names <cite index="11-1">Trapping Rain Water, Serialize and Deserialize Binary Tree, Minimum Window Substring, LRU Cache, and Regular Expression Matching</cite> as problems that show up repeatedly in verified 2025–2026 interview reports at large tech companies — all five are in your Tier 1/2 lists above (LRU Cache, Min Window Substring) or Tier 3 (the two Hards).

**Commonly used interview patterns by company type (general industry knowledge, not problem-specific claims):**
- **Google, Meta, Amazon, Microsoft, Apple, Netflix, Uber, Adobe:** heavy emphasis on Arrays/Hashing, Trees, Graphs (BFS/DFS), and Dynamic Programming; system-design-adjacent coding (e.g., LRU Cache, design-a-data-structure problems) is common at senior-adjacent loops but appears at entry-level too as a "hard" bar-raiser question.
- **Amazon specifically:** widely known (via Leadership Principles + technical loop structure) to favor OOP/data-structure-design questions (e.g., LRU Cache, Trie-based design) alongside standard array/graph problems.
- **Bloomberg, JPMorgan, Goldman Sachs (finance-adjacent):** tend to weight Arrays/Strings, Binary Search, and straightforward DP more than obscure graph theory — practical, quickly-gradeable problems are typical for their higher problem-count loops.
- **Startups / mid-size product companies (Atlassian, Salesforce and similar):** loops vary widely by team; NeetCode-150-level pattern coverage is generally considered "sufficient" preparation for this tier.

**General assumption (not verified per-company):** any specific claim that "Problem X was asked at Company Y in [recent month]" changes constantly and is usually sourced from crowdsourced/anecdotal reports (e.g., Glassdoor, LeetCode's own "Company Tag" premium feature) that I cannot verify as current or accurate without direct access to those private, frequently-updated, and paywalled tag databases — so I have deliberately **not** fabricated such tags in Section 8. If you have LeetCode Premium, use its official Company Tags feature directly for the most current per-company data — it's the most reliable source for that specific claim type.

---

## 12. Solution & Learning Resources

| Resource | Best for | URL |
|---|---|---|
| NeetCode (video + written) | Pattern explanations, first-pass learning | https://neetcode.io |
| LeetCode official editorial | Rigorous, multiple-approach solutions | https://leetcode.com (Solutions tab per problem) |
| GeeksforGeeks | Alternative explanations, theory deep-dives, complexity references | https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/ |
| AlgoMonster | Pattern-first, concise flowcharts for "which technique to use" | https://algo.monster |
| Blind 75 (original list) | Cross-check against NeetCode 150 subset | https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions |
| Grokking-style pattern books (e.g., "Grokking the Coding Interview Patterns") | Supplementary pattern-first reading if a NeetCode explanation doesn't click | search via educative.io or your library |

Use this priority order for solutions, as you specified: **NeetCode → LeetCode official → GeeksforGeeks → AlgoMonster → other**.

---

## 13. Big-O Cheat Sheet

| Structure/Operation | Average | Worst | Notes |
|---|---|---|---|
| Array — access | O(1) | O(1) | Index-based |
| Array — search (unsorted) | O(n) | O(n) | |
| Array — search (sorted, binary search) | O(log n) | O(log n) | |
| Array — insert/delete at end | O(1) | O(1) | `push`/`pop` |
| Array — insert/delete at start | O(n) | O(n) | `unshift`/`shift` — avoid in hot loops |
| Object/HashMap — get/set/delete | O(1) | O(n)* | *Worst case with hash collisions, rare in practice |
| Set — has/add/delete | O(1) | O(n)* | Same caveat |
| Stack — push/pop/peek | O(1) | O(1) | |
| Queue (with head-pointer) — enqueue/dequeue | O(1) | O(1) | Naive array `shift()` queue is O(n) |
| Linked List — access by index | O(n) | O(n) | No random access |
| Linked List — insert/delete at known node | O(1) | O(1) | Given a pointer to it |
| Binary Search | O(log n) | O(log n) | Requires sorted/monotonic data |
| Sorting (comparison-based, e.g. `.sort()`) | O(n log n) | O(n log n) | V8's `Array.sort` is O(n log n) |
| Heap — insert/extract-min | O(log n) | O(log n) | Peek is O(1) |
| Balanced BST — search/insert/delete | O(log n) | O(log n) | Only if balanced |
| Unbalanced BST | O(log n) | O(n) | Degenerates to linked list if built from sorted input |
| Graph — BFS/DFS | O(V + E) | O(V + E) | Visit every vertex/edge once |
| Union-Find (with path compression + union by rank) | ~O(1) | ~O(α(n)) | Effectively constant |
| DP (typical 1-D) | O(n) | O(n) | Per state, times number of states |
| DP (typical 2-D) | O(m×n) | O(m×n) | |

**What this means practically:** if your input can be up to 10⁵–10⁶ elements, anything O(n²) will likely time out (~10¹⁰ operations) — you need O(n log n) or better. If input is ≤ 20, exponential (O(2ⁿ)) backtracking is fine.

---

## 14. Revision & Spaced Repetition System

For every problem solved, follow this schedule:

| Stage | When | What to do |
|---|---|---|
| 1st solve | Day 0 | Solve fresh (timer on), then read the reference solution even if you succeeded |
| Review | Day 1 | Re-read your own code (5 min) — don't re-solve, just re-derive the idea mentally |
| Re-solve #1 | Day 3 | Solve again from scratch, no notes. If you struggle, that problem re-enters the queue at Day 0 |
| Re-solve #2 | Day 7 | Solve again from scratch |
| Re-solve #3 | Day 14 | Final check — if solved cleanly and fast, mark "mastered" and stop revisiting |

**Practical implementation:** keep a simple spreadsheet or note with columns: `Problem | Date solved | Next review date | Status (New/Learning/Mastered)`. Every revision day (Section 7), filter for rows where `Next review date <= today`.

**Problems you should be able to solve without looking at the solution by the end of Week 8** (this is your personal "mastered" bar — all of Tier 1 from Section 10, roughly 50 problems): treat these as non-negotiable. If any Tier-1 problem still requires hints in Week 7, prioritize it over adding new Tier-3 problems.

---

## 15. 7-Day Final Interview Bootcamp (Week 8, Days 4–7 + wrap)

| Day | Focus | Structure |
|---|---|---|
| Day 1 | Mixed Easy/Medium timed set | 4 problems, 25 min each, no pattern label given — you must identify the pattern yourself |
| Day 2 | Weak-topic identification | Review your revision log; pick your 2 weakest patterns; do 3 fresh problems in each, back to back |
| Day 3 | Full mock interview #1 | 2 Medium problems, 45 min total, talk out loud (record yourself or use a friend/mentor), then self-grade using the framework in Section 16 |
| Day 4 | DP + Graph deep dive | These are typically the two hardest categories for beginners — 4 problems mixing both |
| Day 5 | Full mock interview #2 | 1 Medium + 1 Hard, 50 min, simulate real conditions (shared doc, no autocomplete, no console.log debugging — trace by hand) |
| Day 6 | Behavioral + "walk me through your resume" prep | If your target companies include a behavioral round, prepare 3–4 STAR-format stories (a challenge, a conflict, a failure, a success). Practice explaining your problem-solving *process* out loud, since interviewers grade communication as much as correctness |
| Day 7 | Full mock interview #3 + rest | 2 problems, 45 min, then light review only — no new material the night before a real interview |

**How to simulate a real interview:**
1. Use a shared-doc-style editor (no autocomplete/syntax highlighting helps least) — e.g., a plain textarea, or actual platforms like Pramp/interviewing.io if available.
2. Say your thought process out loud from the first second — silence is the #1 mock-interview mistake.
3. Clarify constraints/edge cases *before* coding (Section 16 framework, steps 1–4).
4. Write pseudocode or a rough plan before full code.
5. Test with at least one edge case after finishing, out loud.
6. State time/space complexity unprompted at the end.

---

## 16. Problem-Solving Strategy (use this framework on every problem, always)

1. **Understand the problem** — restate it in your own words before coding.
2. **Identify inputs/outputs** — exact types, ranges, can inputs be empty/null/negative?
3. **Think of brute force first** — even if you won't code it, know it. It reveals the naive complexity and often the optimization target.
4. **Determine constraints** — input size tells you the required complexity (see Section 5's size table).
5. **Identify the pattern** — use the recognition guide (Section 5).
6. **Choose data structure** — the one that makes the pattern's core operation O(1) or O(log n).
7. **Optimize** — can you avoid recomputation (memoize)? Avoid nested loops (hash map)? Avoid resorting (heap)?
8. **Write pseudocode** — 4–6 lines, before touching real syntax.
9. **Implement in JavaScript** — using the boilerplate classes from Section 3 where relevant.
10. **Test edge cases** — empty input, single element, all-same elements, negative numbers, very large input (conceptually).
11. **Analyze time and space complexity** — say it out loud even when practicing alone; this habit is what interviewers are grading as much as correctness.
12. **Review and re-solve later** — per the spaced-repetition system (Section 14).

**Why use this every time, even for "easy" problems:** the framework is muscle memory you're building for the *actual interview*, where you won't have time to figure out a process under pressure. Beginners who skip steps 1–4 and jump straight to coding are the most common failure mode in real interviews — not lack of DSA knowledge, but rushing past problem understanding.

**Structuring your practice as Problem → Hint → Pattern → Approach → Solution → Complexity:** when you get stuck (>15–20 min with no progress), don't jump to the full solution. Look only at a *hint* first (most platforms offer tiered hints; NeetCode's video description often states just the pattern name). Only unlock the full solution if the hint alone doesn't get you moving in 5 more minutes.

---

## 17. Common Beginner Mistakes

- Jumping to code before clarifying the problem or constraints
- Memorizing solutions instead of understanding *why* they work — you'll fail the moment the interviewer changes one constraint
- Ignoring time/space complexity until asked, instead of stating it proactively
- Not testing edge cases (empty array, single element, duplicates, negative numbers)
- In JS specifically: using `==` instead of `===`, mutating shared array references (`Array(n).fill([])`), forgetting `Map`/`Set` exist and reaching for plain objects/arrays for everything, using `.shift()`/`.unshift()` in hot loops without realizing they're O(n)
- Solving 150 problems shallowly instead of 100 problems deeply — recognition speed on *new* problems is the real signal, not the count solved
- Skipping mock interviews until the very end — verbalizing your approach is a *separate skill* from solving silently and needs its own practice reps starting Week 3

---

## 18. How to Measure Your Progress

Track these weekly, not daily (daily noise is misleading):

- **Time-to-pattern-recognition:** how many minutes before you correctly identify the pattern on a *new* problem? Target: under 5 min by Week 4, under 2–3 min by Week 8.
- **Time-to-working-solution:** for a Medium problem you've never seen, target under 30 min by Week 6, under 25 min by Week 8.
- **Revision success rate:** % of spaced-repetition problems you solve cleanly without hints. Target >80% by Week 6.
- **Mock interview self-grade** (Section 15): communication clarity, correctness, complexity analysis — grade 1–5 each, track the trend, not the absolute number.
- **Pattern coverage gaps:** any pattern where you're consistently below the others — that's your Week 8 Day 2 focus.

---

## 19. Final Checklist (end of Week 8)

- [ ] Solved all Tier 1 problems (Section 10) and can re-solve ~80%+ from memory
- [ ] Implemented Linked List, Stack, Queue, Trie, MinHeap, and Union-Find from scratch at least once, unaided
- [ ] Comfortable explaining Big-O for any solution you write, unprompted
- [ ] Completed at least 3 full timed mock interviews, talking out loud
- [ ] Can state, for any new Medium problem, the likely pattern within 2–3 minutes of reading it
- [ ] Have a working, personally-tested spaced-repetition log for your weak problems
- [ ] Comfortable with core JS-for-DSA gotchas (Section 3) — no longer need to look them up mid-interview
- [ ] Prepared 3–4 behavioral/STAR stories if your target loops include a behavioral round

---

## If You Only Have Limited Time — Solve These First (Priority Core, ~35 problems)

Two Sum · Contains Duplicate · Valid Anagram · Group Anagrams · Product of Array Except Self · Valid Palindrome · 3Sum · Container With Most Water · Best Time to Buy/Sell Stock · Longest Substring Without Repeating Characters · Minimum Window Substring · Valid Parentheses · Daily Temperatures · Binary Search · Search in Rotated Sorted Array · Reverse Linked List · Merge Two Sorted Lists · LRU Cache · Invert Binary Tree · Maximum Depth of Binary Tree · Validate Binary Search Tree · Binary Tree Level Order Traversal · LCA of a BST · Implement Trie · K Closest Points to Origin · Kth Largest Element in an Array · Subsets · Combination Sum · Word Search · Number of Islands · Clone Graph · Course Schedule · Climbing Stairs · House Robber · Coin Change · Longest Increasing Subsequence · Word Break · Longest Common Subsequence · Maximum Subarray · Merge Intervals

If you can solve all of these cleanly, explain your approach out loud, and state complexity unprompted — you are meaningfully interview-ready for entry-level roles, even before touching the remaining Tier 2/3 problems.

---

*A note on URLs: LeetCode problem slugs are stable and have been verified against current known problem naming conventions. If any individual link has moved, search the exact problem title on leetcode.com — the title will resolve it immediately. NeetCode solution links follow neetcode.io's standard `/solutions/<slug>` pattern; if a specific link 404s, search the problem name on neetcode.io directly, or use the LeetCode official Solutions tab as the fallback (Section 12 priority order).*
