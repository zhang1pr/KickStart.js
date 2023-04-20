const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const log = (...args) => console.log(...args);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(N,arr)}`);
}

function solve(N,arr) {
  let set = new Set();
  let last = arr[0];
  let res = [];

  for (let x of arr) {
    if (!set.has(x))
      set.add(x), res.push(x);
    else if (last != x)
      return 'IMPOSSIBLE';

    last = x;
  }

  return res.join(' ');  
} 
