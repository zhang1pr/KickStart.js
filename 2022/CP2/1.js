const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N, M] = readnum();
  let arr = readnum();

  console.log(`Case #${i}: ${solve(M, arr)}`);
}

function solve(M, arr) {
  return arr.reduce((a,b)=>a+b) % M;
}
