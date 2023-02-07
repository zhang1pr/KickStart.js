const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(N, arr)}`);
}

function solve(N, arr) {
  let D = [];
  let res = 0;

  for (let i=1;i<arr.length; i++)
    D.push(arr[i] - arr[i-1]);

  res = Math.max(res, getMergeCount(D) + 1)
  res = Math.max(res, getMergeCount(D.reverse()) + 1);

  return res;
}

function getMergeCount(D) {
  let res = 0;
  let len = D.length;

  for (let l = 0, r = 0; l < len; l = r) {
    while (r < len && D[l] == D[r])
      r++;

    res = Math.max(res, r - l);

    if (r < len)
      res = Math.max(res, r - l + 1);

    if (r < len - 1 && D[r] + D[r + 1] == 2 * D[l]) {
      let end = r + 2;

      while (end < len && D[end] == D[l])
        end++;

      res = Math.max(res, end - l);
    }
  }
 
  return res;
}