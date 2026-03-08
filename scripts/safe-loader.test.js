'use strict';

/**
 * safe-loader.test.js
 *
 * Tests for scripts/safe-loader.js.
 * Run with: node --test scripts/safe-loader.test.js
 */

const { describe, it, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { CODE_EXTENSIONS, isCodeFile, safeRequire, readCodeFiles } = require('./safe-loader');

// ---------------------------------------------------------------------------
// isCodeFile
// ---------------------------------------------------------------------------

describe('isCodeFile', () => {
  it('returns true for .js', () => assert.equal(isCodeFile('index.js'), true));
  it('returns true for .cjs', () => assert.equal(isCodeFile('mod.cjs'), true));
  it('returns true for .mjs', () => assert.equal(isCodeFile('mod.mjs'), true));
  it('returns true for .ts', () => assert.equal(isCodeFile('app.ts'), true));
  it('returns true for .jsx', () => assert.equal(isCodeFile('App.jsx'), true));
  it('returns true for .tsx', () => assert.equal(isCodeFile('App.tsx'), true));

  it('returns false for .md', () => assert.equal(isCodeFile('CONTRIBUTING.md'), false));
  it('returns false for .txt', () => assert.equal(isCodeFile('notes.txt'), false));
  it('returns false for .yml', () => assert.equal(isCodeFile('workflow.yml'), false));
  it('returns false for .yaml', () => assert.equal(isCodeFile('config.yaml'), false));
  it('returns false for .json', () => assert.equal(isCodeFile('data.json'), false));
  it('returns false for no extension', () => assert.equal(isCodeFile('Makefile'), false));

  it('is case-insensitive for extension', () => {
    assert.equal(isCodeFile('SCRIPT.JS'), true);
    assert.equal(isCodeFile('README.MD'), false);
  });

  it('works with absolute paths', () => {
    assert.equal(isCodeFile('/home/user/project/index.js'), true);
    assert.equal(isCodeFile('/home/user/project/CONTRIBUTING.md'), false);
  });
});

// ---------------------------------------------------------------------------
// safeRequire
// ---------------------------------------------------------------------------

describe('safeRequire', () => {
  it('throws a helpful error for a .md path', () => {
    assert.throws(
      () => safeRequire('CONTRIBUTING.md'),
      (err) => {
        assert.ok(err instanceof Error, 'must be an Error');
        assert.match(err.message, /safeRequire/, 'message includes "safeRequire"');
        assert.match(err.message, /CONTRIBUTING\.md/, 'message includes the offending path');
        assert.match(err.message, /\.md/, 'message includes the offending extension');
        assert.match(err.message, /recognised code extension/, 'message is descriptive');
        return true;
      },
    );
  });

  it('throws a helpful error for a .txt path', () => {
    assert.throws(
      () => safeRequire('notes.txt'),
      (err) => {
        assert.match(err.message, /\.txt/);
        return true;
      },
    );
  });

  it('throws a helpful error for a .yml path', () => {
    assert.throws(
      () => safeRequire('workflow.yml'),
      (err) => {
        assert.match(err.message, /\.yml/);
        return true;
      },
    );
  });

  it('throws a helpful error for a path with no extension', () => {
    assert.throws(
      () => safeRequire('Makefile'),
      (err) => {
        assert.match(err.message, /no extension/);
        return true;
      },
    );
  });

  it('does NOT produce a SyntaxError for non-code files', () => {
    // Before this fix the caller would get a cryptic SyntaxError from Node's
    // module parser.  Verify the error is always our own descriptive Error.
    try {
      safeRequire('CONTRIBUTING.md');
      assert.fail('expected an error to be thrown');
    } catch (err) {
      assert.notEqual(err.constructor.name, 'SyntaxError', 'must not be a SyntaxError');
    }
  });

  it('loads a valid .js file without error', () => {
    // Require this very file as proof that a .js path is accepted.
    assert.doesNotThrow(() => safeRequire(path.resolve(__dirname, 'safe-loader.js')));
  });
});

// ---------------------------------------------------------------------------
// readCodeFiles
// ---------------------------------------------------------------------------

describe('readCodeFiles', () => {
  let tmpDir;

  before(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'safe-loader-test-'));
    // Create a mix of code and non-code files.
    ['index.js', 'utils.ts', 'helper.cjs', 'CONTRIBUTING.md', 'README.md', 'notes.txt'].forEach(
      (name) => fs.writeFileSync(path.join(tmpDir, name), ''),
    );
  });

  after(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('returns only code files', () => {
    const files = readCodeFiles(tmpDir);
    const names = files.map((f) => path.basename(f));
    assert.deepEqual(names.sort(), ['helper.cjs', 'index.js', 'utils.ts']);
  });

  it('never returns .md files', () => {
    const files = readCodeFiles(tmpDir);
    const hasMd = files.some((f) => f.endsWith('.md'));
    assert.equal(hasMd, false, 'No .md files should be returned');
  });

  it('never returns .txt files', () => {
    const files = readCodeFiles(tmpDir);
    const hasTxt = files.some((f) => f.endsWith('.txt'));
    assert.equal(hasTxt, false, 'No .txt files should be returned');
  });

  it('returns absolute paths', () => {
    const files = readCodeFiles(tmpDir);
    files.forEach((f) => assert.ok(path.isAbsolute(f), `${f} must be absolute`));
  });

  it('returns an empty array when directory has no code files', () => {
    const emptyDir = fs.mkdtempSync(path.join(os.tmpdir(), 'safe-loader-empty-'));
    fs.writeFileSync(path.join(emptyDir, 'README.md'), '');
    try {
      assert.deepEqual(readCodeFiles(emptyDir), []);
    } finally {
      fs.rmSync(emptyDir, { recursive: true, force: true });
    }
  });
});

// ---------------------------------------------------------------------------
// CODE_EXTENSIONS
// ---------------------------------------------------------------------------

describe('CODE_EXTENSIONS', () => {
  it('is a Set', () => assert.ok(CODE_EXTENSIONS instanceof Set));
  it('contains .js', () => assert.ok(CODE_EXTENSIONS.has('.js')));
  it('contains .ts', () => assert.ok(CODE_EXTENSIONS.has('.ts')));
  it('does not contain .md', () => assert.ok(!CODE_EXTENSIONS.has('.md')));
});
