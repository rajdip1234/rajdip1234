RAJDIP Graph Automation - Final Package

Files included:
- index.js
- data.json
- package.json
- .gitignore
- .github/workflows/graph.yml

────────────────────────────────────────────
🛠️ One-time Setup (Recommended)
────────────────────────────────────────────

PREP — Create a new empty repo on GitHub:
1. Go to GitHub and create a new **public** repo:
   https://github.com/rajdip1234/rajdip1234
   ⚠️ Do NOT add README.md, .gitignore, or license yet. Keep it empty.

2. Clone the empty repo locally:
   git clone https://github.com/rajdip1234/rajdip1234.git
   cd rajdip1234

3. Install required dependencies locally:
   npm install jsonfile moment-timezone simple-git
   #Optional-(|| npm ci)

4. Run To Push into "main" branch:
   git branch
   git branch -M main

5. Dry-run preview:
   # Bash / Git Bash
   DRY_RUN=true node index.js
   # PowerShell
   $env:DRY_RUN="true"; node index.js

   ✅ Verify the ASCII grid shows the full word “RAJDIP” left-to-right.
   #Can also increase the number of commits per block 80, 100 or more for more deeper pink colour

   💡 For deeper pink pixels (more commits per pixel):
   COMMITS_PER_BLOCK=100 node index.js
────────────────────────────────────────────
🧹 Post-Run Cleanup
────────────────────────────────────────────

6. Delete node_modules before final push:
   grep -qxF 'node_modules/' .gitignore || echo 'node_modules/' >> .gitignore
   cat .gitignore
   rm -rf node_modules
   git rm -r --cached node_modules 2>/dev/null || true
   git ls-files | grep node_modules || echo "✅ node_modules not tracked"
   git status
   git commit -m "chore: remove node_modules from repo"
   

   
────────────────────────────────────────────
📤 Push Files and Create Main Branch
────────────────────────────────────────────

7. Commit and push the initial files (this creates the `main` branch):
   git add .
   git commit -m "Initial RAJDIP Graph Automation"
   git push -u origin main
   git fetch origin
   git checkout main 2>/dev/null || git branch -m main
   git pull origin main --rebase
   git push

8. ✅ Verify total commits and recent ones:
   git fetch origin
   git log --oneline --since="1 year ago" | wc -l
   git log --oneline --since="1 year ago" | head -20
   git log --oneline --since="1 year ago" | head -40
────────────────────────────────────────────
🪄 Generate Commits & Push Data
────────────────────────────────────────────

9. (Recommended) Run the workflow on GitHub:
- Go to GitHub → Actions → **RAJDIP Graph + Snake** → Run workflow
- Set input: `reset = true` for a clean first run
- Click **Run workflow** and monitor logs

10. Verify results:
- Contribution Graph: https://github.com/rajdip1234
- Snake Output Branch: https://github.com/rajdip1234/output
- Workflow Logs: GitHub → Actions → workflow run

────────────────────────────────────────────
🧪 Optional: Workflow B (Local Commit Generation)
────────────────────────────────────────────
*(Use this instead of Step 8 if you prefer to generate commits locally before Actions)*

1. Adjust commit density (more = deeper color):
   git config user.name "Your Name"
   git config user.email "your-email@example.com
   # Bash / Git Bash
   COMMITS_PER_BLOCK=100 node index.js
   # PowerShell
   $env:COMMITS_PER_BLOCK="80"; node index.js

   ✅ You can safely use 80, 100, or any higher number. Higher = darker “RAJDIP”.
   

2. If push is rejected:
   git pull origin main --rebase
   git push origin main
   #git push -f origin main(Optional in rare case to push forcefully)
3. If conflicts occur during rebase:
- Fix them manually in listed files
- Run:
  git add <file>
  git rebase --continue
- Then rerun:
  COMMITS_PER_BLOCK=100 node index.js

4. After a successful local run:
- Open `.github/workflows/graph.yml`
- Comment or remove the `node index.js` step so GitHub Actions will not repeat commits.
- Keep only the snake-generation steps.


────────────────────────────────────────────
🔧 Troubleshooting & Recovery
────────────────────────────────────────────

✅ Reinstall dependencies cleanly:

   git checkout main
   npm ci || npm install
   grep -qxF 'node_modules/' .gitignore || echo 'node_modules/' >> .gitignore
   rm -rf node_modules
   git rm -r --cached node_modules 2>/dev/null || true


────────────────────────────────────────────
📌 Important Notes
────────────────────────────────────────────

- The script creates many timestamped commits — they are permanent in your public history.
- `reset=true` in the workflow should only be used for the very first run or when resetting history.
- Keep the repo **public** so contribution commits appear on your GitHub profile.
- Always check Actions logs if the snake generation fails — ensure:
  - `GITHUB_TOKEN` is available (it is by default)
  - Workflow permissions include `contents: write`
