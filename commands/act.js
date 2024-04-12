import { execCommand, logger } from "../utils/helpers.js";

const act = async () => {
  const startTime = performance.now();
  const commitMsg = process.argv[4];
  let includedCoreComponents = true;

  const result1 = await execCommand(
    "git diff --name-only --cached",
    "Checking core components changes"
  );

  const allCommitedFiles = result1.stdout.split("\n");
  const allCommitedCoreFiles = allCommitedFiles.filter((file) =>
    file.includes("src/_core/")
  );

  if (!allCommitedCoreFiles.length) {
    includedCoreComponents = false;
    logger.log("No core components found!");
  }

  if (includedCoreComponents) {
    await execCommand(
      `bit tag -m 'Updating components'`,
      "Tagging all core components changes"
    );

    logger.log("Tagged: \n", allCommitedCoreFiles.join("\n"));
  }

  await execCommand("git add .", "Adding files");
  await execCommand(`git commit -m '${commitMsg}'`, "Committing");
  const endTime = performance.now();

  logger.log(`🦝 Done in ${((endTime - startTime) / 1000).toFixed(1)}s`);
};

export default act;
