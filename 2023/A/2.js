const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const log = (...args) => console.log(...args);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [M,R,N] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(M,R,N,arr)}`);
}

function solve(M,R,N,arr) {
  let left = 0;
  let res = 0;

  if (arr[arr.length-1] + R < M) return 'IMPOSSIBLE';

  let i=0;
  while (i < arr.length) {
    while (i + 1 < arr.length && arr[i+1] - R <= left) 
      i++;

    if (arr[i] - R > left) return 'IMPOSSIBLE';

    left = arr[i] + R;
    res++;
    i++;

    if (left >= M) break;
  }

  return res;
} 
