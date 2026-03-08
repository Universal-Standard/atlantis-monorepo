# Security Policy

## Supported Versions

The following versions of the ATLANTIS monorepo are currently supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue in this repository, please follow these steps:

### Private Disclosure

**Do not** report security vulnerabilities through public GitHub issues. Instead, please use one of the following methods:

1. **GitHub Security Advisories**: Use the [Report a Vulnerability](../../security/advisories/new) button on the Security tab of this repository to submit a private security report.
2. **Email**: Contact the repository maintainers directly at the email address listed in the repository profile.

### What to Include

When reporting a vulnerability, please provide as much of the following information as possible:

- A description of the vulnerability and its potential impact
- The affected component(s) or workflow(s)
- Steps to reproduce the issue
- Any potential mitigations you have identified
- Your contact information for follow-up questions

### Response Timeline

- **Acknowledgement**: We will acknowledge receipt of your report within **48 hours**.
- **Assessment**: We will assess the severity and impact within **7 days**.
- **Resolution**: We aim to resolve confirmed vulnerabilities within **30 days**, depending on complexity.
- **Disclosure**: We will coordinate public disclosure with you once a fix is available.

## Security Practices

### Automated Security Scanning

This repository uses several automated security measures:

- **CodeQL Analysis**: Automated code scanning to detect common vulnerabilities.
- **Dependabot**: Automated dependency updates to address known vulnerabilities in dependencies.
- **Secret Detection**: Automated scanning to prevent accidental exposure of credentials or secrets in commits.

### Workflow Security

All GitHub Actions workflows in this repository follow security best practices:

- Least-privilege permissions are applied to each workflow.
- Third-party actions are pinned to specific commit SHAs where possible.
- Secrets are managed through GitHub Encrypted Secrets and never hardcoded.

## Security Updates

Security patches and updates will be applied to the `main` branch. Users are encouraged to keep their forks and deployments up to date with the latest changes from `main`.

## Responsible Disclosure

We are committed to working with security researchers in good faith. We ask that you:

- Give us reasonable time to address the issue before any public disclosure.
- Avoid accessing, modifying, or deleting data that does not belong to you.
- Act in good faith and avoid disrupting the availability of our systems.

We appreciate the efforts of the security community and will acknowledge contributors who responsibly disclose vulnerabilities (with their permission).
We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| latest  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

### Using GitHub's Security Advisory

1. Go to the "Security" tab in this repository
2. Click "Report a vulnerability"
3. Fill out the form with details

### Important

**DO NOT** create a public issue for security vulnerabilities. Use GitHub's private vulnerability reporting feature or contact the repository maintainers directly.

Replace this section with your organization's specific security contact method if needed.

All security vulnerabilities will be promptly addressed.

## What to Include in Your Report

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information (optional but helpful)

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 1 week
- **Fix Development**: Depends on severity and complexity
- **Public Disclosure**: After fix is available, coordinated with reporter

## Automated Security

This repository uses:
- **CodeQL** for automated security scanning
- **Dependabot** for dependency updates
- **Automated security issue detection** and resolution
- **Secret scanning** in code reviews

Thank you for helping keep ATLANTIS AI secure! 🔒
