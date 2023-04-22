// jest.config.js
module.exports = {
  testEnvironment: 'node',
  transform: {},
  transformIgnorePatterns: ['/node_modules/(?!(nanoid)/)'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  runner: 'esm',
};