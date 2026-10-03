# MineHub.ai — CLEAN, SAFE & PRODUCTION-SAFE FOLDER STRUCTURE MASTER PROMPT
## Repository organization only — DO NOT change application behavior

---

# 1. MISSION

Reorganize the current **MineHub - Copy** project into a clean, professional,
easy-to-understand folder structure.

The most important requirement is:

> **Do not break the existing code, website, application, routes, UI, APIs,
build, Catalyst deployment, assets, or runtime behavior.**

This task is primarily:

```text
ORGANIZE FILES
+
SEPARATE RUNTIME FROM REFERENCES
+
CLEAN GITHUB CONTENT
```

It is NOT a refactoring task.

---

# 2. CURRENT STRUCTURE

The current repository visually contains:

```text
MineHub - Copy/
│
├── Assets/
├── Features List Lotties/
├── Logo/
├── MineApp/
│   ├── .catalyst/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   ├── .catalystrc
│   ├── catalyst.json
│   ├── cli-config.json
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   └── vite.config.js
│
├── Reference style/
├── .gitignore
├── cillogo-full.png
└── README.md
```

This root structure is not sufficiently clear because:

```text
runtime application
+
runtime/reference assets
+
external references
+
documentation
```

are mixed together.

---

# 3. HARD EXCLUSIONS — NEVER PUT INTO GITHUB

The following folders are explicitly OUTSIDE the production GitHub repository:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

IMPORTANT:

These are **not MineHub runtime/application directories**.

Do NOT:

- copy them into MineApp
- merge their source code into MineApp
- import their code into MineHub
- move their files into `src/`
- bundle them into production
- upload them to GitHub
- add them to the production application tree

They may remain locally as reference material.

---

# 4. CRITICAL — DO NOT DELETE EXCLUDED FOLDERS AUTOMATICALLY

The user said:

> ignore them and do not upload them to GitHub

This does NOT mean:

> delete them from the local machine.

Therefore:

```text
KEEP LOCALLY
+
EXCLUDE FROM PRODUCTION GITHUB
```

unless the user separately asks for deletion.

---

# 5. GITHUB EXCLUSION REQUIREMENT

Verify whether the following are currently tracked:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

Use actual Git state.

Do NOT assume.

The goal is:

```text
LOCAL REFERENCE
        ↓
NOT TRACKED
        ↓
NOT PUSHED
        ↓
NOT IN GITHUB
```

---

# 6. ABSOLUTE GIT SAFETY

Until the user gives explicit confirmation:

```text
NO git add
NO git commit
NO git push
NO branch creation
NO pull request
NO merge
NO deploy
NO remote changes
```

The user explicitly said:

> wait for my confirmation

Therefore this prompt has a hard confirmation gate.

---

# 7. CONFIRMATION GATE

The implementation workflow MUST be:

```text
1. ANALYZE
        ↓
2. CLASSIFY
        ↓
3. PROPOSE CLEAN STRUCTURE
        ↓
4. SHOW FULL MIGRATION MAP
        ↓
5. CHECK RUNTIME / IMPORT / BUILD RISKS
        ↓
6. STOP
        ↓
USER CONFIRMS
        ↓
7. MOVE / RENAME ONLY APPROVED FILES
        ↓
8. TEST
        ↓
9. SHOW GIT STATUS
        ↓
10. STOP AGAIN
```

Never skip the stop points.

---

# 8. DO NOT CHANGE THE APPLICATION

Absolutely do NOT modify:

- React components
- application logic
- hooks
- state management
- API logic
- backend behavior
- database logic
- routing behavior
- URLs
- CSS
- design
- UI layout
- text/content
- AI behavior
- RAG behavior
- Report Studio
- Geology
- Dashboard
- authentication
- authorization
- security logic
- environment behavior

Only path references may change if an approved file is physically moved.

---

# 9. DO NOT CHANGE DEPENDENCIES

Do NOT:

- install packages
- uninstall packages
- update packages
- change package versions
- regenerate package-lock.json

