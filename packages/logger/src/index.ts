import chalk from "chalk";
import morgan, { token } from "morgan";

class Logger {
  constructor() {}

  private getTimestamp() {
    return chalk.gray(`[${new Date().toLocaleTimeString()}]`);
  }

  private getStatusColor(status: string) {
    const code = parseInt(status, 10);

    if (code >= 500) return chalk.red.bold(status);
    if (code >= 400) return chalk.yellow.bold(status);
    if (code >= 300) return chalk.cyan.bold(status);
    if (code >= 200) return chalk.green.bold(status);

    return status;
  }

  public info(message: string) {
    console.log(`${this.getTimestamp()} ${chalk.blue(`[INFO]`)}    ${message}`);
  }

  public success(message: string) {
    console.log(
      `${this.getTimestamp()} ${chalk.green(`[SUCCESS]`)} ${message}`,
    );
  }

  public error(message: string) {
    console.log(`${this.getTimestamp()} ${chalk.red(`[ERROR]`)}   ${message}`);
  }

  public warn(message: string) {
    console.log(
      `${this.getTimestamp()} ${chalk.yellow(`[WARN]`)}    ${message}`,
    );
  }

  public request() {
    return morgan((tokens, req, res) => {
      const method = chalk.blue.bold(tokens.method?.(req, res) || "UNKNOWN");
      const url = chalk.magenta(tokens.url?.(req, res) || "UNKNOWN");
      const status = this.getStatusColor(tokens.status?.(req, res) || "000");
      const responseTime = chalk.yellow(
        `${tokens["response-time"]?.(req, res) || "0"} ms`,
      );
      const contentLength = chalk.cyan(
        `${tokens.res?.(req, res, "content-length") || "0"} bytes`,
      );

      return `${this.getTimestamp()}  ${method}  ${url}  ${status}  ${responseTime}  ${contentLength}`;
    });
  }
}

export const logger = new Logger();
