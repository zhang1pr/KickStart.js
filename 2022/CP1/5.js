const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, M, P] = readnum();
  let want = [], ban = [];

  for (let i=1; i<=N; i++) {
    want.push(...readword());
  }

  for (let i=1; i<=M; i++) {
    ban.push(...readword());
  }

  console.log(`Case #${i}: ${solve(want, ban, N, P)}`);
}

function solve(want, ban, N, P) {
  let cnt = Array(P).fill(0);
  let banMap = new Map();

  for (let str of want) {
    for (let i=0;i<str.length;i++) {
      cnt[i] += +str[i];
    }
  }

  for (let str of ban) {
    let sum = 0;

    for (let i=0;i<str.length;i++) {
      sum += str[i] == '0' ? cnt[i] : N - cnt[i];
    }

    banMap.set(sum, (banMap.get(sum) || 0) + 1);
  }

  let banMax = Math.max(...banMap.keys());

  let map = new Map([[0, 1]]);
  for (let i=0; i<P; i++) {
    let nmap = new Map();

    let min = Infinity;

    for (let [k, v] of map) {
      let cand = [k + cnt[i], k + N - cnt[i]];

      for (let cur of cand) {
        if (cur <= banMax) {
          nmap.set(cur, (nmap.get(cur) || 0) + v);
        } else {
          min = Math.min(min, cur);
        }
      }
    }

    if (min != Infinity) {
      nmap.set(min, 1);      
    }

    map = nmap;
  }

  let wantArr = [...map].sort((a,b)=>a[0]-b[0]);
  
  for (let [k, v] of wantArr) {
    if (!banMap.has(k) || banMap.get(k) < v) return k; 
  }
}
