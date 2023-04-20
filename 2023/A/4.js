const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const log = (...args) => console.log(...args);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  console.log(`Case #${i}: ${solve(N)}`);
}

function solve(N) {
  let L = 26;
  let cnt = 1;  
  let sum = 0;

  while (sum + cnt*26 < N) {
    sum += cnt * 26;
    cnt++;
  }

  let diff = N - sum - 1;
  let rank = Math.floor(diff / cnt);
  return String.fromCharCode(65 + rank);
} 
