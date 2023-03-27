/**
 * Get Environment Variable Value or throw error
 * @param envVarName
 */
function getEnvVar(envVarName: string): string {
  // Make sure our Encrypted variable exists.
  if (process.env[envVarName] == undefined) {
    throw new Error(envVarName + " is not a valid process variable.");
  }
  return process.env[envVarName]!;
}

/**
 * Print a message if the `LAMBDA_HANDLER_DEBUG` flag is set on `process.env`.
 * @param {any} message [description]
 */
function printDebug(message: any): void {
  if (process && process.env && process.env.LAMBDA_HANDLER_DEBUG) {
    if (typeof message == "string") {
      console.log(message);
    } else {
      console.dir(message);
    }
  }
}

export const utils = { getEnvVar, printDebug };
