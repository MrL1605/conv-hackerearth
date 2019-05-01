'use strict';

var exec = require('child_process').exec;

// var process = require("process");

function puts(error, stdout, stderr) {
    console.log(stdout);
}

function WebpackShellPlugin(options) {
    let defaultOptions = {
        onBuildStart: [],
        onBuildEnd: []
    };

    this.options = Object.assign(defaultOptions, options);
}

WebpackShellPlugin.prototype.apply = function (compiler) {
    const options = this.options;

    compiler.hooks.beforeRun.tap("WebpackShellPlugin", (compilation) => {
        if (options.onBuildStart.length) {
            console.log("Executing pre-build scripts");
            options.onBuildStart.forEach(script => exec(script, puts));
        }
    });

    compiler.hooks.afterEmit.tap("WebpackShellPlugin", (compilation) => {
        if (options.onBuildEnd.length) {
            console.log("Executing post-build scripts");
            options.onBuildEnd.forEach(script => exec(script, puts));
        }
    });
};

module.exports = WebpackShellPlugin;


