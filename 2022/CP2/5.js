const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [R,C] = readnum();
  let grid = [];
  for (let r=0; r<R; r++) {
    grid.push(...readword());
  }

  console.log(`Case #${i}: ${solve(R,C,grid)}`);
}

function solve(R,C,grid) {
  let q = [];
  let d = [...Array(R)].map(()=>Array(C).fill(false));
  let arr = [];
  const dir = [[0, 1], [0, -1], [-1, 0], [1, 0]];

  for (let r=0;r<R;r++) {
    for (let c=0;c<C;c++) {
      if (grid[r][c] == 1) {
        q.push([r,c]);
        d[r][c] = true;
      } 
    }
  }

  if (!q.length) return Math.ceil((R - 1)/2) + Math.ceil((C - 1)/2);

  let cur = 0;

  while (q.length) {
    cur++;
    let nq = [];

    for (let [r,c] of q) {
      for (let [dr,dc] of dir) {
        let nr = r+dr, nc =c+dc;

        if (nr >=0 && nr < R && nc>=0 && nc < C && !d[nr][nc]) {
          nq.push([nr,nc]);
          d[nr][nc] = true;
          arr.push([cur,nr,nc]);
        }
      }
    }

    q = nq;
  }
  
  if (arr.length <= 1) return 0;

  let val = Array(arr.length), maxx = maxy = 0, minx = miny = Infinity;
  for (let i=arr.length-1;i>=0;i--) {
    let [d,x,y] = arr[i];
    maxx = Math.max(maxx, x);
    minx = Math.min(minx, x);
    maxy = Math.max(maxy, y);
    miny = Math.min(miny, y);
    val[i] = [(maxx+minx)/2,(maxy+miny)/2];
  }

  let lo = 0, hi = cur, cand;
  while (lo < hi) {
    cand = lo+hi>>1;

    let l = 0, r = arr.length-1, m;
    while (l < r) {
      m = l+r>>1;
      if (arr[m][0] > cand) {
        r = m;  
      } else {
        l = m + 1;
      }
    }
                      
    let [nx,ny] = val[l], points = [];

    for (let x of new Set([Math.floor(nx), Math.ceil(nx)])) {
      for (let y of new Set([Math.floor(ny), Math.ceil(ny)])) {
        points.push([x,y]);
      }
    }

    let flag = Array(points.length).fill(true);
        
    for (let i=l; i<arr.length; i++) {
      let [d,x,y] = arr[i];

      let good = false;

      for (let j=0;j<points.length;j++) {
        let [nx, ny] = points[j];

        if (flag[j]) {
          if (Math.abs(nx - x) + Math.abs(ny - y) > cand) {
            flag[j] = false;
          } else {
            good = true;
          }
        }
      }

      if (!good) break;
    }

    if (flag.includes(true)) {
      hi = cand;
    } else {
      lo = cand + 1;
    }
  }

  return lo;
}
