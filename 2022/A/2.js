const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readword();

  console.log(`Case #${i}: ${solve(N)}`);
}

function solve(str) {
  let sum = 0;
  for (let ch of str) sum = (sum + (+ch)) % 9;
  let target = sum ? 9 - sum : 0;
  target = target.toString();

  let res;

  if (target == '0') {
    res = str[0] + '0' + str.slice(1);
  } else {
    let idx = 0;
    while (idx < str.length) {
      if (target < str[idx]) {
        break;
      }

      idx++;
    }
      
    res = str.slice(0, idx) + target + str.slice(idx); 
  }

  return res;
}
