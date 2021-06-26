const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#FF4500",
              // "@text-color": "#8A8F9B",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
