/* eslint-disable import/no-commonjs */
module.exports = api => {
  const env = api.env();
  const caller = api.caller(inst => (inst && inst.name) || "any");

  const isBundler = caller === "rollup-plugin-babel";
  const isCli = caller === "@babel/node";
  const isTest = /\b(test)\b/.exec(env);
  const modules = (isTest && !isBundler) || isCli ? "commonjs" : false;
  const isUmd = /\b(umd)\b/.exec(env);

  // console.log(`>>> Babel: Env="${env}" Caller="${caller}" Modules="${modules}"`)

  return {
    sourceMaps: true,
    plugins: [
      [
        "@babel/proposal-object-rest-spread",
        {
          useBuiltIns: true,
          loose: true
        }
      ],
      ["@babel/plugin-proposal-class-properties", { loose: true }],
      isUmd
        ? null
        : [
            "@babel/transform-runtime",
            {
              helpers: true,
              regenerator: false
            }
          ]
    ].filter(Boolean),
    presets: [
      [
        "@babel/env",
        {
          useBuiltIns: "usage",
          corejs: 3,
          loose: true,
          modules,
          targets: {
            node: 10
          }
        }
      ],
      [
        "@babel/typescript",
        {
          // We like JSX everywhere. No reason why we have to deal with
          // legacy type assertion supported in earlier versions.
          allExtensions: true,
          isTSX: true
        }
      ]
    ]
  };
};
