const utils = {};

utils.flaggedUsers = [1663882102141, 16639000040545, 1664485938220];
utils.priorityUsers = [1760957923055, 1760958744459];

utils.styles = {
  car: { color: "gray", text: "🚗" },
  fish: { color: "red", text: "🦈" },
  house: { color: "yellow", text: "🏠" },
  tree: { color: "green", text: "🌳" },
  bicycle: { color: "cyan", text: "🚲" },
  guitar: { color: "blue", text: "🎸" },
  pencil: { color: "magenta", text: "✏️" },
  clock: { color: "lightgray", text: "🕒" },
};
utils.styles["?"] = { color: "red", text: "❓" };

utils.formatPercent = (n) => {
  return (n * 100).toFixed(2) + "%";
};

utils.printProgress = (count, max) => {
  process.stdout.clearLine();
  process.stdout.cursorTo(0); // delete the line in console
  const percent = utils.formatPercent(count / max);
  process.stdout.write(count + "/" + max + " (" + percent + ")");
};

// if condition to make imports in html work
if (typeof module !== "undefined" && module.exports) {
  module.exports = utils;
}
