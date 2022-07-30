const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K, P] = readnum();
  
  let arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(readnum());
  }

  console.log(`Case #${i}: ${solve(arr, N, K, P)}`);
}

function solve(arr, N, K, P) {
  let sum = [];
  for (const stack of arr) {
    const cur = [0];
    let count = 0; 

    for (const num of stack) {
      count += num;
      cur.push(count);
    }

    sum.push(cur);
  }

  let dp = [...Array(N + 1)].map(() => Array(P + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= P; j++) {
      for (let x = 0; x <= Math.min(j, K); x++) {
        dp[i][j] = Math.max(dp[i][j], sum[i - 1][x] + dp[i - 1][j - x]);
      }
    }
  }

  return dp[N][P];
}
