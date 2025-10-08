import jsonfile from "jsonfile";
import moment from "moment-timezone";
import simpleGit from "simple-git";

const PATH_JSON = "./data.json";
const COMMITS_PER_BLOCK = parseInt(process.env.COMMITS_PER_BLOCK) || 80;
const TZ = process.env.TIMEZONE || "Asia/Kolkata";
const WEEKS = 53;
const DRY_RUN = process.env.DRY_RUN === "true"; // ✅ optional dry-run

// Letter patterns (7 rows each)
const LETTERS = {
  R: [[1,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,0],[1,0,1,0,0],[1,0,0,1,0],[1,0,0,0,1]],
  A: [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1]],
  J: [[0,0,0,1,1],[0,0,0,0,1],[0,0,0,0,1],[0,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  D: [[1,1,1,0,0],[1,0,0,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,1,0],[1,1,1,0,0]],
  I: [[1,1,1],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,1,0],[1,1,1]],
  P: [[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,1,1,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]]
};

const TEXT = ["R", "A", "J", "D", "I", "P"];

// Calculate total width
let totalWidth = 0;
for (let i = 0; i < TEXT.length; i++) {
  totalWidth += LETTERS[TEXT[i]][0].length;
  if (i < TEXT.length - 1) totalWidth += 1;
}

// ✅ Always start from week 0
const startOffset = 0;

// Build blocks
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

// 🧪 Preview letter grid
console.log("\n🧪 Letter Grid Preview:\n");
for (let y = 0; y < 7; y++) {
  let row = "";
  for (let x = 0; x < WEEKS; x++) {
    row += blocks.some(b => b.x === x && b.y === y) ? "█" : " ";
  }
  console.log(row);
}
console.log("\n✅ Preview complete.\n");

// Date helper
/*
const dateFor = (weekIndex, dayIndex, seqIndex = 0) =>
  moment()
    .tz(TZ)
    .subtract(1, "year")
    .add(1, "day")
    .add(weekIndex, "weeks")
    .add(dayIndex, "days")
    .add(seqIndex, "seconds")
    .format();
*/
const dateFor = (weekIndex, dayIndex, seqIndex = 0) =>
  moment()
    .tz(TZ)
    .subtract(51, "weeks")
    .add(weekIndex, "weeks")
    .add(dayIndex, "days")
    .add(seqIndex, "seconds")
    .format();

async function run() {
  const git = simpleGit();
  await git.fetch();
  try {
    await git.checkout("main");
  } catch {}

  if (DRY_RUN) {
    console.log("🔍 DRY-RUN MODE ENABLED — No commits will be made.");
    blocks.forEach((b, i) => {
      console.log(`Would commit: Block ${i} at week=${b.x}, day=${b.y}`);
    });
    return;
  }

  for (let b = 0; b < blocks.length; b++) {
    const { x, y } = blocks[b];
    for (let i = 0; i < COMMITS_PER_BLOCK; i++) {
      const dt = dateFor(x, y, i);
      await jsonfile.writeFile(PATH_JSON, { block: b, date: dt }, { spaces: 2 });
      await git.add([PATH_JSON]);
      await git.commit(`chore(contrib): pixel ${b} ${x}-${y} at ${dt}`, { "--date": dt });
    }
    console.log(`✅ Block ${b + 1}/${blocks.length} complete.`);
  }

  console.log("🚀 Pushing commits...");
  await git.push("origin", "main");
  console.log("✅ All commits pushed successfully!");
}

run().catch(err => {
  console.error("❌ Script failed:", err);
  process.exit(1);
});
