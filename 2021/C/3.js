const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
let [X] = readnum();
for (let i = 1; i <= T; i++) {
  let [W,E] = readnum();
  console.log(`Case #${i}: ${solve(W,E)}`);
}

function solve(W, E) {
  let dp = [...Array(61)].map(
    () => [...Array(61)].map(
      () => Array(61).fill(0)
    )
  );
  dp[0][0][0] = W/3 + E/3;

  let pre = [...Array(61)].map(
    () => [...Array(61)].map(
      () => Array(61)
    )
  );

  let max = 0, choice; 
  for (let i = 0; i <= 60; i++) {
    for (let j = 0; i + j <= 60; j++) {
      for (let k = 0; i + j + k <= 60; k++) {
        let preIdx = null;
        let sum = i + j + k;

        if (i > 0 && dp[i-1][j][k] + j/sum * W + k/sum * E > dp[i][j][k]) {
          dp[i][j][k] = dp[i-1][j][k] + j/sum * W + k/sum * E;
          preIdx = 0;
        }

        if (j > 0 && dp[i][j-1][k] + k/sum * W + i/sum * E > dp[i][j][k]) {
          dp[i][j][k] = dp[i][j-1][k] + k/sum * W + i/sum * E;
          preIdx = 1;
        }
        
        if (k > 0 && dp[i][j][k-1] + i/sum * W + j/sum * E > dp[i][j][k]) {
          dp[i][j][k] = dp[i][j][k-1] + i/sum * W + j/sum * E;   
          preIdx = 2;
        }

        pre[i][j][k] = preIdx;   
        if (max < dp[i][j][k]) {
          max = dp[i][j][k];
          choice = [i,j,k];
        }
      }
    }
  }
      
  let [i, j, k] = choice;
  let stack = [];

  while (i + j + k > 0) {
    let cur = pre[i][j][k];

    if (cur == 0) {
      stack.push('R');
      i--;
    } else if (cur == 1) {
      stack.push('P');
      j--;
    } else if (cur == 2) {
      stack.push('S');
      k--;
    }
  }

  return stack.reverse().join('');
} 
