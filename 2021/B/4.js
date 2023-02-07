const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);
const gcd = (x, y) => y == 0 ? x : gcd(y, x % y);
class SegmentTree{constructor(e,t,r){this.array=e,this.operation=t,this.defaultVal=r||0,this.tree=this.createTree(this.array),this.buildTree(0,this.array.length-1,0)}isPowerOfTwo(e){return!(e<1)&&(e&e-1)==0}createTree(e){let t,r=e.length;return Array(t=this.isPowerOfTwo(r)?2*r-1:2*2**(Math.floor(Math.log2(r))+1)-1)}buildTree(e,t,r){if(e==t){this.tree[r]=this.array[e];return}let i=Math.floor((e+t)/2);this.buildTree(e,i,2*r+1),this.buildTree(i+1,t,2*r+2),this.tree[r]=this.operation(this.tree[2*r+1],this.tree[2*r+2])}update(e,t){this.updateRange(0,0,this.array.length-1,e,t)}updateRange(e,t,r,i,s){if(t==r)this.tree[e]=s;else{let h=Math.floor((t+r)/2);i<=h?this.updateRange(2*e+1,t,h,i,s):this.updateRange(2*e+2,h+1,r,i,s),this.tree[e]=this.operation(this.tree[2*e+1],this.tree[2*e+2])}}query(e,t){return this.queryRange(e,t,0,this.array.length-1,0)}queryRange(e,t,r,i,s){if(e<=r&&t>=i)return this.tree[s];if(e>i||t<r)return this.defaultVal;let h=Math.floor((r+i)/2),a=this.queryRange(e,t,r,h,2*s+1),n=this.queryRange(e,t,h+1,i,2*s+2);return 0==a?n:0==n?a:this.operation(a,n)}}

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
  let tree = new SegmentTree(Array(N).fill(0n), gcd, 0n);
  let graph = [...Array(N+1)].map(()=>[]);
  let size = Array(N+1).fill(1);
  let par = Array(N+1).fill(0);
  let start = Array(N+1).fill(0);
  let end = Array(N+1).fill(0);
  let next = Array(N+1).fill(0);
  next[1] = 1;
  let time = 0;
  let ans = Array(Q).fill(0n);
  qs = qs.map((arr,idx)=>[...arr,idx]);
  qs.sort((a,b) => a[1] - b[1]);
  edges.sort((a,b) => a[2] - b[2]);

  function getSize() {
    let stack = [[1, 0, 0]];

    while (stack.length) {
      let [cur,j,idx] = stack[stack.length-1];

      if (idx == graph[cur].length) {
        stack.pop();
    
        if (stack.length) {
          let parent = stack[stack.length-1][0];
          size[parent] += size[cur];

          if (size[cur] > size[graph[parent][0][0]]) {
            [graph[parent][j], graph[parent][0]] = [graph[parent][0], graph[parent][j]];
          }
        }
      } else {
        for (let j=idx; j<graph[cur].length;j++) {
          let [i] = graph[cur][j];
          stack[stack.length-1][2] = j+1;

          if (i != par[cur]) {
            par[i] = cur;
            stack.push([i, j, 0]);
            break;
          }
        }
      } 
    }
  }
  
  function DFS() {
    let stack = [[1, 0]];

    while (stack.length) {
      let [cur,idx] = stack[stack.length-1];

      if (idx == graph[cur].length) {
        end[cur] = time;
        stack.pop();
      } else {
        if (start[cur] == 0) {
          time++;
          start[cur] = time;
        }

        for (let j=idx; j<graph[cur].length;j++) {
          stack[stack.length-1][1] = j+1;
          let go = graph[cur][j];
          let [child] = go;
          if (child != par[cur]) {
            next[child] = (go == graph[cur][0] ? next[cur] : child);
            stack.push([child, 0]);
            break;
          }
        }
      }
    }
  }

  for (let [c1,c2,limit,cost] of edges) {
    graph[c1].push([c2,limit,cost]); 
    graph[c2].push([c1,limit,cost]);
  }

  getSize();
  DFS();

  let edgeIdx = 0;
  for (let [from, weight, id] of qs) {
    while (edgeIdx < edges.length && edges[edgeIdx][2] <= weight) {
      let [c1,c2,limit,cost] = edges[edgeIdx];
      if (par[c1] == c2) [c1,c2] = [c2,c1];

      tree.update(start[c2]-1, cost);
      edgeIdx++;
    }

    while (from) {
      let to = next[from];
      ans[id] = gcd(ans[id], tree.query(start[to]-1, start[from]-1));
      from = par[to];
    }
  }

  return ans.join(' ');
}