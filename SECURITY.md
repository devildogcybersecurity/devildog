# Security Policy

## Supported Versions

This repository is maintained on a rolling basis.

Security updates are provided for:
- The current default branch (`main`)
- The most recent production deployment or published version, if applicable

Older branches, forks, archived snapshots, and heavily modified downstream copies may not receive security fixes.

## Reporting a Vulnerability

Please report suspected security vulnerabilities privately.

Preferred contact methods:
- GitHub private vulnerability reporting: [Enable this in the repository Security settings if available]
- Email: [security@yourdomain.com]
- Backup contact: [your-name@yourdomain.com]

Please do **not** open a public GitHub issue for security vulnerabilities.

When reporting, include as much of the following as possible:
- A clear description of the issue
- Steps to reproduce
- The affected branch, version, tag, or deployment
- Proof of concept, screenshots, or logs if relevant
- The potential impact
- Any suggested mitigation or fix

## What To Expect

We will try to:
- Acknowledge new reports within [3 business days]
- Confirm whether the report is valid within [7 business days], when possible
- Share status updates as the investigation progresses
- Release a fix or mitigation as soon as reasonably possible

Response times may vary depending on report quality, severity, and maintainer availability.

## Disclosure Policy

Please allow us a reasonable amount of time to investigate and remediate the issue before any public disclosure.

After a fix is available, we may:
- Publish a security advisory
- Credit the reporter, if they want public acknowledgement
- Document any required user action

## Scope

This policy applies to:
- The source code in this repository
- Build and deployment configuration stored in this repository
- GitHub Actions workflows in this repository
- Documentation that could affect secure setup or operation

This policy generally does **not** apply to:
- Third-party services outside our control
- Vulnerabilities in dependencies that are already publicly disclosed unless there is a repo-specific impact
- Issues requiring physical access to a maintainer device
- Social engineering, spam, or credential stuffing
- Denial-of-service testing without prior approval

## Safe Harbor

If you make a good-faith effort to follow this policy, avoid privacy violations, avoid service disruption, and do not destroy data, we will treat your research as authorized and will not pursue action against you for that research.

## Security Best Practices For Users

If you use or deploy this repository:
- Keep dependencies up to date
- Review environment variables and secrets carefully
- Never commit credentials or API keys
- Enable GitHub security features such as Dependabot and secret scanning where available
- Apply fixes promptly after security-related updates are published
