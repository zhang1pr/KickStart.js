const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(arr, N)}`);
}

function solve(arr, N) {
  let res = 0;

  for (let i = 1; i < N - 1; i++) {
    if (arr[i] > arr[i-1] && arr[i] > arr[i+1]) {
      res++;
    }
  }

  return res;
}
