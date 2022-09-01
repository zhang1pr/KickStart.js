const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let [S] = readword();
  console.log(`Case #${i}: ${solve(N,S)}`);
}

function solve(N, S) {
  var upper=lower=digit=special=false;

  for (let s of S) {
    if (s >= 'a' && s <= 'z') lower=true;
    else if (s >= 'A' && s <= 'Z') upper=true;
    else if (s >= '0' && s <= '9') digit=true;
    else special = true;
  }

  if (!upper) S+='A';
  if (!lower) S+='a';
  if (!digit) S+='0';
  if (!special) S+='#';
  
  return S.padEnd(7,'a');
} 
