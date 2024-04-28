#!/usr/bin/env node

const act = require("./commands/act.js");
const init = require("./commands/init.js");
const install = require("./commands/install.js");
const thrust = require("./commands/thrust.js");

const action = process.argv[2];

switch (action) {
  case "act":
    act();
    break;
  case "thrust":
    thrust();
    break;
  case "init":
    init();
    break;
  case "install":
    install();
    break;
  default:
    break;
}
