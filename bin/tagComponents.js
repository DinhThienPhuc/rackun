import { ACTIONS_MAP_WITH_NPM, TARGET_TEXT } from "../constants/index.js";
import { execAsync, readFileAsync } from "./base.js";

import Listr from "listr";
import chalk from "chalk";
import { hideBin } from "yargs/helpers";
import logSymbols from "log-symbols";
import yargs from "yargs/yargs";

const argv = yargs(hideBin(process.argv)).argv;

const tagComponent = async (action, params) => {
  try {
    let targets = argv.target;
    console.log("targets ", targets);
    console.log("argv ", argv);
  } catch (e) {
    // spinner.fail(e);
    console.log("e", e);
  }
};

export default tagComponent;
