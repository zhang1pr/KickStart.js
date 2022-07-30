const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readline();
for (let i = 1; i <= T; i++) {
  let [N, K] = readline();
  let str = input[count++];
  console.log(`Case #${i}: ${solve(str, N, K)}`);
}

function solve(str, N, K) {
  let res = 0;
  for (let i=0,j=N-1;i<=j;i++,j--) {
    if (str[i] != str[j]) {
      res++;
    }
  }

  return Math.abs(K - res);
}

