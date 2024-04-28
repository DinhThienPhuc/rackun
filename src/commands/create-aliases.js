const { execCommand, logger } = require("../utils/helpers.js");

const { ALIAS_DATA } = require("../utils/constants.js");

const createAliases = async () => {
  // Check git aliases exist
  const gitConfig = await execCommand(
    "git config --list",
    "Checking aliases exist"
  );

  if (
    gitConfig.stdout.includes(
      `alias.${ALIAS_DATA.ACT.key}=${ALIAS_DATA.ACT.command}\n`
    ) &&
    gitConfig.stdout.includes(
      `alias.${ALIAS_DATA.THRUST.key}=${ALIAS_DATA.THRUST.command}\n`
    )
  ) {
    logger.log("Aliases existed!");
    process.exit();
  }

  // Create if not available
  await execCommand(
    `git config --global alias.${ALIAS_DATA.ACT.key} "!${ALIAS_DATA.ACT.command}"`,
    "Creating git alias for acting (committing)"
  );
  await execCommand(
    `git config --global alias.${ALIAS_DATA.THRUST.key} "!${ALIAS_DATA.THRUST.command}"`,
    "Creating git alias for thrust (pushing)"
  );

  logger.log("Create aliases success!");
};

module.exports = createAliases;
