const { readFileSync, writeFileSync } = require("fs");

const { INSTALL_COMMAND } = require("../utils/constants.js");
const createAliases = require("./create-aliases.js");
const { execCommand } = require("../utils/helpers.js");

const init = async () => {
  // Install latest rackun version
  await execCommand("npm i -g rackun", "Installing latest rackun version");

  const packageFile = "package.json";
  const packageFileContent = readFileSync(packageFile);
  const packageFileObject = JSON.parse(packageFileContent);

  // Install rackun when installing packages and rackun is not avalable
  const scripts = { ...(packageFileObject?.scripts ?? {}) };
  if (!scripts.prepare) {
    scripts.prepare = INSTALL_COMMAND;
  } else if (!scripts.prepare?.includes(INSTALL_COMMAND)) {
    scripts.prepare += ` && ${INSTALL_COMMAND}`;
  }

  writeFileSync(
    packageFile,
    JSON.stringify(
      { ...packageFileObject, scripts },
      0,
      /\t/.test(packageFileContent) ? "\t" : 2
    ) + "\n"
  );

  // Create git alias
  await createAliases();
};

module.exports = init;
