const utils = {};

utils.flaggedUsers = [1663882102141, 16639000040545, 1664485938220];

utils.styles = {
  car: "gray",
  fish: "red",
  house: "yellow",
  tree: "green",
  bicycle: "cyan",
  guitar: "blue",
  pencil: "magenta",
  clock: "lightgray",
};

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
