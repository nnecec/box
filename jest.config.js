const path = require('path')

const transformIgnorePatterns = [
  '/dist/'
]

module.exports = {
  verbose: true,
  setupFiles: [path.resolve(__dirname, './tests/setup.js')],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*/interface.{ts,tsx}'
  ],
  transformIgnorePatterns,
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, './tsconfig.test.json')
    }
  }
}
