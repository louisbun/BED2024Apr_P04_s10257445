const path = require('node:path');

const notes = 'text/notes.txt';

const chalk = require('chalk');

console.log(path.dirname('./text/notes.txt'));
console.log(path.basename(notes));
console.log(path.extname(notes));

const fs = require('node:fs');

fs.readFile('./text/notes.txt', 'utf8', (err,data) => {
    if(err){
        console.error(err);
        return;
    }
    console.log(chalk.blue(data));
});


const content = "Some content!";

fs.writeFile('text/test.txt', content, err => {
    if (err) {
        console.error(err);
    }
    else {}
});

console.log(chalk.yellow('hi!'));
