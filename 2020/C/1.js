const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(N,K,arr)}`);
}

function solve(N,K,arr) {
  let res = 0;

  for (let i=0;i<arr.length-K+1;i++) {
    if (arr[i] == K) {
      let cur = K, curi = i;
      while (cur) {
        if (arr[curi] != cur) break;
        cur--;
        curi++;
      }

      if (cur == 0) res++;
    }
  }

  return res;
} 
