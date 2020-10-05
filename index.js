const fs = require('fs');
const path = require('path');
const moment = require('moment');

const { Transform, Readable } = require('stream');
const readline = require('readline');

const basePath = path.join(__dirname, '/info-dir');
const filePath = path.join(basePath, '/file.txt');

if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

const writable = fs.createWriteStream(filePath);

const readable = new Readable({
  encoding: 'utf-8',
  read() {},
});

class createNewLine extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(time, enconding, cb) {
    const data = `${time} \n`;
    cb(null, data);
  }
}
const addNewLine = new createNewLine();

setInterval(() => {
  const time = moment().format('MMMM Do YYYY, h:mm:ss a');

  readable.push(time);
}, 1000);

readable.pipe(addNewLine).pipe(writable);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question('type exit to exit of this session \n', function (answer) {
  if (answer === 'exit') {
    console.log('done');
    process.exit(0);
  }
});
