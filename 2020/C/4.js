const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
class BIT{constructor(r){this.size=r,this.array=Array(this.size+1).fill(0)}add(r,t){for(let s=r;s<=this.size;s+=s&-s)this.array[s]+=t;return this}query(r){let t=0;for(let s=r;s>0;s-=s&-s)t+=this.array[s];return t}queryRange(r,t){return 1==r?this.query(t):this.query(t)-this.query(r-1)}}

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N,Q] = readnum();
  let arr = readnum();
  let op = [];
  for (let i=1; i<=Q; i++) {
    op.push(readword());
  }

  console.log(`Case #${i}: ${solve(N,Q,arr,op)}`);
}

function solve(N,Q,arr,op) {
  let bitsum = new BIT(N), bitmul = new BIT(N);
  let res = 0;
  for (let i=0;i<arr.length;i++) {
    let sign = i % 2 == 0 ? 1 : -1;
    bitsum.add(i+1, arr[i] * sign);
    bitmul.add(i+1, arr[i] * (i + 1) * sign);
  }

  for (let [ins, a, b] of op) {
    a = +a, b = +b;
    let sign = a % 2 == 1 ? 1 : -1;

    if (ins == 'U') {      
      let diff = b - arr[a-1];
      bitsum.add(a, diff * sign);
      bitmul.add(a, diff * a * sign);
      arr[a-1] = b;
    } else {
      let mul = bitmul.queryRange(a,b);
      let sum = (a-1) * bitsum.queryRange(a,b);

      res += sign * (mul - sum);
    }
  }

  return res;
}
