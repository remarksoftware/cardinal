const jestConfig = {
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  testRegex: '/__tests__/.*\\.(ts|tsx)$',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/lib/'],
  transform: {
    '^.+\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
  }
};

module.exports = jestConfig;
