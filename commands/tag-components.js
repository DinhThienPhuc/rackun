import Listr from "listr";
import chalk from "chalk";
import { execAsync } from "./base.js";
import logSymbols from "log-symbols";

const tagComponents = async () => {
  try {
    const tasks = new Listr([
      {
        title: `${chalk.bold.green("CHECK")} core components changes.\n`,
        task: async (ctx, task) => {
          const result = await execAsync("git diff --name-only HEAD HEAD^");

          if (result?.stderr) {
            throw new Error(result?.stderr);
          }

          const allCommitedFiles = result.stdout.split("\n");
          const allCommitedCoreFiles = allCommitedFiles.filter((file) =>
            file.includes("src/_core/")
          );

          if (!allCommitedCoreFiles.length) {
            task.skip("No core components found!");
          } else {
            ctx.commitedFiles = allCommitedCoreFiles;
          }
        },
      },
      {
        title: `${chalk.bold.green("TAG")} all core components changes.\n`,
        enabled: (ctx) => ctx.commitedFiles && ctx.commitedFiles.length > 0,
        task: async (ctx) => {
          const result = await execAsync(
            `bit tag -m '[${Date.now()}]: update core components'`
          );

          if (result?.stderr) {
            throw new Error(result?.stderr);
          }

          console.log(
            logSymbols.success,
            `Tagged: \n${ctx.commitedFiles.join("\n")}`
          );
        },
      },
      {
        title: `${chalk.bold.green("ADD")} ${chalk.bold("bitmap")} file.\n`,
        enabled: (ctx) => ctx.commitedFiles && ctx.commitedFiles.length > 0,
        task: async () => {
          const result = await execAsync("git add .");

          if (result?.stderr) {
            throw new Error(result?.stderr);
          }
        },
      },
    ]);

    const startTime = performance.now();
    await tasks.run();
    const endTime = performance.now();

    console.log(
      `❄️ ❄️ ❄️  Done in ${((endTime - startTime) / 1000).toFixed(1)}s`
    );
  } catch (e) {
    // spinner.fail(e);
    console.error("Error: ", e);
  }
};

export default tagComponents;
