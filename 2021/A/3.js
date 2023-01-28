const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const dir = [[0, 1], [0, -1], [-1, 0], [1, 0]];
const isIn = (r,c,R,C) => 0 <= r && r < R && 0 <= c && c < C;
class Heap{constructor(){this.array=[]}size(){return this.array.length;}peek(){return 0===this.array.length?null:this.array[0]}poll(){if(0===this.array.length)return null;if(1===this.array.length)return this.array.pop();const r=this.array[0];return this.array[0]=this.array.pop(),this.heapifyDown(0),r}add(r){return this.array.push(r),this.heapifyUp(this.array.length-1),this}isEmpty(){return 0==this.array.length}heapifyUp(r){let a=Math.floor((r-1)/2);for(;a>=0&&!this.checkInvariant(this.array[a],this.array[r]);)[this.array[a],this.array[r]]=[this.array[r],this.array[a]],r=a,a=Math.floor((a-1)/2)}heapifyDown(r){let a,t=2*r+1,h=2*r+2;for(;t<this.array.length&&(a=h<this.array.length&&this.checkInvariant(this.array[h],this.array[t])?h:t,!this.checkInvariant(this.array[r],this.array[a]));)[this.array[r],this.array[a]]=[this.array[a],this.array[r]],r=a,t=2*a+1,h=2*a+2}checkInvariant(r,a){return r[0]>=a[0]}}

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [R, C] = readnum();
  let arr = [];
 
  for (let i=0;i<R;i++) {
    arr.push(readnum());
  }
  
  console.log(`Case #${i}: ${solve(R,C,arr)}`);
}

function solve(R, C, arr) {
  let res = 0;
  let vis = [...Array(R)].map(()=>Array(C).fill(false));
  let heap = new Heap();

  for (let r=0; r<R; r++)
    for (let c=0; c<C; c++)
      heap.add([arr[r][c], r, c])

  while (!heap.isEmpty()) {
    let [val, r, c] = heap.poll();
    if (vis[r][c]) 
      continue;
    vis[r][c] = true;
    
    for (let [dr, dc] of dir) {
      let nr = r + dr, nc = c + dc;

      if (!isIn(nr, nc, R, C) || vis[nr][nc]) continue;
        
      if (val > arr[nr][nc] + 1) {
        res += val - arr[nr][nc] - 1;
        arr[nr][nc] = val - 1;
      }
     
      heap.add([val - 1, nr, nc]);
    }
  }

  return res;
}
