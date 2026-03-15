RAJDIP Graph Automation For GitHub Profile

📁 Folder Structure:

rajdip1234/
├─ .git
├─ .github/workflows/graph.yml
├─ code/
│  ├─ index.js
│  ├─ data.json
│  ├─ package.json
├─ img/
├─ .gitignore
├─ GUIDE.md
├─ README.md

────────────────────────────────────────────
🛠️ One-time Setup (Recommended)
────────────────────────────────────────────

1. Create a new empty repo on GitHub: 
   Go to GitHub and create a new **public** repo with your username like below example:
   https://github.com/rajdip1234/rajdip1234
   ⚠️ Do NOT add README.md, .gitignore, or license yet. Keep it empty.

2. Clone the empty repo locally in your project folder like below example:
   cd rajdip1234(your local project directory)
   git clone https://github.com/rajdip1234/rajdip1234.git

3. Download all files from 
   "https://github.com/rajdip1234/DATA-SCIENCE-ANALYST-ENGINEERING-MLOPS-GCP-AWS/profile-with-worflows/rajdip1234" as well as replace and edit other files like README.md, images etc as per your requirements.

📛 Configure Git Identity (Required for Contributions)

This step ensures GitHub correctly counts your commits in the contribution graph.
Run once from the project root directory (like rajdip1234/) changing with your github user name and email like below example.

# git config --global user.name "Rajdip Biswas"
git config --global user.name "Rajdip Biswas"
git config --global user.email "rajdippharma1989@gmail.com"

🔍 Verify Configuration

git config --get user.name
git config --get user.email

If empty or incorrect then set-

git config --global user.name "Rajdip Biswas"
git config --global user.email "rajdippharma1989@gmail.com"

4. 📂Branch check:
   Run To push into "main" branch initially in project root (like rajdip1234/):
   git branch
   git checkout -b main
   (git checkout main-if you are not in main branch or exixsting otherbranch,main branch already exist with at least one commit)
   git branch -M main
   git commit --allow-empty -m "chore: initial empty commit"
   # git push -f -u origin main
   git push -u origin main
   git status
5. Install required dependencies locally into "code" folder by terminal like 
   CMD(Command prompt)/GitBash:
   npm install
   #Optional:npm ci|| npm install (npm ci is only safe after package-lock.json exists)
   Check if you want (Optional):
   git -C .. status
   git -C .. branch
6. Dry-run preview:
   # CMD / Git Bash
   open the "code" folder path on CMD or other terminals like Git Bash as previous like npm installing time and run-
   set DRY_RUN=true && node index.js
   git log -1 --pretty=full
   
   After preview for real run and unset variable-
   set DRY_RUN=false && set COMMITS_PER_BLOCK=100 && node index.js
   After preview exit for main project root directory terminal
   # PowerShell
   $env:DRY_RUN="true"; node index.js
   Remove-Item Env:DRY_RUN; node index.js

7. ✅ Verify the ASCII grid shows the full word “RAJDIP BISWAS” or your name after editing 
   index.js left-to-right.
   #Can also increase the number of commits per block 80, 100 or more for more deeper pink colour

   💡 For deeper pink pixels (more commits per pixel):
   set COMMITS_PER_BLOCK=100 && node index.js

────────────────────────────────────────────
🧹 Post-Run Cleanup From Main Or Root Project Folder (like rajdip1234/)
────────────────────────────────────────────

8. Delete node_modules before final push:
   🎐CMD / PowerShell (Windows – Recommended)-
   type .gitignore
   (Confirm node_modules/ exists once):
   rmdir /s /q code\node_modules
   git rm -r --cached code\node_modules 2>nul || echo node_modules not tracked
   git ls-files | findstr node_modules || echo ✅ node_modules not tracked
   git status
   git add .gitignore
   git commit -m "chore: remove node_modules from repo"
   
   🐧 Git Bash (Linux / macOS / Windows)
   grep -qxF 'node_modules/' .gitignore || echo 'node_modules/' >> .gitignore
   cat .gitignore
   rm -rf code/node_modules
   git rm -r --cached code/node_modules 2>/dev/null || true
   git ls-files | grep node_modules || echo "✅ node_modules not tracked"
   git status
   git add .gitignore
   git commit -m "chore: remove node_modules from repo and fix: clean duplicate node_modules entry in gitignore"
   
────────────────────────────────────────────
📤 Push Files and Create Main Branch
────────────────────────────────────────────

9. Commit and push the initial files on project root folder(like rajdip1234/) (this creates/verifies the `main` branch):
   git add .
   git commit -m "Initial RAJDIP Graph Automation"
   git push -f -u origin main
   git fetch origin
   git checkout main
   (For Linux / macOS / Git Bash on Windows-git checkout main 2>/dev/null || git branch -m main)
   git status
   git branch

10.  ✅ Verify total commits and recent ones:
   🎐 For Windows CMD-
   git fetch origin
   git log --oneline --since="1 year ago" | find /c /v ""
   git log --oneline --since="1 year ago" | more
   (Press Space → next page , Press Enter → one line, Press Q → quit)
   💈For Powershell-
   git fetch origin

   # Count commits (wc -l)
   git log --oneline --since="1 year ago" | Measure-Object | Select-Object -ExpandProperty Count

   # First 20 commits (head -20)
   git log --oneline --since="1 year ago" | Select-Object -First 20

   # First 40 commits (head -40)
   git log --oneline --since="1 year ago" | Select-Object -First 40
   
   🐧For Git Bash-
   git fetch origin
   git log --oneline --since="1 year ago" | wc -l
   git log --oneline --since="1 year ago" | head -20
   git log --oneline --since="1 year ago" | head -40

   Note:This will show few commits now. The graph commits appear after Step 11
