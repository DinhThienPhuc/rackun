import Listr from "listr";
import chalk from "chalk";
import { execAsync } from "./base.js";

const exportComponents = async () => {
  try {
    // TODO: add checking bit installed tasks
    const tasks = new Listr([
      {
        title: `${chalk.bold.green("EXPORT")} core components tagged.\n`,
        task: async () => {
          const result = await execAsync("bit export");

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

export default exportComponents;
