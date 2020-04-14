module.exports = function (env, argv) {
  return env && env.production
    ? require("./build/webpack.prod.config")
    : require("./build/webpack.dev.config");
};
