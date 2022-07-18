/**
 * Get Environment Variable Value or throw error
 * @param envVarName
 */
export function getEnvVar(envVarName: string): string {
  // Make sure our Encrypted variable exists.
  if (process.env[envVarName] == undefined) {
    throw new Error(envVarName + " is not a valid process variable.");
  }
  return process.env[envVarName]!;
}
