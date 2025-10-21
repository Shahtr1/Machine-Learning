import { readFileSync, writeFileSync } from "fs";
import constants from "../common/constants.js";
import features from "../common/features.js";

const samples = JSON.parse(readFileSync(constants.SAMPLES));

for (const sample of samples) {
  const paths = JSON.parse(
    readFileSync(constants.JSON_DIR + "/" + sample.id + ".json")
  );
  sample.point = [features.getPathCount(paths), features.getPointCount(paths)];
}

const featureNames = ["Path Count", "Point Count"];

writeFileSync(
  constants.FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((s) => ({ point: s.point, label: s.label })),
  })
);

writeFileSync(
  constants.FEATURES_JS,
  `const features=
    ${JSON.stringify({ featureNames, samples })}
    ;`
);
