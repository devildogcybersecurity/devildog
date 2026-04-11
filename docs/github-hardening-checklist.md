# GitHub Hardening Checklist

Last verified against GitHub docs and pricing: 2026-04-11

Use this file as a follow-along checklist in a second window.
Complete the free steps first.
Then stop if you want a zero-cost setup, or continue into the paid section if you need stronger protection for private repositories.

## Pick Your Path First

Choose the row that matches your situation before you start:

| Repo / account type | What is free right now | What is not free |
| --- | --- | --- |
| Public repo in a personal account | Branch protection or rulesets, dependency graph, Dependabot alerts, Dependabot security updates, secret scanning, push protection, code scanning default setup, Actions restrictions | N/A for the main protections in this guide |
| Private repo in a personal account | Dependency graph, Dependabot alerts, Dependabot security updates, Actions restrictions, `SECURITY.md`, account hygiene | Private branch protection, private secret scanning, private push protection, private code scanning |
| Public repo in an organization | Same free protections as public personal repos, plus org 2FA enforcement | N/A for the main protections in this guide |
| Private repo in an organization on GitHub Free | Dependency graph, Dependabot alerts, Dependabot security updates, Actions restrictions, org 2FA enforcement | Private branch protection, private secret scanning, private push protection, private code scanning |

## Part 1: Free Steps For Every GitHub Account

These are the first steps to do no matter how many repos or organizations you have.

### 1. Turn on strong sign-in protection

1. Sign in to GitHub.
2. Click your profile picture in the top-right corner.
3. Click `Settings`.
4. Go to the password and authentication area for your account.
5. Enable `Two-factor authentication`.
6. Prefer a passkey or authenticator app over SMS.
7. Save your recovery codes somewhere offline and safe.

### 2. Review active sessions

1. Click your profile picture.
2. Click `Settings`.
3. Click `Sessions`.
4. Review the device list.
5. Revoke any session you do not recognize.

### 3. Review your security log

1. Click your profile picture.
2. Click `Settings`.
3. Click `Security log`.
4. Look for recent events involving:
   - new personal access tokens
   - new OAuth authorizations
   - unexpected sign-ins
   - repository transfers or collaborator changes
5. Investigate anything you do not recognize before moving on.

### 4. Clean up personal access tokens

1. Click your profile picture.
2. Click `Settings`.
3. In the left sidebar, click `Developer settings`.
4. Open `Personal access tokens`.
5. Review both classic and fine-grained tokens.
6. Delete anything you do not actively use.
7. If you need a new token, create a `fine-grained` token with:
   - the fewest repositories possible
   - the fewest permissions possible
   - a short expiration date

### 5. Review SSH keys and signing keys

1. Click your profile picture.
2. Click `Settings`.
3. Click `SSH and GPG keys`.
4. Remove old device keys you no longer use.
5. Keep only current workstation or laptop keys.
6. Optional but recommended: add an SSH signing key and enable signed commits locally.

### 6. Optional: turn on vigilant mode for signed-commit visibility

1. In `Settings -> SSH and GPG keys`, look for `Vigilant mode`.
2. Enable it if you plan to sign commits consistently.
3. Use this only if you are ready to keep signing enabled on your main machines.

## Part 2: Free Steps For Every Repository

Repeat this section for each repository you care about.

### 1. Add a `SECURITY.md` policy

This tells people how to report vulnerabilities safely.

1. Open the repository on GitHub.
2. Click `Security`.
3. In the left sidebar under `Reporting`, click `Policy`.
4. Click `Start setup`.
5. Add:
   - where to report security issues
   - whether security reports should stay private
   - what versions are supported, if relevant
6. Commit the file.

Note: if you want one shared policy across many repositories, see the organization section later about a public `.github` repository.

### 2. Enable the dependency graph

1. Open the repository.
2. Click `Settings`.
3. Open the repository security page. GitHub may label this area `Advanced Security` or `Security & analysis`.
4. Find `Dependency graph`.
5. Click `Enable` if it is not already on.

### 3. Enable Dependabot alerts

1. Stay in the same security settings area.
2. Find `Dependabot alerts`.
3. Click `Enable`.

### 4. Enable Dependabot security updates

1. Stay in the same security settings area.
2. Find `Dependabot security updates`.
3. Click `Enable`.

### 5. Restrict GitHub Actions token permissions

1. Open the repository.
2. Click `Settings`.
3. Click `Actions`.
4. Click `General`.
5. Find `Workflow permissions`.
6. Choose the restricted or read-only option for `GITHUB_TOKEN`.
7. Leave `Allow GitHub Actions to create and approve pull requests` turned off unless you have a real workflow that requires it.
8. Click `Save`.

