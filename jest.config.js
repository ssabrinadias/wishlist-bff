module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  moduleFileExtensions: ["js", "json", "ts"],
  transform: { "^.+\\.(t|j)s$": "ts-jest" },
  collectCoverageFrom: ["src/**/*.{js,ts}"],
};
