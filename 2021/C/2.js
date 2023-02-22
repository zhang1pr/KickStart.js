const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [G] = readnum();
  console.log(`Case #${i}: ${solve(G)}`);
}

function solve(G) {
  let res = 0;
   
  for (let cnt=1; cnt**2 - cnt < 2*G; cnt++) {
    let i = (2*G - cnt**2 + cnt)/2/cnt;

    if (i == Math.floor(i))
      res++;
  }
   
  return res; 
} 
