const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [name] = readword();

  console.log(`Case #${i}: ${solve(name)}`);
}

function solve(name) {
  let ruler;
  let ch = name[name.length-1];

  if ('y' == ch.toLowerCase()) {
    ruler = 'nobody';
  } else if ('aeiou'.includes(ch.toLowerCase())) {
    ruler = 'Alice';
  } else {
    ruler = 'Bob';
  }

  return `${name} is ruled by ${ruler}.`
}
