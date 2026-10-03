# MineHub.ai — Git Commit Organization Master Prompt
## Folder-wise Multiple Commits | Exact File Grouping | NO PUSH

---

# 1. OBJECTIVE

Prepare the MineHub repository for **clean, professional, folder-wise Git commits**.

The repository has already been reorganized into a cleaner structure similar to:

```text
MineHub/
├── Assets/
├── docs/
├── Features List Lotties/
├── Logo/
├── MineApp/
│   ├── .catalyst/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── dashboard/
│   │   │   ├── geology/
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   └── studio/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .catalystrc
│   ├── catalyst.json
│   ├── cli-config.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
├── Reference style/
├── .gitignore
└── README.md
```

The exact repository must be inspected before generating commit commands.

---

# 2. PRIMARY RULE

Create **multiple focused commits**, grouped by logical folder/module.

Do NOT create:

```text
one giant commit containing everything
```

Prefer:

```text
folder/module
    ↓
its relevant files
    ↓
one focused commit
```

---

# 3. IMPORTANT GIT COMMAND CORRECTION

The required Git syntax is:

```bash
git add "path/to/file"
git commit -m "TechStack Name - content"
```

NOT:

```bash
git add -m ...
```

Use the correct Git syntax while preserving the user's requested commit style.

---

# 4. ABSOLUTE PUSH RULE

DO NOT:

```text
git push
```

Do NOT:

- push to GitHub
- create PR
- merge
- modify remote branches
- publish
- deploy

The user explicitly wants:

> **WAIT FOR MY CONFIRMATION FOR PUSH.**

---

# 5. COMMIT WORKFLOW

Use exactly:

```text
ANALYZE REPOSITORY
        ↓
CLASSIFY FILES
        ↓
GROUP FILES BY FOLDER / RESPONSIBILITY
        ↓
PROPOSE COMMIT ORDER
        ↓
SHOW EXACT git add COMMANDS
        ↓
SHOW EXACT git commit COMMANDS
        ↓
WAIT FOR CONFIRMATION
        ↓
ONLY THEN EXECUTE COMMITS
        ↓
VERIFY git status / log
        ↓
STOP
        ↓
WAIT FOR PUSH CONFIRMATION
```

---

# 6. NO ASSUMPTIONS

Before producing commands:

Inspect the actual repository.

Do NOT assume every folder shown in the screenshot contains files.

Do NOT invent filenames.

Do NOT invent folders.

Do NOT include files that do not exist.

Do NOT miss actual files.

---

# 7. REQUIRED FULL REPOSITORY DISCOVERY

Inspect:

```text
MineApp/src/assets/
MineApp/src/components/common/
MineApp/src/components/dashboard/
MineApp/src/components/geology/
MineApp/src/components/landing/
MineApp/src/components/layout/
MineApp/src/components/studio/
MineApp/src/constants/
MineApp/src/pages/
MineApp/src/services/
MineApp/src/styles/
MineApp/src/App.jsx
MineApp/src/main.jsx

MineApp/public/
MineApp/index.html
MineApp/package.json
MineApp/package-lock.json
MineApp/vite.config.js
MineApp/catalyst.json
MineApp/.catalystrc
MineApp/cli-config.json

docs/
Assets/
Logo/
Features List Lotties/
README.md
.gitignore
```

Also inspect every other actual root-level file/folder.

---

# 8. GIT STATE FIRST

Before generating commit groups, inspect:

```bash
git status --short
git diff --stat
git diff --name-only
git ls-files
```

Understand:

```text
untracked
modified
deleted
renamed
already committed
ignored
```

Do not stage anything yet unless explicitly confirmed.

---

# 9. IGNORE GENERATED DIRECTORIES

Do NOT create commits containing generated dependency/build directories:

```text
MineApp/node_modules/
MineApp/dist/
```

unless the actual repository conventions explicitly require them.

Normally these should not be committed.

---

# 10. CATALYST GENERATED / LOCAL FILES

Inspect:

```text
MineApp/.catalyst/
```

Determine whether it is:

```text
tracked production configuration
or
generated/local state
```

Do not guess.

Do not commit it automatically.

---

# 11. EXCLUDED REFERENCE MATERIAL

The following are NOT production GitHub content:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

If any still exist locally, verify they are not accidentally included in
the commit plan.

