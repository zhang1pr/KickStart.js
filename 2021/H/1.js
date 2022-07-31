const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [str] = readword();
  let [target] = readword();
  console.log(`Case #${i}: ${solve(str, target)}`);
}

function solve(str, target) {
  let arr = Array(26).fill(Infinity);

  for (let i = 97; i < 97 + 26; i++) {
    for (let ch of target) {
      let code = ch.charCodeAt(0);

      if (code < i) {
        code += 26;
      }

      arr[i-97] = Math.min(arr[i-97], code - i, i + 26 - code);
    }
  }

  let res = 0; 
  for (let ch of str) {
    res += arr[ch.charCodeAt(0)-97];
  }

  return res;
}