────────────────────────────────────────────
🪄 Generate Commits & Push Data
────────────────────────────────────────────

11.   (Recommended) Run the workflow on GitHub:
- Go to GitHub → Actions → **RAJDIP Graph + Snake(graph.yml)** → Run workflow
- Set : `reset = false` for a clean first run with reset repo history and set `true` with run commit generation
- Click **Run workflow** and monitor logs

12.Comment in graph.yml (after first successful run):
1️⃣ Reset history step-
# - name: 🧹 Optional reset history (manual first run only)
#   if: ${{ github.event.inputs.reset == 'true' }}
#   run: |
#     echo "⚠️ Resetting repository history..."
#     git checkout --orphan temp_branch
#     git add -A
#     git commit -m "chore: reset history [skip ci]"
#     git branch -D main || true
#     git branch -m main
#     git push -f origin main
#     echo "✅ Repository history reset complete."
2️⃣ Commit generation step-
# - name: 🧠 Run RAJDIP script (creates commits)
#   if: ${{ github.event.inputs.generate == 'true' }}
#   env:
#     COMMITS_PER_BLOCK: '100'
#     TIMEZONE: 'Asia/Kolkata'
#   run: |
#     cd code
#     node index.js
3️⃣ Commit & push step-
# - name: 📤 Commit & push generated commits
#   if: ${{ github.event.inputs.generate == 'true' }}
#   run: |
#     git add .
#     git commit -m "📊 Auto-generate commits for RAJDIP graph" || echo "No changes to commit"
#     git push origin main

Verify results as per example:
- Contribution Graph: https://github.com/rajdip1234
- Snake Output Branch: https://github.com/rajdip1234/output
- Workflow Logs: GitHub → Actions → workflow run

────────────────────────────────────────────
🧪 Optional: Workflow B (Local Commit Generation)
────────────────────────────────────────────
📍 This optional workflow must be completed before Step 11–12 (GitHub Actions execution).
If you follow Workflow B, skip Step 11–12 entirely and only keep GitHub Actions for snake generation.
*(Use this instead of GitHub Actions commit generation if you prefer full local control to generate commits locally before Actions)*

────────────────────────────────────────────
📌 When to use this workflow
────────────────────────────────────────────

You want predictable output before pushing

You want faster iteration while tuning text alignment or color density

You do not want Actions to create commits repeatedly

⚠️ Use either Workflow A (GitHub Actions) or Workflow B (Local), not both.

────────────────────────────────────────────
🛠️ Step-by-step: Local Commit Generation
────────────────────────────────────────────

1.  Configure Git identity (required once):
    git config user.name "Your Name"
    git config user.email "your-email@example.com"
    
    Verify:
    git config --get user.name
    git config --get user.email

2.  Generate commits locally with custom density:
   # CMD / Git Bash
   cd code
   COMMITS_PER_BLOCK=100 node index.js
   # PowerShell
   $env:COMMITS_PER_BLOCK="80"; node index.js

   ✅ You can safely use 80, 100, or any higher number. Adjust commit density (more = deeper color).Recommended values: 80–120. Higher value = darker contribution squares.

3. Verify commit creation:
   git status
   git log --oneline --since="1 year ago" | head -30

────────────────────────────────────────────
📤 Push Local Commits
────────────────────────────────────────────
4. Push commits to main branch:
   
   git add .
   git commit -m "📊 Generate RAJDIP contribution graph"
   git push origin main

5. If push is rejected (non-fast-forward):
   
   git pull origin main --rebase
   git push origin main

⚠️ Force push (only if absolutely required optionally in rare case):
   git push -f origin main

────────────────────────────────────────────
🧩 If Rebase Conflicts Occur
────────────────────────────────────────────

◽ Git will list conflicted files

◽ Open and resolve conflicts manually

Then run:

git add <file>
git rebase --continue

After successful rebase, re-run commit generation if needed:

COMMITS_PER_BLOCK=100 node index.js

────────────────────────────────────────────
🛑 Disable Commit Generation in GitHub Actions
────────────────────────────────────────────
Prevent duplicate commits by Actions:

Open .github/workflows/graph.yml and comment out or remove as mention previous step no. 12:

1️⃣ Reset history step
2️⃣ Commit generation step
3️⃣ Commit & push step

Keep only:

Snake animation generation

Output branch push steps

This ensures Actions only renders visuals and does not modify history.

────────────────────────────────────────────
🔧 Troubleshooting & Recovery
────────────────────────────────────────────
✅ Clean dependency reinstall:

From project root:

   git checkout main
   cd code
   npm ci || npm install

Ensure node_modules is ignored:

   grep -qxF 'node_modules/' .gitignore || echo 'node_modules/' >> .gitignore
   rm -rf node_modules
   git rm -r --cached node_modules 2>/dev/null || true

Verify:
   git ls-files | grep node_modules || echo "✅ node_modules not tracked"

────────────────────────────────────────────
📌 Important Notes & Best Practices
────────────────────────────────────────────

- The script creates many timestamped commits — they are permanent in your public history.
- `reset=true` in the workflow should only be used for the very first run or when resetting history.
- Keep the repo **public** so contribution commits appear on your GitHub profile.
- Always check Actions logs if the snake generation fails — ensure:
  - `GITHUB_TOKEN` is available (it is by default)
  - Workflow permissions include `contents: write`
- All generated commits are permanent once pushed to a public repo
-Do not delete the repo after generation, or graph history will vanish
-Always verify GitHub Actions permissions:
  contents: write
  GITHUB_TOKEN enabled (default)
-GitHub → Profile → Settings → Contributions & activity
  ✅ Include private contributions → Enabled

  ✅ Activity overview → Enabled