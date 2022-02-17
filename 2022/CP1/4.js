const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split('\n');

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let T = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let arr = [];

  for (let j = 1; j <= N; j++) {
    arr.push(...readword());
  }

  console.log(`Case #${i}: ${solve(N, arr)}`);
}

function solve(N, arr) {
  let bdir = [[0, -1], [1, -1], [1, 0], [0, 1], [-1, 1], [-1, 0]];
  let rdir = [[-1, 0], [-1, 1], [0, 1], [1, 0], [1, -1], [0, -1]];
  let blue = 0, red = 0;
  let bpath = 0, rpath = 0;
  let set = new Set();
   
  for (let i=0;i<N;i++) {
    for (let j=0;j<N;j++) {
      if (arr[i][j] == 'B') {
        if (j == 0 && !set.has(i+','+j)) {
          let cur = bfs('B', set, i, j, bdir, N, arr);
          bpath += cur;
        }
        blue++;
      } else if (arr[i][j] == 'R') {
        if (i == 0 && !set.has(i+','+j)) {
          let cur = bfs('R', set, i, j, rdir, N, arr);
          rpath += cur;
        }

        red++;
      }
    }
  }

  if (Math.abs(blue-red) > 1 || bpath + rpath > 1) return 'Impossible';
  if (bpath) {
    if (blue < red) return 'Impossible';
    else return 'Blue wins';
  }
  
  if (rpath) {
    if (blue > red) return 'Impossible';
    else return 'Red wins';
  }

  return 'Nobody wins';
}

function* nei(ch, r, c, dir, N, arr) {
  for (let [dr, dc] of dir) {
    let nr = r+dr, nc = c+dc;
    if (0 <= nr && nr < N && 0 <= nc && nc < N && arr[nr][nc] == ch)
      yield [nr, nc];
  }
}

function bfs(ch, set, i, j, dir, N, arr) {
  let stack = [[i, j]];

  while (stack.length) {
    let [r, c] = stack.pop();
    if (set.has(r+','+c)) continue;
    set.add(r+','+c);

    if (ch == 'B' && c == N-1 || ch == 'R' && r == N-1) return 1;

    for (let [nr, nc] of nei(ch, r, c, dir, N, arr)) {
      stack.push([nr, nc]);
    }
  }

  return 0;
}
