
import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => {
    return {
        maxWorkers: `80%`,
        rootDir: `.`,
        runner: `jest-runner`,
        verbose: true,
        preset: `ts-jest`,
        globals: {
            'ts-jest': {
                tsconfig: `tsconfig.jest.json`,
            },
        },
        collectCoverage: false,
        testMatch: [`**/__tests__/**/*.+(ts)`, "**/*.doctest.ts"],
        collectCoverageFrom: [`./src/**/*.ts`],
        coveragePathIgnorePatterns: [`node_modules`],
        moduleDirectories: [`node_modules`],
    };
};
