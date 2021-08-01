module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "lib"}, "antd"],
    ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib"}, "antd-mobile"],
  ],
}
