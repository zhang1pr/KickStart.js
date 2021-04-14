const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K] = readnum();
  let arr = readnum();
  console.log(`Case #${i}: ${solve(arr, N, K)}`);
}

function solve(arr, N, K) {
  function check(mid) {   
    let available = K;

    for (let i = 1; i < N; i++) {
      let diff = arr[i] - arr[i-1];

      if (diff > mid) {
        available -= Math.ceil(diff / mid) - 1;
 
        if (available < 0) return false;
      }
    }
 
    return true;
  }

  let l = 1, r = arr[N-1] - arr[0], mid;

  while (l < r) {
    mid = (l + r) >> 1;
    
    if (check(mid)) {
      r = mid; 
    } else {
      l = mid + 1;
    }
  } 

  return l;
}
