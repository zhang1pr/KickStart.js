const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
function readline() {
  return input[count++].split(' ').map(a => +a);
}

let T = readline();
for (let i = 1; i <= T; i++) {
  let [N, B] = readline();
  let arr = readline();
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