Do NOT stage them.

---

# 12. ROOT ASSET CLASSIFICATION

Inspect:

```text
Assets/
Logo/
Features List Lotties/
```

For each actual file determine:

```text
runtime asset
documentation/reference
unused
duplicate
external/reference
```

Only commit runtime assets when actually used/approved.

---

# 13. DOCUMENTATION CLASSIFICATION

Classify Markdown files into:

```text
docs/
prompts/
architecture/
design/
product/
planning/
```

according to their actual purpose.

Do not invent a classification that does not match the document.

---

# 14. NO CONTENT CHANGES

This task is about Git commit organization.

Do NOT:

- rewrite code
- refactor code
- redesign UI
- change CSS
- change logic
- change routes
- change API
- change AI behavior
- change database
- change dependencies

Only classify/stage/commit actual changes.

---

# 15. COMMIT GROUPING PRINCIPLE

One commit should answer:

> **What coherent thing was added/changed here?**

Examples:

```text
React/Vite - dashboard components
React/Vite - geology components
React/Vite - studio components
React/Vite - shared layout components
React/Vite - application pages
React/Vite - services and data access
React/Vite - styles
React/Vite - constants
React/Vite - runtime assets
Project - Vite and package configuration
Project - documentation
Project - Git configuration
```

Use actual contents to determine the best grouping.

---

# 16. FOLDER-WISE COMMITS

When practical, create separate commits for:

```text
src/assets
src/components/common
src/components/dashboard
src/components/geology
src/components/landing
src/components/layout
src/components/studio
src/constants
src/pages
src/services
src/styles
```

But DO NOT blindly force one commit per folder.

If a folder has only one or two tightly coupled files and another folder
contains their necessary companion files, group them logically.

---

# 17. DIRECT CONNECTION CONTENT

The commit message must say directly what the folder contains.

Examples:

### Common

```text
React/Vite - shared reusable UI components
```

### Dashboard

```text
React/Vite - dashboard navigation and feature components
```

### Geology

```text
React/Vite - geology repository and reporting components
```

### Studio

```text
React/Vite - Report Studio UI and analytical components
```

### Layout

```text
React/Vite - application shell, sidebar and layout components
```

### Services

```text
React/Vite - API and application data services
```

### Styles

```text
CSS - global styles and design tokens
```

### Constants

```text
React/Vite - application constants and configuration data
```

### Pages

```text
React/Vite - application route pages
```

### Assets

```text
React/Vite - runtime images, icons and Lottie assets
```

Do not use vague commit messages such as:

```text
update files
changes
final
fix
misc
stuff
```

---

# 18. COMMIT MESSAGE FORMAT

Always use:

```text
"TechStack Name - direct content description"
```

Examples:

```text
"React/Vite - shared reusable UI components"
"React/Vite - dashboard navigation and feature components"
"React/Vite - geology repository and reporting components"
"React/Vite - Report Studio UI and analytical components"
"React/Vite - application shell and navigation layout"
"React/Vite - API and application data services"
"CSS - global styles and design tokens"
"Project - package and Vite configuration"
"Project - README and documentation"
"Git - repository ignore configuration"
```

Keep the subject:

- direct
- factual
- short
- connected to the actual folder

---

# 19. DO NOT CLAIM TECHNOLOGIES THAT ARE NOT ACTUALLY USED

Before using:

```text
React/Vite
CSS
Node
Zoho Catalyst
```

verify them from the repository.

If a different technology is actually used, use that.

---

# 20. FILE-LEVEL COMMANDS

The user wants exact file paths.

For each commit, list:

```bash
git add "MineApp/src/components/dashboard/FileA.jsx"
git add "MineApp/src/components/dashboard/FileB.jsx"
git commit -m "React/Vite - dashboard navigation and feature components"
```

Do NOT use wildcards unless the repository clearly supports them and
the entire folder is intended for that commit.

Explicit file listing is preferred.

---

# 21. MULTIPLE FILES IN ONE STAGING COMMAND

For a clean folder commit, this is also acceptable:

```bash
git add \
  "MineApp/src/components/dashboard/FileA.jsx" \
  "MineApp/src/components/dashboard/FileB.jsx" \
  "MineApp/src/components/dashboard/FileC.jsx"
```

