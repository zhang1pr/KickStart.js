const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, D] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(arr, N, D)}`);
}

function solve(arr, N, D) {
  for (let i = N - 1; i >= 0; i--) {
    D -= D % arr[i];
  }

  return D;
}
