const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [str] = readword();

  console.log(`Case #${i}: ${solve(str)}`);
}

function solve(str) {
  let LEN = str.length;
  let arr = [];

  for (let i=0;i<LEN;i++) {
    if ('aeiou'.includes(str[i])) {
      arr.push(i);
    }
  }

  for (let i=0; i<arr.length; i++) {
    for (let j=i+3; j<arr.length - 1; j++) {
      let l1 = arr[i], r1 = arr[i+1], l2 = arr[j], r2 = arr[j+1];

      if (r1 - l1 == r2 - l2 && str.slice(l1,r1+1) == str.slice(l2,r2+1)) {
        return 'Spell!';
      }
    }
  }

  return 'Nothing.';
}