Then:

```bash
git commit -m "React/Vite - dashboard navigation and feature components"
```

Use one or multiple `git add` commands according to clarity.

---

# 22. DO NOT STAGE UNRELATED FILES

A commit for:

```text
src/components/geology/
```

must not accidentally include:

```text
README.md
package.json
src/styles/
```

unless those files are genuinely part of the same logical change.

---

# 23. CROSS-FOLDER CHANGE RULE

If one feature requires changes across multiple folders:

group them according to the actual logical implementation.

Example:

```text
Geology feature
├── components/geology
├── pages/Geology
├── services/geology
└── assets/geology
```

The commit message should say what the complete change represents.

Do not create artificial fragmented commits that are impossible to
understand independently.

---

# 24. DEPENDENCY ORDER

Commit in an understandable dependency sequence.

Recommended conceptual order:

```text
1. constants
2. shared/common components
3. layout
4. feature components
5. pages
6. services
7. styles/assets
8. application entry/config
9. documentation/git configuration
```

But use the actual dependency graph.

---

# 25. GRAPHIFY

If Graphify is available in the repository, use it to understand:

```text
file
↓
component
↓
import
↓
page
↓
route
```

Use Graphify to avoid splitting tightly coupled files incorrectly.

Do not invent Graphify commands.

---

# 26. IMPORT DEPENDENCY CHECK

Before grouping files, inspect imports.

Example:

```text
Dashboard component
↓
shared component
↓
layout
```

Do not claim a folder is independent if its files are tightly coupled to
another pending commit.

---

# 27. COMMIT INTEGRITY

Every proposed commit should leave the repository in a coherent state
where practical.

Avoid a commit that creates obviously broken intermediate code when a
small logical grouping can prevent that.

---

# 28. EXISTING COMMITS

Inspect recent history:

```bash
git log --oneline --decorate -20
```

Understand existing commit style.

Do not rewrite old commits.

Do not squash old commits.

Do not reset history.

---

# 29. NO HISTORY REWRITE

Do NOT use:

```text
git reset --hard
git rebase
git commit --amend
git filter-repo
```

unless explicitly requested later.

---

# 30. NO FORCE PUSH

Never use:

```text
git push --force
git push -f
```

The user has not authorized pushing.

---

# 31. UNTRACKED FILES

Untracked files must be classified.

For each:

```text
production
documentation
reference
temporary
generated
excluded
```

Only production/approved files should enter the commit plan.

---

# 32. MODIFIED FILES

Modified files should be grouped based on their actual change purpose,
not merely their folder location.

---

# 33. DELETED FILES

Do not stage deletions blindly.

Check whether deletion is intentional.

---

# 34. RENAMED FILES

Preserve Git rename detection where practical.

Do not create unnecessary delete + add noise.

---

# 35. BINARY FILES

For images/Lotties/PDFs:

show exact paths.

Do not inspect or alter binary content unnecessarily.

---

# 36. LARGE FILES

Identify unusually large files before committing.

Do not accidentally commit:

- build artifacts
- dependency folders
- huge archives
- generated data
- unnecessary screenshots

---

# 37. SECRETS

Never stage:

```text
.env
credentials
API keys
tokens
private keys
```

unless the repository explicitly uses safe non-secret config.

Never print secret values.

---

# 38. PACKAGE FILES

If `package.json` and `package-lock.json` changed together:

they should normally be in the same project/config commit.

Example:

```text
Node/Vite - package and dependency configuration
```

Only if those files actually changed.

Do not commit them merely because they exist.

---

# 39. VITE CONFIG

If:

```text
vite.config.js
```

changed:

commit with related project configuration.

Example:

```text
Vite - application build configuration
```

---

# 40. CATALYST CONFIG

If:

```text
catalyst.json
.catalystrc
cli-config.json
```

changed:

group them as deployment configuration.

Example:

```text
Zoho Catalyst - deployment configuration
```

Only use this if they actually changed.

---

# 41. APP ENTRY

If:

```text
App.jsx
main.jsx
index.html
```

changed:

group according to actual purpose.

Example:

```text
React/Vite - application entry and root composition
```

---

# 42. ROOT README

If only README changed:

```text
Docs - project README and developer setup
```

---

# 43. .GITIGNORE

If `.gitignore` changed:

