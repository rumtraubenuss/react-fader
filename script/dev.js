const fs = require('fs');
const path = require('path');

const sourceFile = path.resolve(__dirname, '../example/index.html');
const targetDir = path.resolve(__dirname, '../tmp');

fs.stat(targetDir, (err, stat) => {
  if(err) {
    fs.mkdirSync(targetDir);
  }
  copyFile();
});

const copyFile = () => {
  fs.readFile(sourceFile, 'utf8', (err,data) => {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/src="..\/dist\/react-fader\.js"/g, 'src="react-fader.js"');
    fs.writeFile(path.resolve(__dirname, '../tmp/index.html'), result, 'utf8', err => {
      if (err) return console.log(err);
    });
  });
}
