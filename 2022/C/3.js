const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, L] = readnum();

  let arr = [];
  for (let j = 1; j <= N; j++) {
    arr.push(readnum());
  }

  console.log(`Case #${i}: ${solve(N, L, arr)}`);
}

function solve(N, L, arr) {
  let A = [], B = [];
  let x=1;
  for (let cur of arr) {
    cur.push(x)
    x++;
  }
  arr.sort((a,b)=>a[0]==b[0] ? a[1]-b[1] : a[0]-b[0]);

  for (let [x,y] of arr) {
    if (y==0) A.push(x);
    else B.push(L-x)
  }
  B.reverse();

  let i=0, j=N-1;
  let res = [];
  while (i <= j) {
    let l = i >= A.length ? Infinity : A[i];
    let r = N-j-1 >= B.length ? Infinity : B[N-j-1];
    let lcan = arr[i][2], rcan = arr[j][2];

    if (l < r) {
      res.push(lcan);
      i++;
    } else if (l > r) {
      res.push(rcan);
      j--;
    } else {
      res.push(Math.min(lcan, rcan));
      res.push(Math.max(lcan, rcan));
      i++;
      j--;
    }
  }

  return res.join(' ');
}

