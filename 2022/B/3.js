const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, D] = readnum();
  let V = readnum();

  console.log(`Case #${i}: ${solve(N, D, V)}`);
}

function solve(N, D, arr) {
  let len = arr.length;
  let dp = [...Array(len)].map(()=>Array(len).fill(null));

  function calc(a, b) {
    let abs = Math.abs(a-b);
    return Math.min(abs, D-abs);
  }

  for (let i=0; i<len; i++) dp[i][i] = new Map([[arr[i],0]]);

  for (let l=1; l<=len; l++) {
    for (let start=0; start<len; start++) {
      let end = start + l;

      if (end < len) {
        if (!dp[start][end]) dp[start][end] = new Map();
        
        let tar1 = arr[end], tar2 = arr[start];
        let h1 = arr[start], t1=arr[end-1], h2 = arr[start+1], t2 = arr[end];

        let cand1 = [calc(h1, tar1) + (dp[start][end-1].get(h1) || 0), tar1];
        let cand2 = [calc(t1, tar1) + (dp[start][end-1].get(t1) || 0), tar1];
        let cand3 = [calc(h2, tar2) + (dp[start+1][end].get(h2) || 0), tar2];
        let cand4 = [calc(t2, tar2) + (dp[start+1][end].get(t2) || 0), tar2];

        let choices = [cand1, cand2, cand3, cand4];
          
        for (let [v, k] of choices) {
          let get = dp[start][end].get(k);
          get = get == null ? Infinity : get;
          dp[start][end].set(k, Math.min(get, v));
        }
      }
    }
  }
  
  let min = Infinity;
  for (let [k,v] of dp[0][len-1]) {
    min = Math.min(min, v + calc(k, 0)); 
  }
  return min;
}
