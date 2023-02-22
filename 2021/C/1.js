const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K] = readnum();
  let [str] = readword();
  console.log(`Case #${i}: ${solve(N, K, str)}`);
}

function solve(N, K, str) {
  const MOD = 10 ** 9 + 7;
  let res = 0;
  let isPalindrome = true;
  let isLarger = false;

  for (let i=0,j=str.length-1; i<=j; i++,j--) {
    let ch1 = str[i], ch2 = str[j];
    isPalindrome = isPalindrome && ch1 == ch2;
    
    if (ch1 != ch2)
      isLarger = ch1 > ch2;

    let num = ch1.charCodeAt(0) - 'a'.charCodeAt(0);

    res = (res * K + num) % MOD;
  }

  return (res + Number(!isLarger && !isPalindrome)) % MOD;
}
