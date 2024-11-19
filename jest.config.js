const directory = '<rootDir>/challenges';
const testFile = 'index.test.js';
const testFiles = [
  '1-generate-time-intervals',
];

const testMatch = testFiles.map((file) => `${directory}/${file}/${testFile}`);

const config = {
  testMatch,
  verbose: true,
};

export default config;