```text
Git - repository ignore configuration
```

---

# 44. DOCS

If multiple documentation files changed:

group logically:

```text
Docs - architecture documentation
Docs - product planning documentation
Docs - design documentation
```

Do not use one huge generic docs commit if the changes are clearly
separate.

---

# 45. PROMPTS

If approved prompt files are part of GitHub:

group them by actual purpose:

```text
Prompts - frontend development prompts
Prompts - architecture prompts
Prompts - design prompts
```

If they are explicitly excluded, do not stage them.

---

# 46. LOCAL-ONLY REFERENCE

Never include:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

in any commit command.

---

# 47. COMMIT COUNT

Aim for:

```text
multiple clean commits
```

not:

```text
hundreds of tiny meaningless commits
```

A commit should represent a meaningful unit.

---

# 48. EXAMPLE COMMIT PLAN

The final plan may look like:

```text
COMMIT 01
React/Vite - shared reusable UI components

COMMIT 02
React/Vite - application shell and navigation layout

COMMIT 03
React/Vite - dashboard navigation and feature components

COMMIT 04
React/Vite - geology repository and reporting components

COMMIT 05
React/Vite - Report Studio UI and analytical components

COMMIT 06
React/Vite - application route pages

COMMIT 07
React/Vite - API and application data services

COMMIT 08
CSS - global styles and design tokens

COMMIT 09
React/Vite - runtime images, icons and Lottie assets

COMMIT 10
Project - package and Vite configuration

COMMIT 11
Docs - project documentation

COMMIT 12
Git - repository ignore configuration
```

IMPORTANT:

This is only an example.

Generate the real commit list from the actual repository.

---

# 49. EXACT COMMAND REQUIREMENT

For every commit provide:

### Commit N

```text
Purpose:
<direct explanation>

Files:
<complete exact list>

Commands:
```

```bash
git add "exact/path/file1"
git add "exact/path/file2"
git commit -m "TechStack Name - direct content description"
```

---

# 50. NO GENERIC PATHS

Do not output:

```bash
git add "all dashboard files"
```

Output actual paths.

---

# 51. NO WILDCARD AMBIGUITY

Avoid:

```bash
git add .
```

because it can accidentally stage unrelated files.

Prefer explicit files.

---

# 52. EXCEPTION

A whole folder may be staged with:

```bash
git add "MineApp/src/components/dashboard/"
```

ONLY when analysis confirms:

- every file in that folder belongs to the commit
- no excluded/unwanted files are inside
- no unrelated changes are mixed there

Explicit files are still preferred.

---

# 53. PRE-COMMIT VALIDATION

Before executing any commit, inspect:

```bash
git diff --cached --stat
git diff --cached --name-only
```

The staged files must match exactly the proposed commit.

---

# 54. COMMIT VALIDATION

After each commit:

```bash
git status --short
git log -1 --oneline
```

Verify:

- intended files committed
- no unrelated files staged
- no unexpected deletion
- no accidental excluded folder
- no generated files

---

# 55. DO NOT PUSH AFTER COMMIT

After all approved commits:

```text
STOP
```

Show:

```text
git status --short
git log --oneline -<number>
```

Then wait.

---

# 56. PUSH CONFIRMATION

Only after the user explicitly says:

```text
push
```

or equivalent:

prepare the push action.

Do not push automatically.

---

# 57. NO DEPLOYMENT

Git commit organization does NOT authorize:

```text
npm run build
catalyst deploy
production deployment
```

unless specifically requested separately.

---

# 58. NO APPLICATION MODIFICATIONS

Do not change source code simply to make commits easier.

---

# 59. NO FILE MOVEMENT

This prompt is for commit organization.

Do not use it to reorganize folders again.

---

# 60. CURRENT STRUCTURE AWARENESS

Use the current structure visible in the supplied screenshots as context:

```text
MineApp/src/
├── assets/
├── components/
│   ├── common/
│   ├── dashboard/
│   ├── geology/
│   ├── landing/
│   ├── layout/
│   └── studio/
├── constants/
├── pages/
├── services/
├── styles/
├── App.jsx
└── main.jsx
```

But inspect the real files before generating commands.

---

# 61. CONTENT OF EACH FOLDER — DIRECT DESCRIPTION

When naming a commit, directly connect it to its folder.

