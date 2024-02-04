#!/usr/bin/env node

import exportComponents from "../commands/export-components.js";
import tagComponents from "../commands/tag-components.js";

const action = process.argv[2];

switch (action) {
  case "tag":
    tagComponents();
    break;

  case "export":
    exportComponents();
    break;

  default:
    break;
}
