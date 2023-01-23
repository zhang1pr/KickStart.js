const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, M] = readnum();
  let arr = readnum();

  console.log(`Case #${i}: ${solve(M, arr)}`);
}

function solve(M, arr) {
  return arr.reduce((a,b)=>a+b) % M;
}