unless a confirmed application-root movement absolutely requires it.

Prefer not moving the application root.

---

# 10. DO NOT CHANGE VITE

Inspect:

```text
MineApp/vite.config.js
```

but do not alter its behavior.

---

# 11. DO NOT CHANGE CATALYST

Inspect:

```text
MineApp/catalyst.json
MineApp/.catalystrc
MineApp/cli-config.json
```

but do not alter deployment configuration unless a confirmed move
strictly requires a path update.

---

# 12. MOST IMPORTANT SAFETY DECISION

### KEEP `MineApp/` AS THE APPLICATION ROOT BY DEFAULT.

Do NOT automatically convert:

```text
MineHub/MineApp/
```

into:

```text
MineHub/app/MineApp/
```

The application already appears self-contained.

Moving the whole application root introduces unnecessary risk to:

- Vite
- Catalyst
- package scripts
- deployment
- relative paths
- CI/CD
- developer workflow

Therefore:

> **Keep MineApp where it is unless repository analysis proves that moving it
is safe and meaningfully beneficial.**

---

# 13. RECOMMENDED TARGET STRUCTURE

A safer target is:

```text
MineHub/
│
├── MineApp/                     # REAL APPLICATION — preserve
│   ├── public/
│   ├── src/
│   ├── .catalyst/
│   ├── .catalystrc
│   ├── catalyst.json
│   ├── cli-config.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── docs/                        # approved project documentation
│   ├── architecture/
│   ├── product/
│   ├── design/
│   └── planning/
│
├── prompts/                     # approved development prompts
│   ├── frontend/
│   ├── backend/
│   ├── architecture/
│   └── design/
│
├── scripts/                     # project scripts, if any
│
├── tests/                       # repository-level tests, if any
│
├── .gitignore
└── README.md
```

Runtime assets should NOT automatically become a new root `assets/` folder.

First determine whether:

```text
Assets/
Logo/
Features List Lotties/
cillogo-full.png
```

are actually used by the application.

---

# 14. RUNTIME ASSET RULE

For each of:

```text
Assets/
Logo/
Features List Lotties/
cillogo-full.png
```

determine:

```text
Runtime asset?
Reference asset?
Unused?
Duplicate?
Mixed?
```

Only runtime assets should be considered for placement inside `MineApp`.

---

# 15. IMPORTANT — DO NOT MOVE ASSETS JUST FOR APPEARANCE

If:

```text
Assets/
Logo/
Features List Lotties/
```

are already referenced by `MineApp/src`, moving them could break imports.

Therefore:

```text
TRACE USAGE FIRST
```

then decide.

---

# 16. RUNTIME ASSET TARGET

If an asset is imported by React/Vite source code, the preferred final
location should be inside the actual application asset hierarchy.

Conceptually:

```text
MineApp/
└── src/
    └── assets/
        ├── images/
        ├── logos/
        ├── icons/
        └── lotties/
```

BUT:

Do NOT move anything until all references are identified.

---

# 17. PUBLIC ASSETS

If an asset is served through:

```text
MineApp/public/
```

and referenced by URL:

keep it under `public/` unless there is a confirmed safe migration plan.

Do not accidentally convert URL paths into import paths.

---

# 18. ROOT-LEVEL `cillogo-full.png`

Determine whether it is:

```text
used by application
or
reference-only
```

Search the full repository.

If runtime-used, relocate only through a safe path migration.

If reference-only, it should not automatically become a production asset.

---

# 19. FEATURES LIST LOTTIES

Inspect:

```text
Features List Lotties/
```

for:

- runtime Lotties
- unused Lotties
- reference-only Lotties

Do not move the entire folder blindly.

---

# 20. LOGO FOLDER

Inspect:

```text
Logo/
```

and classify every relevant image.

Do not assume every logo is runtime-used.

---

# 21. ASSETS FOLDER

Inspect:

```text
Assets/
```

and classify files individually when necessary.

Do not assume everything is production runtime.

---

# 22. EXCLUDED REFERENCE FOLDER

The following MUST remain outside production GitHub:

