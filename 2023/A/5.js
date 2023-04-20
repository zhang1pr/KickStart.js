const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const log = (...args) => console.log(...args);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [S] = readword();
  console.log(`Case #${i}: ${solve(S)}`);
}

function solve(S) {
  let arr = [];
  let cnt = 0;
  let last; 

  for (let i=0; i<S.length; i++) {
    if (S[i] == last) {
      cnt++;
    } else {
      if (cnt > 0) arr.push(cnt);

      cnt = 1;
      last = S[i];
    }
  }

  arr.push(cnt);
  if (S[0] == S[S.length-1] && arr.length > 1) 
    arr[0] += arr.pop();
 
  if (arr.length == 1) return Math.ceil(arr[0]/2);

  let sum = 0;
  for (let x of arr)
    if (x > 1)
      sum += Math.floor(x/2);

  return sum;  
} 