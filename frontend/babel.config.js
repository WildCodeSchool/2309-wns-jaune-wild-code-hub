module.exports = {
  presets: [
    "next/babel", // This includes necessary configurations for Next.js
    "@babel/preset-typescript", // For TypeScript
    ["@babel/preset-env", { targets: { node: "current" } }], // For Node.js target
    "@babel/preset-react", // For React
  ],
  plugins: ["@babel/plugin-transform-runtime"],
};
