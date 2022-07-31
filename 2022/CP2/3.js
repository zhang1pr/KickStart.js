const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, Q] = readnum();
  let [str] = readword();
  let arr = [];
  for (let j = 1; j <= Q; j++) {
    arr.push(readnum());
  }

  console.log(`Case #${i}: ${solve(str,arr)}`);
}

function solve(str,arr) {
  let sum = Array(26).fill(0);
  let pre = [sum.slice()];

  let map = new Map();

  for (let ch of str) {
    let idx = ch.charCodeAt(0) - 65;
    sum[idx]++;
    pre.push(sum.slice());
  }
  
  let res = 0;

  for (let [l,r] of arr) {
    let str = l+','+r;
    if (map.has(str)) {
      res += map.get(str);
    } else {
      let cnt = check(pre,l,r);
      res += cnt;
      map.set(str, cnt);
    }
  }

  return res;
}

function check(pre,l,r) {
  if (l == r) return true;
  let rsum = pre[r], lsum = pre[l-1];
  let odd = 0;
  for (let i=0;i<26;i++) {
    odd += (rsum[i] - lsum[i]) & 1;
  }

  return odd <= 1;
}
