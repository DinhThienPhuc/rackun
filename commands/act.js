import {
  execCommand,
  execMultiCommands,
  logger,
  wait,
} from "../utils/helpers.js";

const act = async () => {
  const startTime = performance.now();
  const commitMsg = process.argv[4];

  const [unstagedFiles, newFiles] = await execMultiCommands(
    ["git diff --name-only", "git ls-files --other --exclude-standard"],
    "Checking core components changes"
  );

  const allCommitedFiles = [
    ...unstagedFiles.stdout.split("\n"),
    ...newFiles.stdout.split("\n"),
  ];
  const allCommitedCoreFiles = allCommitedFiles.filter((file) =>
    file.includes("src/_core/")
  );

  if (!allCommitedCoreFiles.length) {
    logger.log("No core components found!");
  } else {
    await execCommand(
      `bit tag -m 'Update'`,
      "Tagging all core components changes"
    );
    await wait(2000);
    logger.log("Tagged: \n", allCommitedCoreFiles.join("\n"));
  }

  await execCommand("git add .", "Adding files");
  await execCommand(`git commit -m "${commitMsg}"`, "Committing");
  const endTime = performance.now();

  logger.log(`🦝 Done in ${((endTime - startTime) / 1000).toFixed(1)}s`);
};

export default act;