```text
Reference style/
```

Do not move its screenshots into:

```text
MineApp/src/assets/
```

unless a screenshot is genuinely required by the application.

---

# 23. EXTERNAL PROJECT

The following is external/reference material:

```text
SIH_PRAGATI_MITRA-24-main/
```

Do NOT merge its code.

Do NOT copy its source.

Do NOT import it.

Do NOT include it in GitHub.

---

# 24. ENTERPRISE GRADE

The following is reference/planning material:

```text
Enterprise grade/
```

It is NOT part of the runtime MineHub application.

Do not merge it automatically into `MineApp`.

---

# 25. UPDATE PROMPT

The following is local prompt/reference material:

```text
Update Prompt/
```

Do NOT put it into the runtime application.

Do NOT upload it to GitHub.

---

# 26. DOCUMENTATION ORGANIZATION

Approved project documentation should be separated into:

```text
docs/
├── architecture/
├── product/
├── design/
└── planning/
```

Do not put runtime code in `docs/`.

---

# 27. PROMPT ORGANIZATION

Approved MineHub development prompts should be separated into:

```text
prompts/
├── frontend/
├── backend/
├── architecture/
└── design/
```

Do not execute or import Markdown prompt files as runtime application code.

---

# 28. DO NOT COPY PROMPTS

Move/rename only.

Do not create duplicate copies.

---

# 29. DO NOT EDIT PROMPT CONTENT

During this task:

Do NOT rewrite prompts.

Only update file references if an approved move breaks a documented path.

---

# 30. README

Keep:

```text
README.md
```

at the repository root.

After confirmation, it may be updated to describe the new folder structure.

Do not rewrite unrelated README content.

---

# 31. ROOT `.gitignore`

Keep:

```text
.gitignore
```

at root.

After confirmation, update only what is necessary to prevent the excluded
reference directories from entering Git.

Do NOT create broad patterns that accidentally ignore MineApp source.

---

# 32. GIT TRACKING CHECK

Before changing anything:

inspect:

```text
git status
git ls-files
```

Then determine actual tracking state.

---

# 33. EXCLUSION CHECK

Verify all four excluded directories:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

Report:

```text
EXISTS?
TRACKED?
REFERENCED?
RUNTIME?
REFERENCE-ONLY?
```

Use factual values only.

---

# 34. NO GUESSING

Never assume a directory is unused.

Never assume a file is unused.

Never assume a folder can be moved.

Trace it.

---

# 35. IMPORT SEARCH

Before moving any runtime file, search for:

```text
import
require
dynamic import
new URL
fetch
src=
href=
url(...)
background-image
Lottie path
JSON path
```

---

# 36. CONFIGURATION SEARCH

Search configuration files for:

```text
Assets
Logo
Features List Lotties
MineApp
src
public
dist
```

---

# 37. PACKAGE SCRIPT SEARCH

Inspect `MineApp/package.json` scripts for:

- relative paths
- copied assets
- build paths
- deployment paths
- scripts referencing root directories

---

# 38. GITHUB ACTIONS

Inspect:

```text
.github/
```

if present.

Check whether CI assumes:

```text
MineApp/
package.json
dist/
```

Do not modify CI unless a confirmed move requires it.

---

# 39. DOCKER

If Docker files exist, inspect their build context and COPY paths.

Do not modify them unless a confirmed safe move requires it.

---

# 40. TEST PATHS

Inspect:

- test imports
- fixtures
- Playwright/Cypress paths
- Vitest/Jest paths
- snapshots

before moving anything referenced by tests.

---

# 41. BUILD OUTPUT

Treat:

```text
MineApp/dist/
```

as generated output if the project confirms it.

Do not reorganize generated files manually.

---

# 42. NODE MODULES

Treat:

```text
MineApp/node_modules/
```

as generated dependency material.

Do not move or upload it.

---

# 43. CATALYST DIRECTORY

Treat:

```text
MineApp/.catalyst/
```

according to the current Catalyst workflow.

Do not move casually.

---

