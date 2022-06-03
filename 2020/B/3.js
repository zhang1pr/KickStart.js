const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let arr = readword()[0];
  console.log(`Case #${i}: ${solve(arr)}`);
}

function solve(str) {
  const len = 1e9;
  let dir = 'SNEW';
  let stack = [[0,0,0,0]];
  
  for (let ch of str) {
    if (ch >= '2' && ch <= '9') {
      stack.push(+ch);
      stack.push([0,0,0,0])
    } else if (ch == '(') {
      continue;
    } else if (ch == ')') {
      let narr = stack.pop(), num = stack.pop();
      for (let i=0; i<4; i++) {
        stack[stack.length-1][i] = (stack[stack.length-1][i] + narr[i] * num) % len;
      }
    } else {
      stack[stack.length-1][dir.indexOf(ch)]++;
    }
  }

  let [a,b,c,d] = stack.pop();
  let hor = (c - d + len) % len + 1;
  let ver = (a - b + len) % len + 1;

  return [hor, ver].join(' ');
}
