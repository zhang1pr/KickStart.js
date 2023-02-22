const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = [];
  for (let j = 1; j <= N; j++)
    arr.push(...readword());

  console.log(`Case #${i}: ${solve(N, arr)}`);
}

function solve(N, arr) {
  let res = [];
  let map = new Map();

  function hash(a) {
    return (53n * (a + 59n)) ^ 61n;
  }

  function merge(a, b, op) {
    if (op == '+') {
      return a + b;
    }

    if (op == '*') {
      return a * b;
    }

    return ((67n * hash(a)) + 71n) ^ ((73n * hash(b)) + 79n);
  }

  function getBalance(ch) {
    if (ch == '(') {
      return 1;
    }

    if (ch == ')') {
      return -1;
    }

    return 0;
  }

  function DFS(L, R, s) {
    if (s[L] == '(') {
      let balance = 1;
      let i = L + 1;
      while (balance > 0) {
        balance += getBalance(s[i]);
        i++;
      }
      
      let a = DFS(L + 1, i - 2, s);
      if (i >= R) {
        return a;
      }

      let b = DFS(i + 1, R, s);
      return merge(a, b, s[i]);
    }

    let a = 0n;
    while (L <= R && '0' <= s[L] && '9' >= s[L]) {
      a = (10n * a + BigInt(s[L]));
      L++;
    }

    if (L > R) {
      return a;
    }

    let b = DFS(L + 1, R, s);

    return merge(a, b, s[L]);
  }

  for (let expr of arr) {
    let val = DFS(0, expr.length - 1, expr);

    if (!map.has(val)) {
      map.set(val, map.size + 1);
    }

    res.push(map.get(val));
  }

  return res.join(' ');
}
