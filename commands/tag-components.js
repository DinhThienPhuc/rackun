import Listr from "listr";
import chalk from "chalk";
import { execAsync } from "../utils/index.js";
import logSymbols from "log-symbols";

const tagComponents = async () => {
  try {
    // TODO: add checking bit installed tasks
    const tasks = new Listr([
      {
        title: `${chalk.bold.green("CHECK")} core components changes.\n`,
        enabled: (ctx) => !ctx.commitBitmap,
        task: async (ctx, task) => {
          const result = await execAsync("git diff --name-only --cached");

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
        enabled: (ctx) =>
          !ctx.commitBitmap &&
          ctx.commitedFiles &&
          ctx.commitedFiles.length > 0,
        task: async (ctx) => {
          const result = await execAsync(`bit tag -m '${Date.now()}'`);

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
        title: `${chalk.bold.green("UPDATE")} ${chalk.bold("bitmap")} file.\n`,
        enabled: (ctx) => !ctx.commitBitmap,
        task: async (ctx, task) => {
          const result2 = await execAsync("git diff --name-only --cached");

          if (result2?.stderr) {
            throw new Error(result2?.stderr);
          }

          const containedBitmapFile = result2.stdout.split("\n");

          if (
            containedBitmapFile.length === 1 &&
            containedBitmapFile[0] === ".bitmap"
          ) {
            ctx.commitBitmap = true;
            const result3 = await execAsync("git add .");
            const result4 = await execAsync(
              "git commit -m 'Update bitmap file!'"
            );

            if (result3?.stderr || result4.stderr) {
              throw new Error(result3?.stderr || result4.stderr);
            }
            return;
          }

          task.skip("No bitmap file found!");
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
