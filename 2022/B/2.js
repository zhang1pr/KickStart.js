const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [A] = readnum();

  console.log(`Case #${i}: ${solve(A)}`);
}

function solve(A) {
  let r = 0;
  for (let i=1; i <= Math.sqrt(A); i++) { 
    if (A % i == 0) {
      if (check(i)) r++;
      if (i != A/i && check(A/i)) r++;
    }  
  }

  return r;    
}

function check(N) {
  N = N.toString();
  for (let i=0, j=N.length-1; i<j; i++,j--) 
    if (N[i] != N[j]) 
      return false;
    
  return true;    
}
