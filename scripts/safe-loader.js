'use strict';

/**
 * safe-loader.js
 *
 * Utility that enforces code-only loading rules across the repository.
 *
 * Background
 * ----------
 * A full audit of this repository (2026-03-08) confirmed that no existing
 * script, workflow, or configuration currently uses glob patterns,
 * fs.readdirSync, dynamic import(), or require() in a loop to load files
 * from the repository root.  This module provides the canonical helper
 * functions that any future script MUST use when it needs to require or
 * iterate over files in a directory.  Using these helpers prevents
 * accidental loading of Markdown, text, or other non-code files as
 * JavaScript modules (the "CONTRIBUTING.md loaded as code" class of bug).
 */

const fs = require('fs');
const path = require('path');

/** Extensions that are safe to require() or import(). */
const CODE_EXTENSIONS = new Set(['.js', '.cjs', '.mjs', '.ts', '.jsx', '.tsx']);

/**
 * Returns true when `filePath` ends with a recognized code extension.
 *
 * @param {string} filePath - File name or absolute/relative path.
 * @returns {boolean}
 */
function isCodeFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return CODE_EXTENSIONS.has(ext);
}

/**
 * Requires a module only when it carries a recognized code extension.
 *
 * Calling `require('CONTRIBUTING.md')` or any non-code path throws a
 * descriptive error instead of propagating a cryptic SyntaxError.
 *
 * @param {string} filePath - Path passed to require().
 * @returns {*} The module export.
 * @throws {Error} When `filePath` does not have a recognized code extension.
 */
function safeRequire(filePath) {
  if (!isCodeFile(filePath)) {
    const ext = path.extname(filePath) || '(no extension)';
    throw new Error(
      `safeRequire: refusing to load "${filePath}" – ` +
        `the extension "${ext}" is not a recognized code extension. ` +
        `Only [${[...CODE_EXTENSIONS].join(', ')}] files may be required.`,
    );
  }
  // eslint-disable-next-line import/no-dynamic-require
  return require(filePath);
}

/**
 * Reads a directory and returns only entries whose names carry a recognized
 * code extension.  Non-code files (*.md, *.txt, *.yml, etc.) are silently
 * skipped.
 *
 * @param {string} dir - Directory to scan.
 * @returns {string[]} Absolute paths of code files found in `dir`.
 */
function readCodeFiles(dir) {
  return fs
    .readdirSync(dir)
    .filter((entry) => isCodeFile(entry))
    .map((entry) => path.resolve(dir, entry));
}

module.exports = { CODE_EXTENSIONS, isCodeFile, safeRequire, readCodeFiles };
