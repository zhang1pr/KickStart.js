const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [R,C] = readnum();
  let arr = [];
  for (let r=1;r<=R;r++) {
    arr.push(...readword());
  }

  console.log(`Case #${i}: ${solve(R,C,arr)}`);
}

function solve(R,C,arr) {
  let res = ''; 
  let map = new Map();
  let indeg = new Map();

  for (let r=0;r<R;r++) {
    for (let c=0;c<C;c++) {
      let cur = arr[r][c];
      if (!map.has(cur)) map.set(cur, new Set());
      
      if (r < R-1) {
        let next = arr[r+1][c];
        if (!map.has(next)) map.set(next, new Set());

        if (cur != next && !map.get(next).has(cur)) {
          map.get(next).add(cur);
          indeg.set(cur, (indeg.get(cur) || 0) + 1);
        }
      }
    }
  }

  let q = [];
  for (let k of map.keys()) {
    if (!indeg.has(k)) q.push(k);
  }

  while (q.length) {
    let nq = [];

    for (let node of q) {
      res += node;

      for (let nei of (map.get(node) || [])) {
        let get = indeg.get(nei) - 1;

        if (get == 0) nq.push(nei);
        else indeg.set(nei, get);
      }
    }

    q = nq;
  }

  return res.length == map.size ? res : -1;
} 
