import jsonfile from "jsonfile";
import moment from "moment-timezone";
import simpleGit from "simple-git";

const PATH_JSON = "./data.json";
const COMMITS_PER_BLOCK = parseInt(process.env.COMMITS_PER_BLOCK) || 80;
const TZ = process.env.TIMEZONE || "Asia/Kolkata";
const WEEKS = 53;
const DRY_RUN = process.env.DRY_RUN === "true";

// 7x5 letter patterns (consistent height & width)
const LETTERS = {
  R: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,1,0,0],
    [1,0,0,1,0],
    [1,0,0,0,1]
  ],
  A: [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1]
  ],
  J: [
    [0,0,0,1,1],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],
  D: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0]
  ],
  I: [
    [1,1,1,1,1],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,1,1,1,1]
  ],
  P: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [1,0,0,0,0]
  ],
  B: [
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,0]
  ],
  S: [
    [0,1,1,1,1],
    [1,0,0,0,0],
    [1,0,0,0,0],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [0,0,0,0,1],
    [1,1,1,1,0]
  ],
  W: [
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,1,0,1],
    [1,0,1,0,1],
    [1,1,0,1,1],
    [1,0,0,0,1]
  ]
};

// Full name (no extra spacing)
const TEXT = ["R","A","J","D","I","P","B","I","S","W","A","S"];

// Calculate total text width
const textWidth = TEXT.reduce(
  (sum, ch) => sum + LETTERS[ch][0].length,
  0
);

// Center horizontally in 53 weeks
let weekOffset = Math.floor((WEEKS - textWidth) / 2);

// Build blocks
const blocks = [];
for (const ch of TEXT) {
  const grid = LETTERS[ch];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) {
        blocks.push({ x: x + weekOffset, y });
      }
    }
  }
  weekOffset += grid[0].length; // no extra gap
}

// Preview
console.log("\nPreview:\n");
for (let y = 0; y < 7; y++) {
  let row = "";
  for (let x = 0; x < WEEKS; x++) {
    row += blocks.some(b => b.x === x && b.y === y) ? "█" : " ";
  }
  console.log(row);
}
console.log("\n");

// Date helper
const dateFor = (weekIndex, dayIndex, seq = 0) =>
  moment()
    .tz(TZ)
    .subtract(51, "weeks")
    .add(weekIndex, "weeks")
    .add(dayIndex, "days")
    .add(seq, "seconds")
    .format();

async function run() {
  const git = simpleGit();
  await git.fetch();
  try { await git.checkout("main"); } catch {}

  if (DRY_RUN) {
    console.log("DRY-RUN enabled. No commits.");
    return;
  }

  for (let b = 0; b < blocks.length; b++) {
    const { x, y } = blocks[b];
    for (let i = 0; i < COMMITS_PER_BLOCK; i++) {
      const dt = dateFor(x, y, i);
      await jsonfile.writeFile(PATH_JSON, { block: b, date: dt });
      await git.add(PATH_JSON);
      await git.commit(`pixel ${b}`, { "--date": dt });
    }
    console.log(`Block ${b + 1}/${blocks.length} done`);
  }

  await git.push("origin", "main");
  console.log("All commits pushed");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
