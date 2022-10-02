/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "node_modules",
    "test-config",
    "interfaces",
    "repositories",
    "jestGlobalMocks.ts",
    "<rootDir>/src/server.ts",
    "<rootDir>/src/utils",
    "<rootDir>/src/middlewares",
    "<rootDir>/src/config",
    "<rootDir>/tests/unit/factories",
    "<rootDir>/tests/integrations/factories",
  ],
};
