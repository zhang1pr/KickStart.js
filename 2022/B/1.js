const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [R, A, B] = readnum();

  console.log(`Case #${i}: ${solve(R, A, B)}`);
}

function solve(R, A, B) {
  let sum = 0;
  let cur = R;
  let f = true;
  while (R) {
    sum += R * R;

    if (f) R *= A;
    else R = Math.floor(R/B);

    f = !f;
  }

  return sum * Math.PI;
}
