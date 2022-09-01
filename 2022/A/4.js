const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let map = new Map();

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [A, B] = readnum();

  console.log(`Case #${i}: ${solve(A, B)}`);
}

function solve(A, B) {
  return countAtMost(B) - countAtMost(A-1);
}

function countAtMost(N) {
  if (N == 0) return 0;

  let count = 0, len = N.toString().length;
  for (let L = 1; L < len; L++) {
    count += countWithLength(L);
  } 

  count += countWithPrefix(N, 1, 0, 0, true);

  return count;
}

function countMatches(L, P, S) {
  if (L == 0) return P % S == 0 ? 1 : 0;

  let str = [...arguments].join(',');

  if (map.has(str)) return map.get(str);
  let res = 0;

  for (let digit = 0; digit <= 9; digit++) {
    res += countMatches(L-1, P*digit, S+digit);
  }

  map.set(str, res);
  return res;
}

function countWithLength(L) {
  let count = 0;
  for (let digit = 1; digit <= 9; digit++) {
    count += countMatches(L - 1, digit, digit);
  }
  
  return count;
}

function countWithPrefix(N, P, S, index, isFirst) {
  let len = N.toString().length;
  if (index == len) {
    return S > 0 && P % S == 0 ? 1 : 0;
  }

  let start = isFirst ? 1 : 0;

  let count = 0, cur = +N.toString()[index];
  for (let digit = start; digit <= cur - 1; digit++) {
    count += countMatches(len - index - 1, P * digit, S + digit);
  }

  count += countWithPrefix(N, P * cur, S + cur, index + 1, false);
  return count;
}
