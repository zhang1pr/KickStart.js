const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N, X, Y] = readnum();

  let res = solve(N,X,Y);
  if (res[0]) {
    console.log(`Case #${i}: POSSIBLE`);
    console.log(res[1]);
    console.log(res[2]);
  } else {
    console.log(`Case #${i}: IMPOSSIBLE`);
    
  }
}

function solve(N,X,Y) {
  let div = (N+1)*N/2/(X+Y);
  if (div != Math.floor(div)) return [false];

  let asum = div * X, bsum = div * Y;
  let A = [], B = new Set(), cur = N;
  if (asum <= bsum) {
    while (asum) {
      if (asum <= cur) {
        A.push(asum);
        asum = 0;
      } else {
        A.push(cur);
        asum -= cur;
        cur--;
      }
    }  
  } else {
    while (bsum) {
      if (bsum <= cur) {
        B.add(bsum);
        bsum = 0;
      } else {
        B.add(cur);
        bsum -= cur;
        cur--;
      }
    }

    for (let i=1; i<=N; i++) {
      if (!B.has(i)) A.push(i);
    }
  }

  return [true, A.length, A.join(' ')];
}
