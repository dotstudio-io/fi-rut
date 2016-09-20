const Mocha = require('mocha');
const path = require('path');
const fs = require('fs');

const mocha = new Mocha({ /* jshint ignore: line */
  reporter: 'list'
});

const testDir = 'test/node';

global.expect = require('chai').expect;

fs.readdir(testDir, (err, files) => {
  files.forEach((file) => {
    if (path.extname(file) === '.js') {
      mocha.addFile(path.join(testDir, file));
    }
  });

  mocha.run((failures) => {
    process.on('exit', () => {
      process.exit(failures);
    });
  });
});
