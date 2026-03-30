# scripts/

This directory contains helper utilities used by automated workflows and local
developer tooling.

---

## safe-loader.js

**Purpose:** Enforce code-only loading throughout the repository and prevent
the "CONTRIBUTING.md loaded as code" class of bug.

### Background

A repository-wide audit (2026-03-08) confirmed that **no existing script,
workflow, or configuration** in this repository uses `glob` patterns,
`fs.readdirSync`, `dynamic import()`, or `require()` inside a `forEach`/`for`
loop to load files from the repository root or any other directory.

To ensure this remains true as the repository evolves, `safe-loader.js`
provides canonical helper functions that any future script **must** use
whenever it needs to `require` a module or iterate over files in a directory.

### Exported API

| Export | Description |
|---|---|
| `CODE_EXTENSIONS` | `Set<string>` of safe extensions: `.js` `.cjs` `.mjs` `.ts` `.jsx` `.tsx` |
| `isCodeFile(filePath)` | Returns `true` only when `filePath` has a recognized code extension. |
| `safeRequire(filePath)` | Like `require()` but throws a descriptive `Error` instead of a cryptic `SyntaxError` when given a non-code path (e.g. `CONTRIBUTING.md`). |
| `readCodeFiles(dir)` | Reads a directory and returns **only** entries with recognized code extensions (Markdown, YAML, text files, etc. are silently skipped). |

### Usage

```js
const { safeRequire, readCodeFiles } = require('./scripts/safe-loader');

// ✅ Safe – only .js/.ts/… paths pass through
const mod = safeRequire('./lib/helper.js');

// ✅ Safe – .md files in the directory are automatically excluded
const codeFiles = readCodeFiles('./plugins');
codeFiles.forEach(f => safeRequire(f));

// ❌ Throws a helpful error immediately
safeRequire('CONTRIBUTING.md');
// Error: safeRequire: refusing to load "CONTRIBUTING.md" – the extension ".md"
//        is not a recognized code extension. Only [.js, .cjs, ...] files may be required.
```

### Tests

```sh
npm test          # runs node --test scripts/safe-loader.test.js (29 assertions)
npm run lint      # syntax-checks all scripts with node --check
```
