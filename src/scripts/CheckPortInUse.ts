import { default as chalk } from "chalk";
import * as detectPort from "detect-port";

(function CheckPortInUse() {
  const port: number = process.env.PORT
    ? parseInt(process.env.PORT!, 10)
    : 1212;

  detectPort(port, (__, availablePort: number) => {
    if (port !== availablePort) {
      throw new Error(
        chalk.whiteBright.bgRed.bold(
          `Port "${port}" on "localhost" is already in use. Please use another port. ex: PORT=4343 npm run dev`
        )
      );
    } else {
      process.exit(0);
    }
  });
})();
