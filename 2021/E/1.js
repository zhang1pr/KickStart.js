const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [str] = readword();

  console.log(`Case #${i}: ${solve(str)}`);
}

function solve(str) {
  let map = new Map();
  let len = str.length;
  let idx = new Map();

  for (let i=0;i<len;i++) {
    let ch = str[i];
    map.set(ch, (map.get(ch) || 0) + 1);

    if (!idx.has(ch)) {
      idx.set(ch, []);
    }

    idx.get(ch).push(i);
  }

  for (let [ch, val] of map) {
    if (val > len / 2) {
      return 'IMPOSSIBLE';
    } 
  } 

  let count = [...map].sort((a, b) => b[1] - a[1]);
  
  let arr = Array(len).fill(null);
  
  let curch;
  let curidx;
  
  for (let i=0;i<count.length;i++) {
    if (!curch) {
      curch = count[i][0];
      curidx = idx.get(curch);
    } else {
      nextch = count[i][0];
      nextidx = idx.get(nextch);

      while (curidx.length && nextidx.length) {
        let c = curidx.pop();
        let n = nextidx.pop();

        arr[c] = nextch;
        arr[n] = curch;
      }
      
      if (curidx.length) {
        continue;
      }

      if (nextidx.length) {
        curch = nextch;
        curidx = nextidx;
      } else {
        curch = null;
        curidx = null;
      }
    }
  } 

  if (curidx) {
    for (let i=0;i<arr.length && curidx.length;i++) {
      if (str[i] == curch || arr[i] == curch) {
        continue;
      }

      let id = curidx.pop();
      arr[id] = arr[i];
      arr[i] = curch;
    }
  }

  return arr.join('');
}