# 44. NO CODE FORMATTER

Do not run the formatter across the repository.

This task should not create massive unrelated diffs.

---

# 45. NO CODE CLEANUP

Do not use this task to remove:

- unused code
- unused dependencies
- old components
- old CSS
- old functions

unless separately requested.

---

# 46. NO ASSET CLEANUP

Do not delete duplicate-looking images automatically.

First classify and report.

---

# 47. NO FILE CONTENT CHANGES

A file move should remain a move.

Do not combine:

```text
move
+
refactor
+
format
```

in the same operation.

---

# 48. NO DATA CHANGES

Do not touch:

- database data
- uploaded reports
- application records
- APIs
- external services

This is a repository organization task.

---

# 49. NO UI CHANGES

The website must look identical.

---

# 50. NO ROUTE CHANGES

Existing routes and URLs must remain identical.

---

# 51. NO DEPLOYMENT CHANGES

The application must deploy using the same existing workflow.

---

# 52. NO ENVIRONMENT CHANGES

Do not modify secrets or environment values.

---

# 53. NO `.env` EXPOSURE

Do not move environment files into public directories.

Do not print secrets in analysis.

---

# 54. GRAPHIFY ANALYSIS

If the project's Graphify knowledge/workflow is available, use it before
migration.

Search for:

```text
repository structure
MineApp
runtime assets
feature assets
routes
Vite
Catalyst
documentation
prompts
design references
```

Use the repository's existing Graphify instructions.

Do not invent Graphify commands.

---

# 55. GRAPHIFY PURPOSE

Use Graphify to understand relationships.

Especially identify:

```text
File
 ↓
Component
 ↓
Import
 ↓
Route
 ↓
Runtime feature
```

---

# 56. REFERENCE IMAGE ANALYSIS

Use the supplied screenshot only as the current-structure reference.

It indicates that the main problem is:

```text
mixed project materials
+
unclear hierarchy
```

The goal is:

```text
clear hierarchy
+
safe separation
```

---

# 57. TARGET HIERARCHY

The developer opening the repository should immediately understand:

```text
MineHub
│
├── MineApp       → actual application
├── docs          → documentation
├── prompts       → development prompts
├── scripts       → project scripts
├── tests         → repository tests
├── README        → project entry point
└── .gitignore
```

---

# 58. DO NOT CREATE TOO MANY FOLDERS

Avoid unnecessary structures like:

```text
docs/minehub/project/current/final/v2/
```

Use simple logical folders.

---

# 59. NO `MISC`

Do not create:

```text
misc/
stuff/
other/
temp/
```

unless absolutely necessary and explicitly justified.

---

# 60. FOLDER NAMING

Prefer:

```text
MineApp
docs
prompts
scripts
tests
```

Keep naming consistent.

---

# 61. APPLICATION ROOT REMAINS OBVIOUS

A developer must know:

> `MineApp/` is the actual runnable application.

Do not hide it under multiple irrelevant directories unless there is a
strong proven reason.

---

# 62. SOURCE ROOT

Within MineApp:

```text
src/
```

remains the application source root.

Do not move it outside MineApp.

---

# 63. PUBLIC ROOT

Within MineApp:

```text
public/
```

remains the public asset root unless a confirmed migration is proven safe.

---

# 64. CONFIG FILES

Keep application configuration together inside MineApp:

```text
package.json
package-lock.json
vite.config.js
index.html
catalyst.json
.catalystrc
cli-config.json
```

Do not scatter configuration across root folders.

---

# 65. DOCUMENTATION VS APPLICATION

Never place:

```text
README planning
architecture prompts
design screenshots
```

inside:

```text
MineApp/src/
```

unless explicitly runtime-required.

---

# 66. LOCAL REFERENCE VS GITHUB

Think of the repository as:

```text
LOCAL WORKSPACE
      │
      ├── production MineHub
      │
      └── local-only reference material
```

The local-only reference material is not part of the GitHub application.

---

# 67. GITHUB TARGET

GitHub should contain only:

