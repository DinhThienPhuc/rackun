const createAliases = require("./create-aliases.js");
const { execCommand } = require("../utils/helpers.js");

const install = async () => {
  // Install latest rackun version
  await execCommand("npm i -g rackun", "Installing latest rackun version");

  // Create aliases
  await createAliases();
};

module.exports = install;
