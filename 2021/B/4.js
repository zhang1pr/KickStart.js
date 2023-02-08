const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const gcd = (x, y) => y == 0 ? x : gcd(y, x % y);
class SegmentTree{constructor(e,t,r){this.array=e,this.operation=t,this.defaultVal=r||0,this.tree=this.createTree(this.array),this.buildTree(0,this.array.length-1,0)}isPowerOfTwo(e){return!(e<1)&&(e&e-1)==0}createTree(e){let t,r=e.length;return Array(t=this.isPowerOfTwo(r)?2*r-1:2*2**(Math.floor(Math.log2(r))+1)-1)}buildTree(e,t,r){if(e==t){this.tree[r]=this.array[e];return}let i=Math.floor((e+t)/2);this.buildTree(e,i,2*r+1),this.buildTree(i+1,t,2*r+2),this.tree[r]=this.operation(this.tree[2*r+1],this.tree[2*r+2])}update(e,t){this.updateTreeRange(0,0,this.array.length-1,e,t)}updateTreeRange(e,t,r,i,s){if(t==r)this.tree[e]=s;else{let a=Math.floor((t+r)/2);i<=a?this.updateTreeRange(2*e+1,t,a,i,s):this.updateTreeRange(2*e+2,a+1,r,i,s),this.tree[e]=this.operation(this.tree[2*e+1],this.tree[2*e+2])}}query(e){return this.queryRange(0,e)}queryRange(e,t){return this.queryTreeRange(e,t,0,this.array.length-1,0)}queryTreeRange(e,t,r,i,s){if(e<=r&&t>=i)return this.tree[s];if(e>i||t<r)return this.defaultVal;let a=Math.floor((r+i)/2),h=this.queryTreeRange(e,t,r,a,2*s+1),n=this.queryTreeRange(e,t,a+1,i,2*s+2);return 0==h?n:0==n?h:this.operation(h,n)}}

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N,Q] = readnum();
  let arr = [];
  for (let i=1; i<N; i++) {
    let [C1, C2, L, A] = readword();
    arr.push([+C1, +C2, +L, BigInt(A)]);
  }
    
  let qs = [];
  for (let i=1; i<=Q; i++)
    qs.push(readnum());

  console.log(`Case #${i}: ${solve(N,Q,arr,qs)}`);
}

function solve(N,Q,edges,qs) {
  let graph = [...Array(N+1)].map(()=>[]);
  let ans = Array(Q).fill(0n);
  qs = qs.map((arr,idx)=>[...arr,idx]);
  let qmap = new Map();

  for (let [city, weight, idx] of qs) {
    if (!qmap.has(city))
      qmap.set(city, []);
    
    qmap.get(city).push([weight, idx]);  
  }

  let maxLimit = 0;
  for (let [c1,c2,limit,cost] of edges) {
    maxLimit = Math.max(maxLimit, limit);
    graph[c1].push([c2,limit,cost]); 
    graph[c2].push([c1,limit,cost]);
  }
  
  let tree = new SegmentTree(Array(maxLimit+1).fill(0n), gcd, 0n);
  let stack = [[1,-1,0,0]];

  while (stack.length) {
    let [city, parent, limit, index] = stack[stack.length-1];

    if (index == graph[city].length) {
      tree.update(limit, 0n);
      stack.pop();
    } else {
      if (index == 0 && qmap.has(city))
        for (let [weight, idx] of qmap.get(city))
          ans[idx] = tree.queryRange(1, Math.min(maxLimit, weight));

      for (let i=index; i<graph[city].length; i++) {
        stack[stack.length-1][3] = i+1;
        let [nei, nlimit, cost] = graph[city][i];

        if (nei != parent) {
          tree.update(nlimit, cost);
          stack.push([nei, city, nlimit, 0]);
          break;
        }
      }    
    }
  }

  return ans.join(' ');
}