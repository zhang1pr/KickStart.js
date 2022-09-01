const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

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
  let map = new Map().set(0, 1);
  let pos = 0, cur = 0;
  let res = 0;

  for (let x of arr) {
    if (x > 0) pos += x;
    
    cur += x;

    for (let i=0; i*i<=pos; i++) {
      res += (map.get(cur - i*i) || 0);
    }

    map.set(cur, (map.get(cur) || 0) + 1);
  }

  return res;
}
