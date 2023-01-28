const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let A = [];
  for (let i=0; i<N; i++) A.push(readnum());
  let B = [];
  for (let i=0; i<N; i++) B.push(readnum());
  let R = readnum();
  let C = readnum();
  console.log(`Case #${i}: ${solve(N,A,B)}`);
}

function solve(N,A,B) {
  let adj = [...Array(2*N)].map(() => Array(2*N).fill(0));
  let res = 0;
  let selected = Array(2 * N).fill(false);
  let maxE = [...Array(2 * N)].map(() => [-1, -1]);
  maxE[0][0] = 0;

  for (let r=0; r<N; r++)
    for (let c=0; c<N; c++)
      if (A[r][c] == -1) {
        res += B[r][c];
        adj[r][c+N] = B[r][c];
        adj[c+N][r] = B[r][c];
      }

  for (let i = 0; i < 2 * N; i++) {
    let v = -1;
    
    for (let j = 0; j < 2 * N; j++)
      if (!selected[j] && (v == -1 || maxE[j][0] > maxE[v][0]))
        v = j;

    if (v == -1 || maxE[v][0] == -1)
      continue;

    selected[v] = true;

    res -= maxE[v][0];

    for (let to = 0; to < 2 * N; to++)
      if (adj[v][to] > maxE[to][0])
        maxE[to] = [adj[v][to], v];
  }
  
  return res;
} 
