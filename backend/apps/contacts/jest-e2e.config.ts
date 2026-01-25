import type { Config } from "jest";

const config: Config = {
  displayName: "contacts-e2e",
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/test/**/*.e2e-spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  coverageReporters: ["text", "lcov"],
  coverageDirectory: "./coverage-e2e",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleFileExtensions: ["js", "json", "ts"],
  collectCoverageFrom: [],
  testTimeout: 30000,
};

export default config;
