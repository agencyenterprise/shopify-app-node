module.exports = (api) => {
  api.cache.forever();
  const config = {
    presets: [
      "next/babel",
      [
        "@babel/env",
        {
          targets: {
            node: "current",
          },
        },
      ],
    ],
    sourceMaps: true,
    plugins: [
      "add-module-exports",
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            src: "./src",
          },
        },
      ],
    ],
    ignore: ["node_modules", "../node_modules"],
  };

  return config;
};
