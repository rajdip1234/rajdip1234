import jsonfile from "jsonfile";
import moment from "moment-timezone";
import simpleGit from "simple-git";

const PATH_JSON = "./data.json";
const COMMITS_PER_BLOCK = Number(process.env.COMMITS_PER_BLOCK || 80);
const TZ = process.env.TIMEZONE || "Asia/Kolkata";
const WEEKS = 53;
const DRY_RUN = process.env.DRY_RUN === "true";

/*
  Compact 4x7 FONT — guaranteed to fit "RAJDIP BISWAS"
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

const LETTER_GAP = 1;
const WORD_GAP = 2;

// Calculate total width for centering
const widthOf = ch =>
  ch === " " ? WORD_GAP : LETTERS[ch][0].length + LETTER_GAP;

const textWidth = TEXT.reduce((s, c) => s + widthOf(c), 0);
let offsetX = Math.floor((WEEKS - textWidth) / 2);

// Build pixels
const pixels = [];
for (const ch of TEXT) {
  if (ch === " ") {
    offsetX += WORD_GAP;
    continue;
  }
  const grid = LETTERS[ch];
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x]) pixels.push({ x: offsetX + x, y });
    }
  }
  offsetX += grid[0].length + LETTER_GAP;
}

// Console preview
console.log("\nPreview:\n");
for (let y = 0; y < 7; y++) {
  let row = "";
  for (let x = 0; x < WEEKS; x++) {
    row += pixels.some(p => p.x === x && p.y === y) ? "█" : " ";
  }
  console.log(row);
}
console.log("\n");

// Commit date helper (stable alignment)
const dateFor = (x, y, i) =>
  moment()
    .tz(TZ)
    .subtract(WEEKS - 1, "weeks")
    .add(x, "weeks")
    .add(y, "days")
    .add(i, "seconds")
    .toISOString();

async function run() {
  if (DRY_RUN) {
    console.log("DRY RUN enabled. No commits created.");
    return;
  }

  const git = simpleGit({ baseDir: ".." });
  //const git = simpleGit();
  try {
    await git.checkout("main");
  } catch (err) {
    await git.checkoutLocalBranch("main");
  }

  for (let p = 0; p < pixels.length; p++) {
    const { x, y } = pixels[p];
    for (let i = 0; i < COMMITS_PER_BLOCK; i++) {
      const dt = dateFor(x, y, i);
      await jsonfile.writeFile(PATH_JSON, { pixel: p, date: dt });
      await git.add("code/data.json");
      //await git.add("data.json");
      await git.commit(`pixel-${p}`, { "--date": dt });
    }
  }

  await git.push("origin", "main");
  console.log("All commits pushed successfully.");
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
