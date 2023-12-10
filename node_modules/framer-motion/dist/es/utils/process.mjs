/**
 * Browser-safe usage of process
 */
const defaultEnvironment = "production";
const env = typeof process === "undefined" || process.env === undefined
    ? defaultEnvironment
    : process.env.NODE_ENV || defaultEnvironment;

export { env };
