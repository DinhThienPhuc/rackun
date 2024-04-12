#!/usr/bin/env node

import act from "../commands/act.js";
import init from "../commands/init.js";
import install from "../commands/install.js";

const action = process.argv[2];

switch (action) {
  case "act":
    act();
    break;
  // case "thrust":
  //   thrust();
  //   break;
  case "init":
    init();
    break;
  case "install":
    install();
    break;
  default:
    break;
}
