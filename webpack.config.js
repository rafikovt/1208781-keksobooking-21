const path = require("path");
module.exports = {
    entry: [
        "./js/utils.js",
        "./js/backend.js",
        "./js/data.js",
        "./js/debounce.js",
        "./js/filter.js",
        "./js/preview.js",
        "./js/map.js",
        "./js/movepin.js",
        "./js/pin.js",
        "./js/card.js",
        "./js/form.js",
        "./js/main.js",
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname),
        iife: true
    },
    devtool: false
};

