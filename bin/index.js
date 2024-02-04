#!/usr/bin/env node

import tagComponents from "../commands/tagComponents.js";

const action = process.argv[2];

switch (action) {
  case "tag":
    tagComponents();
    break;

  // case "export":
  //   deleteFileOrFolder(params);
  //   break;

  default:
    break;
}