```text
MineApp
approved docs
approved prompts
approved scripts
approved tests
README
.gitignore
```

plus verified runtime assets/configuration.

---

# 68. GITHUB MUST NOT CONTAIN

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

---

# 69. IMPORTANT — DO NOT USE `.gitignore` TO HIDE RUNTIME CODE

Do not add patterns that could accidentally hide:

```text
MineApp/src/
MineApp/public/
MineApp/package.json
```

---

# 70. REFERENCE DIRECTORY POLICY

The four excluded folders can physically remain at the local root if that is
the safest approach.

Example:

```text
MineHub/
├── MineApp/
├── docs/
├── prompts/
├── scripts/
├── tests/
├── Enterprise grade/          ← local-only
├── Update Prompt/             ← local-only
├── SIH_PRAGATI_MITRA-24-main/ ← local-only
├── Reference style/           ← local-only
├── README.md
└── .gitignore
```

This is acceptable **provided they are definitely excluded from GitHub**.

If a cleaner local workspace is desired later, move them to a separate
local archive directory only after confirmation.

---

# 71. SAFEST PRODUCTION APPROACH

Do NOT force a perfect-looking tree if it risks the app.

Priority:

```text
1. Application safety
2. Git safety
3. Deployment safety
4. Clear structure
5. Cosmetic cleanliness
```

---

# 72. FIRST PHASE — ANALYSIS ONLY

Before making changes, inspect:

```text
entire root tree
MineApp tree
Git state
imports
asset references
config
scripts
CI/CD
tests
Graphify
```

---

# 73. REQUIRED ANALYSIS OUTPUT

Return:

## A. CURRENT TREE

Show the relevant current structure.

## B. ACTUAL APPLICATION ROOT

State the verified runtime root.

## C. RUNTIME ASSET MAP

Show which root assets are actually used.

## D. EXCLUDED FOLDERS

Show the status of:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

## E. PROPOSED CLEAN TREE

Show the recommended final structure.

## F. MIGRATION MAP

Show:

```text
OLD → NEW
```

for every proposed move.

## G. RISK CHECK

Show:

```text
LOW
MEDIUM
HIGH
```

with reasons.

---

# 74. REQUIRED MIGRATION TABLE

Use:

| Current Path | Proposed Path | Runtime? | Git Tracked? | Referenced? | Risk | Action |
|---|---|---:|---:|---:|---|---|
| ... | ... | ... | ... | ... | ... | Move / Keep / Exclude |

Do not invent unknown values.

---

# 75. EXCLUDED-FOLDER TABLE

Use:

| Folder | Exists | Git Tracked | Runtime Dependency | Reference Only | Action |
|---|---:|---:|---:|---:|---|
| Enterprise grade | ? | ? | ? | ? | Exclude |
| Update Prompt | ? | ? | ? | ? | Exclude |
| SIH_PRAGATI_MITRA-24-main | ? | ? | ? | ? | Exclude |
| Reference style | ? | ? | ? | ? | Exclude |

---

# 76. ASSET TABLE

Use:

| Asset Group | Runtime Used? | Reference Only? | Proposed Location |
|---|---:|---:|---|
| Assets | ? | ? | ... |
| Logo | ? | ? | ... |
| Features List Lotties | ? | ? | ... |
| cillogo-full.png | ? | ? | ... |

---

# 77. NO MODIFICATION DURING ANALYSIS

During Phase 1:

```text
DO NOT MOVE
DO NOT RENAME
DO NOT DELETE
DO NOT EDIT
DO NOT COMMIT
DO NOT PUSH
```

---

# 78. USER CONFIRMATION

After the complete analysis, stop.

Do not implement the migration.

Wait for the user to approve the proposed structure.

---

# 79. AFTER CONFIRMATION — SAFE MIGRATION

Only after confirmation:

```text
Move approved files
↓
Update only broken references
↓
Do not refactor
↓
Do not redesign
↓
Do not change behavior
```

---

# 80. AFTER MOVE — VERIFY

Run existing:

```text
build
test
dev server
```

commands.

