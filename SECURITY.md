# Security Policy

## Reporting a Vulnerability

If you believe you've found a security vulnerability in this repository, please report it
privately rather than opening a public issue.

- **Preferred:** open a [GitHub Security Advisory](../../security/advisories/new) for this repository.
- **Alternative:** email philip.cotton@spurs.agency with a description of the issue, steps to
  reproduce, and any relevant logs or proof-of-concept code.

Please do not disclose the vulnerability publicly until it has been triaged and, where
applicable, a fix has been released.

## Supported Versions

This repository does not yet have tagged releases with independent security-maintenance
windows. Until a versioning policy is published, only the `main` branch is supported.

## Response Expectations

This is an actively developed project without a dedicated security team or SLA. Reports are
reviewed on a best-effort basis. Critical vulnerabilities (e.g. credential exposure, remote
code execution, authentication bypass) will be prioritized over lower-severity findings.

## Scope

This policy covers code in this repository. It does not cover third-party dependencies —
please report those upstream — or the deployed infrastructure of any specific environment
built from this code.
