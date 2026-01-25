import type { Config } from "jest";

const config: Config = {
  displayName: "contacts",
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: ".",
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/test/**/*.e2e-spec.ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: [
    "src/**/*.(t|j)s",
    "!src/**/*.spec.ts",
    "!src/main.ts",
    "!**/node_modules/**",
    "!**/dist/**",
  ],
  coverageDirectory: "./coverage",
  coverageReporters: ["text", "lcov", "html", "json-summary"],
  moduleFileExtensions: ["js", "json", "ts"],
  testTimeout: 30000,
  passWithNoTests: true,
};

export default config;
