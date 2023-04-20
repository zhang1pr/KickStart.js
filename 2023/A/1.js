const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const log = (...args) => console.log(...args);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let D = readnum();
  let [N] = readnum();
  let S = [];

  for (let i = 1; i <= N; i++)
    S.push(...readword());
  
  console.log(`Case #${i}: ${solve(D, N, S)}`);
}

function solve(D, N, S) {
  let set = new Set();

  for (let str of S) {
    let cur = '';
    for (let ch of str)
      cur += D[ch.charCodeAt(0) - 65];
  
    if (set.has(cur)) return 'YES';
   
    set.add(cur);
  }

  return 'NO';
} 
