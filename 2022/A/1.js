const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [I] = readword();
  let [P] = readword()

  console.log(`Case #${i}: ${solve(I, P)}`);
}

function solve(stri, strp) {
  let i=0,j=0;
  let res=0;
  
  while (i < stri.length && j < strp.length) {
    if (stri[i] == strp[j]) {
      i++;
      j++;
    } else {
      j++;
      res++; 
    }
  }

  if (i < stri.length) return 'IMPOSSIBLE';
  
  while (j < strp.length) {
    j++;
    res++;
  }

  return res;
}
