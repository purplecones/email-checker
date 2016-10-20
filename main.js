var fs = require('fs');
var readline = require('readline');

var emailExistence = require('email-existence');
var emailValidator = require('email-validator');

var filePath = process.argv[2];

var rd = readline.createInterface({
  input: fs.createReadStream(filePath),
  output: process.stdout,
  terminal: false
});

rd.on('line', function(line) {
  console.log('checking -', line);
  if (emailValidator.validate(line)) {
    emailExistence.check(line, function(err, res){
      append("./out.txt", line + ', ' + res + '\n');
      if (!res) {
        return;
      }
    });
  } else {
    append('./out.txt', line + ', invalid format\n');
  }
});

function append(path, text) {
  fs.appendFile(path, text, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}
