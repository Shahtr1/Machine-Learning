const features = {};

features.getPathCount = (paths) => paths.length;

features.getPointCount = (paths) => {
  const points = paths.flat();
  return points.length;
};

// if condition to make imports in html work
if (typeof module !== "undefined" && module.exports) {
  module.exports = features;
}
