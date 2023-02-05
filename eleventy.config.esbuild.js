const esbuild = require("esbuild");

module.exports = config => {
  config.on("afterBuild", () => {
    return esbuild.build({
      entryPoints: ["public/js/markov.js"],
      outdir: "_site/assets/js",
      bundle: true,
      minify: process.env.ELEVENTY_ENV === "production",
      sourcemap: process.env.ELEVENTY_ENV !== "production",
    });
  });
  config.addWatchTarget("./public/js");
};
