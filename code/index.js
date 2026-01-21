import jsonfile from "jsonfile";
import moment from "moment-timezone";
import simpleGit from "simple-git";

const PATH_JSON = "./data.json";
const COMMITS_PER_BLOCK = Number(process.env.COMMITS_PER_BLOCK || 40);
const TZ = process.env.TIMEZONE || "Asia/Kolkata";
const WEEKS = 53;
const DRY_RUN = process.env.DRY_RUN === "true";

/*
  4x7 FONT — guaranteed to fit "RAJDIP BISWAS"
*/
const LETTERS = {
  R: [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1]
  ],
  A: [
    [0,1,1,0],
    [1,0,0,1],
    [1,1,1,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1]
  ],
  J: [
    [0,0,1,1],
    [0,0,0,1],
    [0,0,0,1],
    [0,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [0,1,1,0]
  ],
  D: [
    [1,1,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,0]
  ],
  I: [
    [1,1,1,1],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [1,1,1,1]
  ],
  P: [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0],
    [1,0,0,0]
  ],
  B: [
    [1,1,1,0],
    [1,0,0,1],
    [1,1,1,0],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,1,1,0]
  ],
  S: [
    [0,1,1,1],
    [1,0,0,0],
    [0,1,1,0],
    [0,0,0,1],
    [0,0,0,1],
    [1,0,0,1],
    [0,1,1,0]
  ],
  W: [
    [1,0,0,1],
    [1,0,0,1],
    [1,0,0,1],
    [1,0,1,1],
    [1,1,0,1],
    [1,1,0,1],
    [1,0,0,1]
  ]
};

// Name with space marker
const TEXT = ["R","A","J","D","I","P"," ","B","I","S","W","A","S"];

// Compute width safely
const widthOf = ch => (ch === " " ? 1 : LETTERS[ch][0].length);
const textWidth = TEXT.reduce((s, c) => s + widthOf(c), 0);

// Center text
let offsetX = Math.floor((WEEKS - textWidth) / 2);

// Build pixels
const pixels = [];
for (const ch of TEXT) {
  if (ch === " ") {
    offsetX += 1;
    continue;
  }
  const grid = LETTERS[ch];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) pixels.push({ x: offsetX + x, y });
    }
  }
  offsetX += grid[0].length;
}

// Console preview
console.log("\nPreview:\n");
for (let y = 0; y < 7; y++) {
  let line = "";
  for (let x = 0; x < WEEKS; x++) {
    line += pixels.some(p => p.x === x && p.y === y) ? "█" : " ";
  }
  console.log(line);
}
console.log("\n");

// Commit date helper
const dateFor = (x, y, i) =>
  moment()
    .tz(TZ)
    .subtract(53, "weeks")
    .add(x, "weeks")
    .add(y, "days")
    .add(i, "seconds")
    .toISOString();

async function run() {
  if (DRY_RUN) {
    console.log("DRY-RUN enabled. No commits.");
    return;
  }

  const git = simpleGit();
  await git.checkout("main");

  for (let i = 0; i < pixels.length; i++) {
    const { x, y } = pixels[i];
    for (let c = 0; c < COMMITS_PER_BLOCK; c++) {
      const dt = dateFor(x, y, c);
      await jsonfile.writeFile(PATH_JSON, { pixel: i, date: dt });
      await git.add(PATH_JSON);
      await git.commit(`pixel-${i}`, { "--date": dt });
    }
  }

  await git.push("origin", "main");
  console.log("All commits pushed.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
