const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, B] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(arr, B)}`);
}

function solve(arr, B) {
  arr.sort((i, j) => i - j);

  let res = 0;
  for (const a of arr) {
    B -= a;

    if (B >= 0) res++;
    else break;
  }

  return res;
}
