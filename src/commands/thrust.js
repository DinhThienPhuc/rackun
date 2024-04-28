const { execCommand, logger } = require("../utils/helpers.js");

const thrust = async () => {
  const startTime = performance.now();
  const [, , , ...params] = process.argv;

  await execCommand("bit export", "Exporting core components tagged");

  await execCommand(`git push ${params.join(" ")}`, "Pushing to github");
  const endTime = performance.now();

  logger.log(`🦝 Done in ${((endTime - startTime) / 1000).toFixed(1)}s`);
};

module.exports = thrust;
