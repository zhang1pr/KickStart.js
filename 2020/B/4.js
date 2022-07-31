const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let max = 1e5;

let lfac = Array(max).fill(0);
let p2 = Array(max).fill(0);

for (let i = 1; i < max; i++) lfac[i] = lfac[i-1] + Math.log(i);

p2[1] = Math.log(2);
for (let i = 2; i < max; i++) p2[i] = p2[i-1] + p2[1];

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [W,H,L,U,R,D] = readnum();
  console.log(`Case #${i}: ${solve(W,H,L,U,R,D)}`);
}

function solve(W,H,L,U,R,D) {
  function choose(N, K) {
    if (K < 0 || K > N) return 0;
    return Math.E ** (lfac[N] - lfac[K] - lfac[N-K] - p2[N]);
  }

  function run() {
    let ly = U, lx = R;
    if (R < W) {
      let mult = 1;
      
      while (ly > 0) {
        ly--;
        lx++;

        if (lx >= W) {
          lx = W - 1;
          mult = 0.5;
        }

        let a = choose(lx + ly, lx);
        res += mult * a;
      }
    }
  }
  W--;H--;L--;U--;R--;D--;

  let res = 0;
  run();
  [U, L] = [L, U], [D, R] = [R, D], [H, W] = [W, H];
  run();

  return res;
} 
