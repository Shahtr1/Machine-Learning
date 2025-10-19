import { readdirSync, readFileSync, writeFileSync } from "fs";
import draw from "../common/draw.js";
import { createCanvas } from "canvas";
import constants from "../common/constants.js";
import utils from "../common/utils.js";

const canvas = createCanvas(400, 400);
const context = canvas.getContext("2d");

const fileNames = readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
fileNames.forEach((fn) => {
  const content = readFileSync(constants.RAW_DIR + "/" + fn);
  const { session, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    const paths = drawings[label];
    writeFileSync(
      constants.JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths)
    );

    generateImageFile(constants.IMG_DIR + "/" + id + ".png", paths);

    utils.printProgress(id, fileNames.length * 8);
    id++;
  }
});

writeFileSync(constants.SAMPLES, JSON.stringify(samples));

writeFileSync(
  constants.SAMPLES_JS,
  "const samples=" + JSON.stringify(samples) + ";"
);

function generateImageFile(outFile, paths) {
  context.clearRect(0, 0, canvas.width, canvas.height);

  draw.paths(context, paths);

  const buffer = canvas.toBuffer("image/png");
  writeFileSync(outFile, buffer);
}
