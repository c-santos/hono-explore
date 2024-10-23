import { configDotenv } from "dotenv";

configDotenv()

export const getEnvValue = (key: string, throwOnMissing = true) => {
  const env = process.env;
  const value = env[key];
  if (!value && throwOnMissing) console.log(`Missing config: ${key}`);

  return value;
};
