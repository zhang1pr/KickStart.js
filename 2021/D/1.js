const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let arr = [];
  arr.push(readnum());
  let [a,b] = readnum();
  arr.push([a,'.',b])
  arr.push(readnum());

  console.log(`Case #${i}: ${solve(arr)}`);
}

function solve(arr) {
  let res = 0;
  let map = new Map();
  
  if (arr[0][0] - arr[0][1] == arr[0][1] - arr[0][2]) res++;
  if (arr[2][0] - arr[2][1] == arr[2][1] - arr[2][2]) res++;
  if (arr[0][0] - arr[1][0] == arr[1][0] - arr[2][0]) res++;
  if (arr[0][2] - arr[1][2] == arr[1][2] - arr[2][2]) res++;
  let can = [[0,0],[0,1],[0,2],[1,0]]

  for (let [r,c] of can) {
    let nr = 2 - r, nc = 2 - c; 
    let tgt = (arr[nr][nc] + arr[r][c])/2;
    
    if (Number.isInteger(tgt)) {
      map.set(tgt, (map.get(tgt) || 0) + 1);
    }
  }

  if (map.size == 0) return res;

  return res + Math.max(...map.values());
}
