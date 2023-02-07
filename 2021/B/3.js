const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readword();
  console.log(`Case #${i}: ${solve(N)}`);
}

function solve(N) {
  let cur = Math.floor(Math.sqrt(N));
  N = BigInt(N);

  let phigh = cur + 1;
  while (!isPrime(phigh))
    phigh++;

  let plow1 = cur;
  while (!isPrime(plow1))
    plow1--;

  let plow2 = plow1 - 1;
  while (!isPrime(plow2))
    plow2--;

  let high = BigInt(phigh) * BigInt(plow1); 
  let low = BigInt(plow1) * BigInt(plow2);
  
  return high <= BigInt(N) ? high : low;
} 

function isPrime(num) {
  if (num % 2 == 0) 
    return num == 2;

  for (let i=3; i<=Math.sqrt(num); i+=2)
    if (num % i == 0)
      return false;

  return true;
}