Do not invent new commands.

---

# 81. WEBSITE SMOKE TEST

Verify:

```text
Dashboard
Report Studio
Geology
Source
Chat
```

only to ensure the organization did not break anything.

---

# 82. ASSET SMOKE TEST

Verify:

- CIL logo
- feature icons
- Lotties
- images
- fonts/assets
- report-related visual assets

---

# 83. ROUTE SMOKE TEST

Verify existing routes still work.

Do not change URLs.

---

# 84. GIT STATUS AFTER CONFIRMED MIGRATION

Run:

```text
git status
git diff --stat
```

Expected changes should mostly be:

```text
renames
moves
reference-path updates
.gitignore changes if approved
README structure update if approved
```

---

# 85. UNEXPECTED DIFF

If the migration causes large unrelated source-code changes:

```text
STOP
```

Investigate.

Do not continue blindly.

---

# 86. NO COMMIT AFTER MIGRATION

Even after successful testing:

```text
STOP
WAIT FOR USER
```

Do not commit unless explicitly authorized.

---

# 87. NO PUSH AFTER MIGRATION

Do not push.

The user explicitly said:

> wait for my confirmation

---

# 88. FINAL GITHUB AUDIT

Before any future commit, report:

```text
GITHUB CONTAINS:
...

GITHUB EXCLUDES:
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/

RUNTIME APPLICATION:
MineApp/

UNEXPECTED FILES:
...
```

---

# 89. FINAL CLEAN STRUCTURE TARGET

The preferred safe result is:

```text
MineHub/
│
├── MineApp/                    # actual application
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   ├── catalyst.json
│   ├── .catalystrc
│   └── cli-config.json
│
├── docs/                       # approved documentation
│   ├── architecture/
│   ├── product/
│   ├── design/
│   └── planning/
│
├── prompts/                    # approved development prompts
│   ├── frontend/
│   ├── backend/
│   ├── architecture/
│   └── design/
│
├── scripts/                    # only if required
├── tests/                      # only if required
├── README.md
└── .gitignore
```

Local-only material can remain outside GitHub:

```text
Enterprise grade/
Update Prompt/
SIH_PRAGATI_MITRA-24-main/
Reference style/
```

---

# 90. CORE RULE FOR ROOT ASSETS

Do NOT blindly create:

```text
assets/
```

at the root.

First determine whether:

```text
Assets/
Logo/
Features List Lotties/
```

are runtime assets.

If runtime-used, organize them within the actual application structure.

If reference-only, keep them out of production GitHub.

---

# 91. CORE RULE FOR MINEAPP

`MineApp/` is sacred runtime territory.

Treat it as:

```text
DO NOT TOUCH
```

until dependency analysis proves an individual move is safe.

---

# 92. CORE RULE FOR REFERENCE MATERIAL

Reference material is:

```text
NOT RUNTIME
NOT IMPORTED
NOT DEPLOYED
NOT PUSHED
```

---

# 93. CORE RULE FOR GITHUB

GitHub should represent:

> **the actual MineHub product**, not the entire developer's local workspace.

---

# 94. CORE RULE FOR SAFETY

A slightly less tidy repository is acceptable.

A broken production application is NOT.

Therefore:

> **Never sacrifice runtime safety for folder aesthetics.**

---

# 95. REQUIRED FINAL STOP MESSAGE

After Phase 1 analysis, end exactly with:

> **WAITING FOR USER CONFIRMATION — NO FILES MOVED, NO FILES DELETED, NO CODE CHANGED, NO GIT COMMIT, NO GIT PUSH, NO DEPLOYMENT.**

---

# 96. ABSOLUTE FINAL RULE

Until explicit confirmation:

```text
DO NOT MOVE
DO NOT RENAME
DO NOT DELETE
DO NOT EDIT
DO NOT REFACTOR
DO NOT INSTALL
DO NOT UNINSTALL
DO NOT COMMIT
DO NOT PUSH
DO NOT DEPLOY
```

Only analyze and propose.

# END OF MASTER PROMPT
