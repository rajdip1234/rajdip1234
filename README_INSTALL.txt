RAJDIP Graph Automation - Final package

Files included:
- index.js
- data.json
- package.json
- .github/workflows/graph.yml

Instructions (one-time setup):

1. Clone your repo locally:
   git clone https://github.com/rajdip1234/rajdip1234.git
   cd rajdip1234

2. Unzip package content into the repo root, overwriting files as needed.

3. Install dependencies:
   npm install

4. If you want a CLEAN start (recommended for first run), run the workflow manually:
   - Go to GitHub > Actions > RAJDIP Graph + Snake > Run workflow
   - Set 'reset' input to 'true' and click Run workflow
   OR run reset locally (dangerous):
     git checkout --orphan temp_branch
     git add -A
     git commit -m "Reset history"
     git branch -D main
     git branch -m main
     git push -f origin main

5. To generate RAJDIP and push commits immediately (local run):
   node index.js

6. Commit and push workflow and files:
   git add index.js data.json package.json .github/workflows/graph.yml
   git commit -m "Add RAJDIP Graph Automation"
   git push origin main

7. Verify:
   - Check your GitHub profile contributions: https://github.com/rajdip1234
   - Check output branch for snake: https://github.com/rajdip1234/output

Notes:
- The workflow's reset step runs only when you dispatch the workflow with reset=true.
- The script writes many commits. These are permanent in your public history.
- Use responsibly.
