/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json'
      }
    ],
    '^.+\\.js$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(?:@ui5|@ui5/webcomponents|@ui5/webcomponents-react|lit-html|@lit)/)'
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__mocks__/**',
    '!**/webcomponents-react.js',
  ],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1'
  }
};
