import type { Config } from "jest";

const config: Config = {
  displayName: "notifications-e2e",
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/test/**/*.e2e-spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  collectCoverageFrom: [],
  testTimeout: 30000,
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "./coverage-e2e",
};

export default config;
