import jsonfile from "jsonfile";
import moment from "moment-timezone";
import simpleGit from "simple-git";

const PATH_JSON = "./data.json";
const COMMITS_PER_BLOCK = parseInt(process.env.COMMITS_PER_BLOCK) || 30; // 30 commits per pixel
const TZ = process.env.TIMEZONE || "Asia/Kolkata";
const WEEKS = 53;

// Letter patterns (rows=7)
const LETTERS = {
  R: [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  A: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  J: [[0,0,0,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  D: [[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0]],
  I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
  P: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]]
};

const TEXT = ["R","A","J","D","I","P"];

// compute total width and center start offset
let totalWidth = 0;
for (let i = 0; i < TEXT.length; i++) {
  const w = LETTERS[TEXT[i]][0].length;
  totalWidth += w;
  if (i < TEXT.length - 1) totalWidth += 1;
}
const startOffset = Math.max(0, Math.floor((WEEKS - totalWidth) / 2));

const blocks = [];
let weekOffset = startOffset;
for (const ch of TEXT) {
  const grid = LETTERS[ch];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) blocks.push({ x: x + weekOffset, y });
    }
  }
  weekOffset += grid[0].length + 1;
}

const dateFor = (weekIndex, dayIndex, seqIndex = 0) => {
  return moment()
    .tz(TZ)
    .subtract(1, "year")
    .add(1, "day")
    .add(weekIndex, "weeks")
    .add(dayIndex, "days")
    .add(seqIndex, "seconds")
    .format();
};

async function run() {
  const git = simpleGit();

  // ensure main branch checkout (workflow likely runs on main)
  await git.fetch();
  try { await git.checkout("main"); } catch (e) { /* ignore if branch not exist */ }

  for (let b = 0; b < blocks.length; b++) {
    const { x, y } = blocks[b];
    for (let i = 0; i < COMMITS_PER_BLOCK; i++) {
      const dt = dateFor(x, y, i);
      await jsonfile.writeFile(PATH_JSON, { block: b, date: dt }, { spaces: 2 });
      await git.add([PATH_JSON]);
      await git.commit(`chore(contrib): pixel ${b} ${x}-${y} at ${dt}`, { "--date": dt });
    }
    console.log(`Block ${b+1}/${blocks.length} done.`);
  }

  console.log("Pushing commits to origin/main...");
  await git.push("origin", "main");
  console.log("Done.");
}

run().catch(err => {
  console.error("Script failed:", err);
  process.exit(1);
});
