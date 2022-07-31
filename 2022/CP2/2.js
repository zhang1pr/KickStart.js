const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [L,R] = readword();

  console.log(`Case #${i}: ${solve(L,R)}`);
}

function solve(L,R) {
  let n = Math.min(L,R);

  return n*(n+1)/2;
}