### 6. Reduce Actions artifact and log retention

1. Stay on `Settings -> Actions -> General`.
2. Find `Artifact and log retention`.
3. Set a shorter retention period.
4. For a small repo, `7` to `14` days is a reasonable starting point.
5. Click `Save`.

### 7. Review who and what can access the repo

1. Open the repository.
2. Click `Settings`.
3. Review these sections one by one:
   - `Collaborators` or `Access`
   - `Deploy keys`
   - `Webhooks`
   - installed `GitHub Apps`
4. Remove anything you no longer need.

### 8. Keep secrets out of git

1. Make sure `.env`, `.env.local`, and any local credential files are ignored.
2. Never commit personal access tokens, cloud keys, API secrets, or passwords.
3. If you ever commit a real secret by mistake:
   - rotate the secret first
   - then remove it from the repo history if needed

## Part 3: Free Public-Repo Protections

If the repository is public, do these too.
These are the best no-cost protections GitHub offers.

### 1. Protect the default branch

Use a branch ruleset if available.

1. Open the public repository.
2. Click `Settings`.
3. Click `Rules`.
4. Click `Rulesets`.
5. Click `New ruleset`.
6. Choose `New branch ruleset`.
7. Name it something clear, such as `Protect main`.
8. Set the ruleset to `Active`.
9. Target the `main` branch.
10. Enable these rules:
    - restrict deletions
    - block force pushes
    - require a pull request before merging
    - require status checks to pass
    - require conversation resolution before merging
11. In the required status checks area, add the repository's CI check.
12. For this repo, use `CI / verify`.
13. Save the ruleset.

If you work alone and want a lighter setup, keep required status checks on even if you do not require human reviewers.

### 2. Enable secret scanning

1. Open the public repository.
2. Click `Settings`.
3. Open the repository security page. GitHub may label this area `Advanced Security` or `Security & analysis`.
4. Find `Secret Protection` or `Secret scanning`.
5. Click `Enable`.

### 3. Enable push protection

1. Stay on the same security page.
2. Find `Push protection`.
3. Click `Enable`.

This blocks many accidental secret pushes before they land in the repository.

### 4. Enable code scanning default setup

1. Stay on the same security page.
2. Find `CodeQL analysis` or `Code scanning`.
3. Click `Set up`.
4. Choose `Default`.
5. Confirm by clicking the enable button.

This gives public repositories free baseline static analysis through GitHub's default setup.

## Part 4: Free Organization-Wide Steps

Do this if you manage one or more GitHub organizations.

### 1. Require two-factor authentication for the organization

1. Click your profile picture.
2. Click `Organizations`.
3. Next to the organization, click `Settings`.
4. In the `Security` section of the sidebar, click `Authentication security`.
5. Under `Two-factor authentication`, enable `Require two-factor authentication for everyone in your organization`.
6. If your team is ready for it, also enable the option to allow only secure 2FA methods.
7. Click `Save`.
8. Confirm the warning after reviewing who could lose access.

Important: users without 2FA can lose access until they comply, and outside collaborators may be removed. Review the warning carefully before you confirm.

### 2. Check who has 2FA enabled before enforcing it

1. Click your profile picture.
2. Click `Organizations`.
3. Open the organization.
4. Click `People`.
5. Use the `Two-factor authentication` filter.
6. Review who is `Secure`, `Insecure`, or `Disabled`.
7. Notify people before you enforce the requirement.

### 3. Create a public `.github` repository for shared defaults

This is one of the best free organization-wide hardening steps because it lets you manage shared guidance once.

1. Click `New repository`.
2. Set the owner to the organization.
3. Name the repository `.github`.
4. Make it `Public`.
5. Create the repository with a README.
6. Add shared defaults such as:
   - `SECURITY.md`
   - issue templates
   - pull request templates
   - `SUPPORT.md`
7. Reuse these defaults across repositories that do not override them locally.

### 4. Standardize repo owners and access reviews

1. In the organization, review `People`, `Teams`, outside collaborators, apps, webhooks, and deploy keys on a schedule.
2. Remove stale access quickly.
3. Prefer team-based access over one-off collaborator invitations.

## Part 5: Stop Here For A Zero-Cost Setup

If you completed:

- Part 1 for your account
- Part 2 for every repository
- Part 3 for every public repository
- Part 4 for every organization you manage

then you already have a strong free baseline.

The remaining items below are paid options for stronger protection on private repositories.

---

## Paid Alternatives And Low-Cost Upgrades

Everything below this line is a paid path or a paid add-on.

## Part 6: Private Personal Repositories

### What free GitHub still gives you

- dependency graph
- Dependabot alerts
- Dependabot security updates
- Actions restrictions
- `SECURITY.md`

