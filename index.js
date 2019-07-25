const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

dialogJson = {'0':[]};
let recursiveAsyncReadLine = (date, i) => {
    rl.question('', (input) => {
        if (input.split(' ')[0] == 'select') {
            input = input.replace('select ', '').split('|');
            dialogJson[date+''][i] = {
                type: 'select',
                selection: [
                    {select: input[0].split(';')[0], response: {type:'dialog', from:'kor', dialog: input[0].split(';')[1]}},
                    {select: input[1].split(';')[0], response: {type:'dialog', from:'kor', dialog: input[1].split(';')[1]}},
                    {select: input[2].split(';')[0], response: {type:'dialog', from:'kor', dialog: input[2].split(';')[1]}}
                    ]
            };
        }
        else if (input === 'end') {
            if (date == 9) {
                fs.writeFileSync('./data.json', JSON.stringify(dialogJson));
                return rl.close();
            }
            dialogJson[(date+1)+''] = [];
            console.log('day ' + (date+2));
            recursiveAsyncReadLine(date+1,0);
            return;
        }
        else {
            console.log(i);
            dialogJson[date+''].push({
                type: 'dialog',
                from: input.replace(' ', ';').split(';')[0],
                dialog: input.replace(' ', ';').split(';')[1]
            });
        }
        console.log('V');
        recursiveAsyncReadLine(date,i+1);
    });
};
console.log('welcome');
console.log('day 1 ');


recursiveAsyncReadLine(0, 0);
