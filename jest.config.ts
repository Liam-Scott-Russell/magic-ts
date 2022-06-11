import { type Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    collectCoverage: false,
    collectCoverageFrom: [`./src/**/*.ts`],
    coveragePathIgnorePatterns: [`node_modules`],
    globals: {
      "ts-jest": {
        tsconfig: `tsconfig.jest.json`,
      },
    },
    maxWorkers: `80%`,
    moduleDirectories: [`node_modules`],
    preset: `ts-jest`,
    rootDir: `.`,
    runner: `jest-runner`,
    testMatch: [`**/__tests__/**/*.+(ts)`, "**/*.doctest.ts"],
    verbose: true,
  };
};
