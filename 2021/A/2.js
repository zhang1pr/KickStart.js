const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [R, C] = readnum();
  let grid = [];

  for (let j = 1; j <= R; j++)
    grid.push(readnum());

  console.log(`Case #${i}: ${solve(R, C, grid)}`);
}

function solve(R, C, grid) {
  let left = [...Array(R)].map(() => Array(C).fill(0));
  let right = [...Array(R)].map(() => Array(C).fill(0));
  let up = [...Array(R)].map(() => Array(C).fill(0));
  let down = [...Array(R)].map(() => Array(C).fill(0));

  let res = 0;
  
  for (let r=0; r<R; r++)
    for (let c=0; c<C; c++)
      if (grid[r][c]) {
        left[r][c] = up[r][c] = 1;

        if (c > 0)
          left[r][c] += left[r][c-1];
         
        if (r > 0)
          up[r][c] += up[r-1][c];
      }

  for (let r=R-1; r>=0; r--)
    for (let c=C-1; c>=0; c--)
      if (grid[r][c]) {
        right[r][c] = down[r][c] = 1;
        if (c < C-1)
          right[r][c] += right[r][c+1];
        
        if (r < R-1)
          down[r][c] += down[r+1][c];
      }
  
  function cnt(a, b) {
    if (a < 2 || b < 2)
      return 0;

    let res = 0; 
    
    if (b >= 4)
      res += Math.min(a - 1, Math.floor(b/2) - 1)
    if (a >= 4) 
      res += Math.min(b - 1, Math.floor(a/2) - 1)

    return res;  
  }
      
  for (let r=0; r<R; r++) {
    for (let c=0; c<C; c++) {
      if (grid[r][c]) {
        let vup = up[r][c], vdown = down[r][c], vleft = left[r][c], vright = right[r][c];

        let cand = [[vup, vleft], [vup, vright], [vdown, vleft], [vdown, vright]];
        
        for (let [a, b] of cand)
          res += cnt(a,b);
      }  
    }
  }

  return res;      
}