### What usually requires a paid plan

- protected branches or private rulesets
- required reviewers
- CODEOWNERS enforcement on private repos
- private repo branch restrictions

### Low-cost upgrade path

Use `GitHub Pro` if your main need is better protection for private repositories in a personal account.

GitHub's docs confirm that GitHub Pro adds private-repo features such as:

- protected branches
- required pull request reviewers
- code owners

Check the live pricing page before purchasing because GitHub can change personal plan pricing:

https://github.com/pricing

### Exact next steps after upgrading to GitHub Pro

1. Open the private repository.
2. Click `Settings`.
3. Click `Rules`.
4. Create a branch ruleset for `main`.
5. Enable:
   - restrict deletions
   - block force pushes
   - require pull requests before merge
   - require status checks
   - require conversation resolution
6. Add the required CI check for the repo.
7. Save the ruleset.

## Part 7: Private Organization Repositories

### Lowest-cost plan for private branch protection

`GitHub Team` is the first paid upgrade to consider for organizations with private repositories.

Verified current pricing from GitHub's pricing page:

- `GitHub Team`: `4 USD per user / month`

Use this when you need:

- private repository rulesets
- protected branches on private repos
- better team-based repo governance

### Higher-security add-ons for private repos

Verified current add-on pricing from GitHub's security plans page:

- `GitHub Secret Protection`: `19 USD per active committer / month`
- `GitHub Code Security`: `30 USD per active committer / month`

Use `GitHub Secret Protection` when your biggest concern is leaked credentials in private repositories.

Use `GitHub Code Security` when you want GitHub-managed code scanning and deeper private repo vulnerability analysis.

### Recommended purchase order for most organizations

1. `GitHub Team`
2. `GitHub Secret Protection`
3. `GitHub Code Security`

### Exact next steps after upgrading an organization

#### If you buy GitHub Team

1. Open the private repository.
2. Click `Settings`.
3. Click `Rules`.
4. Create a ruleset for `main`.
5. Enable:
   - restrict deletions
   - block force pushes
   - require pull requests
   - require status checks
   - require conversation resolution
6. Save the ruleset.

#### If you buy GitHub Secret Protection

1. Open the private repository.
2. Click `Settings`.
3. Open the repository security page.
4. Find `Secret Protection`.
5. Click `Enable`.
6. Find `Push protection`.
7. Click `Enable`.

#### If you buy GitHub Code Security

1. Open the private repository.
2. Click `Settings`.
3. Open the repository security page.
4. Find `CodeQL analysis` or `Code scanning`.
5. Click `Set up`.
6. Choose `Default` unless you already know you need advanced customization.
7. Confirm the setup.

## Part 8: Suggested Order For A Small Team On A Budget

If money is tight, use this order:

1. Finish all free steps first.
2. If your important repos are public, stop there because the main protections are already free.
3. If your important repos are private personal repos, buy `GitHub Pro` only if private branch protection is worth the cost to you.
4. If your important repos are private organization repos, buy `GitHub Team` first.
5. Add `GitHub Secret Protection` before `GitHub Code Security` if secret leaks are your bigger practical risk.

## Sources

- GitHub pricing: https://github.com/pricing
- GitHub security plans: https://github.com/security/plans
- GitHub plans overview: https://docs.github.com/get-started/learning-about-github/githubs-products
- About protected branches: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
- Rulesets for repositories: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
- Available rules for rulesets: https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
- Dependency graph: https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph
- Dependabot alerts: https://docs.github.com/en/code-security/dependabot/dependabot-alerts/configuring-dependabot-alerts
- Dependabot security updates: https://docs.github.com/github/managing-security-vulnerabilities/configuring-dependabot-security-updates
- Secret scanning: https://docs.github.com/code-security/secret-scanning/about-secret-scanning
- Push protection: https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection
- Enable push protection for a repository: https://docs.github.com/en/code-security/secret-scanning/enabling-secret-scanning-features/enabling-push-protection-for-your-repository
- Code scanning default setup: https://docs.github.com/en/code-security/code-scanning/enabling-code-scanning/configuring-default-setup-for-code-scanning
- Actions settings for a repository: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository
- Adding a security policy: https://docs.github.com/code-security/getting-started/adding-a-security-policy-to-your-repository
- Requiring 2FA in an organization: https://docs.github.com/articles/requiring-two-factor-authentication-in-your-organization
- Viewing 2FA status in an organization: https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-two-factor-authentication-for-your-organization/viewing-whether-users-in-your-organization-have-2fa-enabled
- Creating a default `.github` repository: https://docs.github.com/en/github/building-a-strong-community/creating-a-default-community-health-file
