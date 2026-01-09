# ATLANTIS Automated Workflow System - Setup Guide

## 🚀 Quick Start

This repository is now equipped with a fully automated workflow system that handles everything from issue detection to production deployment without manual intervention.

## 📋 What Was Implemented

### Core Workflows

1. **auto-issue-detector.yml** - Automated Issue Detection
   - Runs daily at midnight UTC
   - Uses CodeQL for security scanning
   - Detects missing files, documentation, and best practices
   - Automatically creates issues with appropriate labels

2. **auto-issue-resolver.yml** - Automated Issue Resolution
   - Triggered when issues are created
   - Analyzes issue content and generates solutions
   - Creates branches and applies fixes automatically
   - Opens pull requests with detailed documentation

3. **auto-review-and-merge.yml** - Automated Review & Merge
   - Reviews PRs automatically for code quality and security
   - Approves and merges when all checks pass
   - Closes related issues
   - Cleans up branches after merge

4. **self-healing.yml** - Self-Healing System
   - Runs every 6 hours
   - Monitors for stuck PRs, stale issues, failed workflows
   - Automatically retries failed operations
   - Creates alerts for critical issues

5. **project-board-automation.yml** - Project Tracking
   - Manages issue lifecycle with status labels
   - Links PRs to issues automatically
   - Archives completed work

6. **master-orchestrator.yml** - System Coordinator
   - Runs hourly
   - Monitors overall system status
   - Triggers workflows based on current state
   - Provides status reporting

7. **auto-documentation.yml** - Documentation Generator
   - Generates documentation for changes
   - Updates PR descriptions
   - Maintains change history

8. **repo-setup.yml** - Repository Configuration
   - Sets up labels and settings
   - Enables security features
   - Configures auto-merge capabilities

### Supporting Files

- **dependabot.yml** - Automated dependency updates for GitHub Actions, npm, and pip
- **Issue Templates** - Consistent issue creation format
- **README.md** - Comprehensive documentation

## 🎯 How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOMATED PIPELINE                       │
└─────────────────────────────────────────────────────────────┘

1. 🔍 DETECTION (auto-issue-detector.yml)
   └─→ Daily scan finds missing CONTRIBUTING.md
   └─→ Creates issue #1: "[AUTO] Missing CONTRIBUTING.md"
   
2. 🔧 RESOLUTION (auto-issue-resolver.yml)
   └─→ Triggered by issue creation
   └─→ Creates branch "auto-fix/issue-1"
   └─→ Generates CONTRIBUTING.md content
   └─→ Commits and pushes changes
   └─→ Creates PR #2: "Auto-fix: Create CONTRIBUTING.md"
   
3. ✅ REVIEW (auto-review-and-merge.yml)
   └─→ Runs code quality checks
   └─→ Security scanning
   └─→ Approves PR if all checks pass
   
4. 🚀 MERGE (auto-review-and-merge.yml)
   └─→ Merges PR to main
   └─→ Closes issue #1
   └─→ Deletes branch "auto-fix/issue-1"
   └─→ Archives documentation
   
5. 🏥 MONITOR (self-healing.yml)
   └─→ Every 6 hours checks system health
   └─→ Retries any stuck processes
   └─→ Alerts on failures

        ALL AUTOMATED • ALL SELF-HEALING
```

## 🔧 Configuration

### Enabling Workflows

All workflows are ready to use immediately. They will activate when:
- Code is pushed to main
- Issues are created
- Pull requests are opened
- Scheduled times are reached

### Manual Triggers

You can manually trigger any workflow from the GitHub Actions tab:
1. Go to Actions → Choose workflow → Run workflow

### Customization

Edit the workflow files in `.github/workflows/` to customize:
- **Scan schedules**: Modify cron expressions
- **Detection rules**: Add checks in auto-issue-detector.yml
- **Solution templates**: Modify file content in auto-issue-resolver.yml
- **Review criteria**: Adjust checks in auto-review-and-merge.yml

## 📊 Monitoring

### View Workflow Runs
- Go to Actions tab in GitHub
- Filter by workflow name
- Check logs for detailed information

### System Status
The master-orchestrator workflow provides status updates:
- Open issues count
- Open PRs count
- Items pending review
- Items ready to merge

### Labels for Tracking
- `auto-detected` - Issues found by automation
- `in-progress` - Currently being processed
- `solution-generated` - Fix has been created
- `automated-fix` - PR contains automated fix
- `approved` - Passed automated review
- `ready-to-merge` - Ready for merge
- `resolved` - Issue completed
- `archived` - Archived work

## 🔐 Security

### Automated Security Features
- CodeQL scanning for vulnerabilities
- Secret detection in review process
- Dependabot for dependency updates
- No secrets committed to repository

### Permissions Required
Workflows need these GitHub permissions (configured in each workflow):
- `contents: write` - Creating branches and commits
- `issues: write` - Managing issues
- `pull-requests: write` - Creating and merging PRs
- `security-events: write` - CodeQL scanning
- `actions: write` - Triggering workflows

## 🎓 Best Practices

### For Manual Contributors
1. Create issues using the provided templates
2. Add `auto-detected` label to trigger automation
3. Let the system handle resolution
4. Review automated PRs if needed
5. System will merge when approved

### For Administrators
1. Monitor the Actions tab regularly
2. Check self-healing alerts
3. Review archived resolutions in `.github/archived-resolutions/`
4. Adjust workflows based on project needs
5. Keep workflows updated with latest actions

## 🐛 Troubleshooting

### Workflow Not Running
- Check if workflows are enabled in Settings → Actions
- Verify required permissions are granted
- Check workflow trigger conditions

### Merge Failures
- Self-healing will retry automatically
- Check for merge conflicts
- Verify branch protection rules

### False Positives
- Add exceptions in workflow files
- Adjust detection rules
- Use manual override if needed

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)

## 🎉 Success Metrics

The system is working correctly when you see:
- ✅ Daily detection runs complete
- ✅ Issues automatically resolved within hours
- ✅ PRs automatically merged
- ✅ No stuck items after self-healing runs
- ✅ Clean git history with automated commits

---

**Built with 🤖 by ATLANTIS AI** - *Fully automated. Fully self-healing.*

Last Updated: January 2026
