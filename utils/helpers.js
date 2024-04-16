import childProcess from "child_process";
import util from "util";

export const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

export const logger = {
  ...console,
  log: (...params) => {
    console.log("%c❄️", "color:#94f2f4", ...params);
  },
  warn: (...params) => {
    console.warn("%c⚠️", "color:#94f2f4", ...params);
  },
  error: (...params) => {
    console.error("%c🚧", "color:#94f2f4", ...params);
  },
};

export const loading = (message) => {
  const slashCharacters = ["\\", "|", "/", "-"];
  let x = 0;
  process.stdout.write("𖦹 " + message + " ");
  const id = setInterval(function () {
    process.stdout.write("\r" + slashCharacters[x++]);
    x &= 3;
  }, 100);
  return {
    stop: () => {
      process.stdout.write("...\n");
      clearInterval(id);
    },
  };
};

const execAsync = util.promisify(childProcess.exec);

export const execCommand = async (command, message) => {
  const loader = loading(message);
  try {
    return await execAsync(command);
  } catch (error) {
    logger.error(error);
    return null;
  } finally {
    loader.stop();
  }
};

export const execMultiCommands = async (commands) => {
  const loader = loading(message);
  try {
    return await Promise.all(commands.map((c) => execAsync(c)));
  } catch (error) {
    logger.error(error);
    return null;
  } finally {
    loader.stop();
  }
};
