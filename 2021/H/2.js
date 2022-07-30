const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [n] = readnum();
  let [str] = readword();

  console.log(`Case #${i}: ${solve(str)}`);
}

function solve(str) {
  let res = 0;
  let map = new Map();

  map.set('U', new Set());
  map.set('R', new Set(['R']));
  map.set('Y', new Set(['Y']));
  map.set('B', new Set(['B']));
  map.set('O', new Set(['R', 'Y']));
  map.set('P', new Set(['R', 'B']));
  map.set('G', new Set(['Y', 'B']));
  map.set('A', new Set(['Y', 'B', 'R']));

  let set = new Set();
  for (let ch of str) {
    cur = map.get(ch);
    for (let color of cur) {
      if (!set.has(color)) {
        res++;
      }
    }

    set = cur;
  }

  return res;
}
