import createAliases from "./create-aliases.js";
import { execCommand } from "../utils/helpers.js";

const install = async () => {
  // Install latest rackun version
  await execCommand("npm i -g rackun", "Installing latest rackun version");

  // Create aliases
  await createAliases();
};

export default install;
