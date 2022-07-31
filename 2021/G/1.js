const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, DF, CF, M] = readnum();
  let [str] = readword();
  console.log(`Case #${i}: ${solve(str, DF, CF, M)}`);
}

function solve(str, DF, CF, M) {
  let flag = true;
  for (const ch of str) {
    if (ch == 'C') {
      CF--;

      if (CF < 0) {
        flag = false;
      }
    } else {
      DF--;  

      if (!flag || DF < 0) {
        return 'NO';
      }

      CF += M;
    }
  }

  return 'YES';
}
