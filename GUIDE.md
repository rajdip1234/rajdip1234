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

2. Clone the empty repo locally:
   cd rajdip1234
   git clone https://github.com/rajdip1234/rajdip1234.git

3. Download project files and replace as needed.

📛 Configure Git Identity

git config --global user.name "Rajdip Biswas"
git config --global user.email "rajdippharma1989@gmail.com"

Verify:
git config --get user.name
git config --get user.email

────────────────────────────────────────────
📂 Branch Setup
────────────────────────────────────────────

git checkout -b main
git branch -M main
git commit --allow-empty -m "initial commit"
git push -u origin main

────────────────────────────────────────────
📦 Install Dependencies
────────────────────────────────────────────

cd code
npm install jsonfile moment simple-git random

────────────────────────────────────────────
🧪 Dry Run (Optional)
────────────────────────────────────────────

CMD:

node index.js --dry

PowerShell:
$env:DRY_RUN="true"; node index.js

────────────────────────────────────────────
✅ Verify Output
────────────────────────────────────────────

Ensure ASCII output shows:

RD BISWAS!

Increase density if needed:
set COMMITS_PER_BLOCK=100 && node index.js

or

node index.js --commits=100

────────────────────────────────────────────
📤 Push Project
────────────────────────────────────────────

git add .
git commit -m "Initial RAJDIP Graph Automation"
git push origin main

────────────────────────────────────────────
🚀 Generate Graph (UPDATED)
────────────────────────────────────────────

1.  Run workflow:

Go to:
GitHub → Actions → **RAJDIP Graph + Snake**

🔰 First Run (IMPORTANT):

Set:
reset = true  
generate = true  

Click **Run workflow**

This will:
- Backup your branch
- Reset repo history
- Generate contribution graph

Wait 2–5 minutes

────────────────────────────────────────────
⚠️ Important Behavior (NEW)
────────────────────────────────────────────

After first run:

✔ You DO NOT need to manually run workflow again

Just push changes:

git add .
git commit -m "update"
git push

➡ Graph will update automatically

────────────────────────────────────────────
🔁 Manual Regeneration (Optional)
────────────────────────────────────────────

Run workflow with:

reset = false  
generate = true  

────────────────────────────────────────────
⚠️ Reset Usage Rule (IMPORTANT)
────────────────────────────────────────────

Use reset = true ONLY:
- First run
- If graph is broken

❌ Do NOT use repeatedly (it deletes history)

✅ Backup branch is created automatically

────────────────────────────────────────────
📊 Verification
────────────────────────────────────────────

Check:
- GitHub Profile → Contribution Graph
- Snake animation branch → output

────────────────────────────────────────────
🧪 Optional: Local Workflow
────────────────────────────────────────────

cd code
COMMITS_PER_BLOCK=100 node index.js

git add .
git commit -m "Generate graph"
git push origin main

────────────────────────────────────────────
🔧 Troubleshooting
────────────────────────────────────────────

cd code
npm ci || npm install

────────────────────────────────────────────
📌 Notes
────────────────────────────────────────────

- Repo must be PUBLIC
- Repo name must match username
- Email must match GitHub
- Do not delete repo after generation

GitHub Settings:
✔ Include private contributions
✔ Activity overview enabled