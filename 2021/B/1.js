const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let [arr] = readword();
  console.log(`Case #${i}: ${solve(arr)}`);
}

function solve(arr) {
  let res = [1];

  let cnt = 1;
  for (let i=1;i<arr.length;i++) {
    if (arr[i] > arr[i-1]) {
      cnt++;
    } else {
      cnt = 1;
    }

    res.push(cnt);
  }

  return res.join(' ');
}
