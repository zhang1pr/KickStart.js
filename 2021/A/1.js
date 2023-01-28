const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K] = readnum();
  let str = readword()[0];
  console.log(`Case #${i}: ${solve(N, K, str)}`);
}

function solve(N, K, str) {
  let res = 0;
  for (let i=0,j=N-1; i<j; i++,j--)
    if (str[i] != str[j])
      res++;

  return Math.abs(K - res);
}

