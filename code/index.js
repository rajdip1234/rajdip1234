import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";
const WEEKS = 53;

/* ✅ USE ENV VARIABLE FROM graph.yml */
const commitsArg = process.argv.find(arg => arg.startsWith("--commits="));
const cliCommits = commitsArg ? Number(commitsArg.split("=")[1]) : null;

const COMMITS_PER_PIXEL =
  cliCommits || Number(process.env.COMMITS_PER_BLOCK || 80);

/* 4x7 FONT */
const FONT = {
R:[[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
D:[[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
B:[[1,1,1,0],[1,0,0,1],[1,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,1,0]],
I:[[1,1,1,1],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0],[1,1,1,1]],
S:[[0,1,1,1],[1,0,0,0],[0,1,1,0],[0,0,0,1],[0,0,0,1],[1,0,0,1],[0,1,1,0]],
W:[[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,1,1],[1,1,0,1],[1,1,0,1],[1,0,0,1]],
A:[[0,1,1,0],[1,0,0,1],[1,1,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],
"!":[[0,1,0],[0,1,0],[0,1,0],[0,1,0],[0,0,0],[0,1,0],[0,0,0]]
};

const LETTER_GAP = 1;
const WORD_GAP = 2;

/* 🔹 DRAW GRAPH FUNCTION */
function drawgraph(text){

  const chars = text.split("");
  const pixels = [];

  const widthOf = ch =>
    ch === " " ? WORD_GAP : FONT[ch][0].length + LETTER_GAP;

  const totalWidth = chars.reduce((s,c)=>s+widthOf(c),0);
  let offsetX = Math.floor((WEEKS - totalWidth)/2);

  for(const ch of chars){

    if(ch===" "){
      offsetX += WORD_GAP;
      continue;
    }

    const grid = FONT[ch];

    for(let y=0;y<7;y++){
      for(let x=0;x<grid[y].length;x++){
        if(grid[y][x]){
          pixels.push({x:offsetX+x,y});
        }
      }
    }

    offsetX += grid[0].length + LETTER_GAP;
  }

  return pixels;
}

/* 🔹 TEXT TO DRAW */
const pixels = drawgraph("RD BISWAS!");

/* ✅ DRY RUN PREVIEW (NEW) */
if (process.env.DRY_RUN === "true") {
  const grid = Array.from({ length: 7 }, () =>
    Array.from({ length: WEEKS }, () => " ")
  );

  for (const { x, y } of pixels) {
    grid[y][x] = "#";
  }

  console.log("\nPreview (RD BISWAS!):\n");
  grid.forEach(row => console.log(row.join("")));
  process.exit(0);
}

/* 🔹 IMPROVED COMMIT FUNCTION */
const makeCommits = async (n) => {
  if(n <= 0){
    await simpleGit().push();
    console.log("✅ Graph generation complete");
    return;
  }

  const p = pixels[random.int(0, pixels.length - 1)];
  const {x,y} = p;

  const date = moment()
    .subtract(1, "year")
    .add(1, "day")
    .add(x, "weeks")
    .add(y, "days")
    .format();

  const data = { date };

  await jsonfile.writeFile(path, data);

  await simpleGit()
    .add([path])
    .commit(date, { "--date": date });

  return makeCommits(n - 1);
};

/* 🔹 START */
makeCommits(pixels.length * COMMITS_PER_PIXEL);