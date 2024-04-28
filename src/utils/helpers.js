const childProcess = require("child_process");
const util = require("util");

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const logger = {
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

const loading = (message) => {
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

const execCommand = async (command, message) => {
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

const execMultiCommands = async (commands, message) => {
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

module.exports = {
  wait,
  logger,
  loading,
  execAsync,
  execCommand,
  execMultiCommands,
};