Examples:

```text
components/common
→ shared reusable UI components

components/dashboard
→ dashboard feature navigation and dashboard UI

components/geology
→ geology repository, year/report UI and geology-specific components

components/landing
→ landing and feature-navigation UI

components/layout
→ application shell, sidebar and navigation layout

components/studio
→ Report Studio source, chat, studio tools and analytical UI

pages
→ route-level application pages

services
→ API/data access and application service logic

constants
→ application constants and static configuration

styles
→ global styles, design tokens and shared CSS

assets
→ runtime images, icons, Lotties and visual assets
```

Use these only where they match the actual files.

---

# 62. FEATURE-BASED FOLDER SPECIAL CASE

If a feature's implementation is spread across:

```text
components/
pages/
services/
assets/
```

do not pretend that `components/feature/` alone represents the whole
feature.

State the complete grouping.

Example:

```text
React/Vite - Geology repository UI, route and data services
```

if those files genuinely belong together.

---

# 63. SHARED FILE SPECIAL CASE

If a file is shared by multiple modules:

do not place it in a feature-specific commit merely because it was changed
while developing that feature.

Use:

```text
common/
layout/
services/
constants/
```

according to its actual responsibility.

---

# 64. COMMIT MESSAGE QUALITY

Use direct nouns and purpose:

```text
React/Vite - geology repository and reporting components
```

Better than:

```text
React/Vite - geology stuff
```

---

# 65. DO NOT INCLUDE TICKET NUMBERS

Unless the repository already has an established issue/ticket convention.

---

# 66. DO NOT INCLUDE PERSONAL INFORMATION

Commit messages should be project-focused.

---

# 67. DO NOT INCLUDE EMOJIS

Keep commit history professional.

---

# 68. DO NOT USE "FINAL"

Avoid:

```text
final
final2
latest
working
done
```

---

# 69. DO NOT USE VAGUE "UPDATE"

Avoid:

```text
Update files
Update components
Changes
Fix
```

unless the exact purpose follows.

---

# 70. REQUIRED ANALYSIS REPORT

Before executing any Git staging/commit command, output:

## A. REPOSITORY STATUS

```text
modified
untracked
deleted
renamed
ignored
```

## B. EXCLUDED FILES

Confirm:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

are not included.

## C. COMMIT PLAN

Show:

```text
Commit 01
Commit 02
Commit 03
...
```

## D. EXACT FILE LIST

Each commit gets exact file paths.

## E. EXACT COMMANDS

Each commit gets exact commands.

## F. DEPENDENCY / ORDER REASON

Briefly state why the commit comes in that order.

---

# 71. WAIT BEFORE EXECUTION

After producing the analysis and commands:

STOP.

Do NOT execute staging.

Do NOT execute commits.

Wait for explicit confirmation.

---

# 72. FIRST CONFIRMATION

The user may respond with:

```text
confirm commits
```

Only then execute the approved commit plan.

---

# 73. IF USER MODIFIES THE PLAN

Recalculate affected commit groups.

Do not blindly execute the old plan.

---

# 74. AFTER COMMIT EXECUTION

Run:

```bash
git status --short
git log --oneline --decorate -<N>
```

where N is the number of new commits.

---

# 75. VERIFY NO EXCLUDED MATERIAL

Double-check:

```text
git status
git ls-files
```

for the excluded folders.

---

# 76. VERIFY NO GENERATED FILES

Confirm no accidental:

```text
node_modules
dist
cache
logs
```

were committed.

---

# 77. VERIFY NO SECRET FILES

Confirm no secret files were staged.

---

# 78. FINAL RESULT

Report:

```text
Commits created:
01 ...
02 ...
03 ...

Working tree:
clean / expected changes

Push:
NOT DONE
```

Then stop.

---

# 79. PUSH GATE — FINAL

Never automatically run:

```bash
git push
```

Wait for explicit user approval.

---

# 80. ABSOLUTE FINAL RULE

Until confirmation:

```text
ANALYZE
CLASSIFY
PROPOSE

DO NOT:
STAGE
COMMIT
PUSH
DEPLOY
```

After commit confirmation:

```text
STAGE
COMMIT
VERIFY

STOP

WAIT FOR PUSH CONFIRMATION
```

# END OF MASTER PROMPT
