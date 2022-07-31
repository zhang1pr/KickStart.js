const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;
class Heap{constructor(){this.array=[]}size(){return this.array.length;}peek(){return 0===this.array.length?null:this.array[0]}poll(){if(0===this.array.length)return null;if(1===this.array.length)return this.array.pop();const r=this.array[0];return this.array[0]=this.array.pop(),this.heapifyDown(0),r}add(r){return this.array.push(r),this.heapifyUp(this.array.length-1),this}isEmpty(){return 0==this.array.length}heapifyUp(r){let a=Math.floor((r-1)/2);for(;a>=0&&!this.checkInvariant(this.array[a],this.array[r]);)[this.array[a],this.array[r]]=[this.array[r],this.array[a]],r=a,a=Math.floor((a-1)/2)}heapifyDown(r){let a,t=2*r+1,h=2*r+2;for(;t<this.array.length&&(a=h<this.array.length&&this.checkInvariant(this.array[h],this.array[t])?h:t,!this.checkInvariant(this.array[r],this.array[a]));)[this.array[r],this.array[a]]=[this.array[a],this.array[r]],r=a,t=2*a+1,h=2*a+2}checkInvariant(r,a){return r<=a}}

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = readnum();

  console.log(`Case #${i}: ${solve(arr)}`);
}

function solve(arr) {
  let heap = new Heap();
  let res = [];
  let hidx = 1;

  for (let num of arr) {
    heap.add(num);

    while (!heap.isEmpty() && heap.peek() < hidx) {
      heap.poll();
    } 
    
    if (heap.size() >= hidx) {
      res.push(hidx);
      hidx++;
    } else {
      res.push(hidx-1);
    }
  }

  return res.join(' ');
}
