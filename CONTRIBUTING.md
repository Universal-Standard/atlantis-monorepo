# Contributing to ATLANTIS Monorepo

## Welcome Contributors!

Thank you for your interest in contributing to the ATLANTIS AI project. This repository implements a fully automated software development workflow system.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Branch Naming Conventions](#branch-naming-conventions)
- [Pull Request Process](#pull-request-process)
- [Automated Workflows](#automated-workflows)
- [Reporting Issues](#reporting-issues)
- [Security Vulnerabilities](#security-vulnerabilities)
- [Code of Conduct](#code-of-conduct)
- [Questions?](#questions)

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/<your-username>/atlantis-monorepo.git
   cd atlantis-monorepo
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/Universal-Standard/atlantis-monorepo.git
   ```
4. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Make your changes, then test and lint them (see [Testing](#testing))
6. Submit a pull request

## Development Setup

### Prerequisites

- **Node.js** >= 18.0.0 — required to run scripts and tests
- **npm** >= 8.6.0 — comes bundled with Node.js 18+
- **Git** >= 2.30

### Install Dependencies

This repository has no runtime dependencies. For development, no additional installation is required beyond Node.js:

```bash
# Verify your Node.js version
node --version  # should be v18.0.0 or higher
```

## Development Workflow

1. Keep your fork up to date with upstream:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```
2. Make focused, incremental changes in your feature branch.
3. Run linting and tests before committing (see [Testing](#testing)).
4. Push your branch and open a pull request against `main`.

## Code Standards

- Follow existing code style and conventions in the file you are editing.
- Write clear, descriptive commit messages (see [Commit Message Guidelines](#commit-message-guidelines)).
- Add tests for new functionality when applicable.
- Update documentation (README, inline comments) as needed.
- Ensure all automated checks pass before requesting a review.

### JavaScript / Node.js

- Use CommonJS `require`/`module.exports` unless the file already uses ES modules.
- Always supply file extensions in `require()` paths (e.g., `require('./safe-loader.js')`).
- Avoid dynamic `require()` or `eval()`; use `scripts/safe-loader.js` utilities when loading external content.

### GitHub Actions Workflows

- Scope `permissions` explicitly at the workflow or job level.
- Pin third-party actions to a specific version tag (e.g., `actions/checkout@v4`).
- Never hardcode secrets — use GitHub Encrypted Secrets.

## Testing

Run the test suite:

```bash
npm test
```

Run the linter (syntax check):

```bash
npm run lint
```

Both commands must pass with no errors before submitting a pull request. Tests live in `scripts/safe-loader.test.js` and use Node.js's built-in `node:test` runner (no extra dependencies required).

## Commit Message Guidelines

Use the **Conventional Commits** format:

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

**Types:**

| Type       | When to use                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes only                       |
| `style`    | Formatting, whitespace — no logic change         |
| `refactor` | Code restructuring without feature/fix           |
| `test`     | Adding or updating tests                         |
| `chore`    | Maintenance tasks, dependency updates, CI config |

**Examples:**

```
feat(workflows): add retry logic to auto-merge job
fix(safe-loader): handle null content input gracefully
docs: expand CONTRIBUTING.md with development setup
```

- Keep the summary line under 72 characters.
- Use the imperative mood: "add feature" not "added feature".
- Reference related issues in the footer: `Closes #42`.

## Branch Naming Conventions

| Pattern                         | Use case                          |
|---------------------------------|-----------------------------------|
| `feature/<short-description>`   | New features                      |
| `fix/<short-description>`       | Bug fixes                         |
| `docs/<short-description>`      | Documentation-only changes        |
| `chore/<short-description>`     | Maintenance / dependency updates  |
| `copilot/<short-description>`   | Automated Copilot-generated fixes |

Use lowercase letters and hyphens; avoid spaces and special characters.

## Pull Request Process

1. Ensure `npm test` and `npm run lint` pass locally.
2. Update `README.md` or other relevant documentation if your change affects user-facing behavior.
3. Open the pull request against the `main` branch with a clear title and description.
4. Link any related issues using keywords such as `Closes #<issue-number>` in the PR description.
5. The automated review pipeline will run checks; address any failures before requesting a human review.
6. Once approved (by automation and/or maintainers), the PR will be merged automatically or by a maintainer.

## Automated Workflows

This repository uses extensive automated workflows for:

- **Issue detection** — daily scans for missing documentation, security issues, and code quality problems.
- **Issue resolution** — automated branch creation, code changes, and pull requests.
- **Code review** — quality checks, security scanning, documentation validation, and auto-approval.
- **Auto-merge** — squash-merge approved PRs, close linked issues, and clean up branches.
- **Self-healing** — health monitoring every 6 hours; automatic retry and recovery for stuck processes.

Please be aware that your PR may be reviewed and processed by automated systems. Human maintainers remain the final authority for merging.

## Reporting Issues

Before opening an issue:

1. Search [existing issues](../../issues) to avoid duplicates.
2. Check the [documentation](README.md) and [SETUP_GUIDE.md](SETUP_GUIDE.md).

When opening an issue, please include:

- A clear, descriptive title.
- Steps to reproduce the problem.
- Expected vs. actual behavior.
- Relevant logs, screenshots, or workflow run links.
- Your environment (OS, Node.js version, etc.) if applicable.

Use the provided issue templates when available.

## Security Vulnerabilities

**Do not** report security vulnerabilities through public GitHub issues.

Please follow the responsible disclosure process described in [SECURITY.md](SECURITY.md). In summary:

1. Use the **Report a Vulnerability** button on the [Security tab](../../security/advisories/new) to submit a private advisory.
2. We will acknowledge receipt within **48 hours** and aim to resolve confirmed issues within **30 days**.

## Code of Conduct

Please be respectful and professional in all interactions:

- Use welcoming and inclusive language.
- Be respectful of differing viewpoints and experiences.
- Gracefully accept constructive criticism.
- Focus on what is best for the community.
- Show empathy towards other community members.

Violations may result in removal from the project community.

## Questions?

If you have questions, please:

- Check existing documentation (README, SETUP_GUIDE, SECURITY).
- Review open and closed issues.
- Open a new issue with the `question` label.

Thank you for contributing to ATLANTIS AI! 🤖
