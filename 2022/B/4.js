const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [R, C] = readnum();
  let arr = [];

  for (let i=1;i<=R;i++) {
		arr.push([...readword()[0]]);
  }

	console.log(`Case #${i}: ${solve(R, C, arr)}`);
}

function solve(n, m, g) {
	let ans = [];
  let dStr = "NESW";
	let dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];

	function canGo(i, j) {
		return i>=0 && i<n && j>=0 && j<m && g[i][j]=='*';
	}

	let stack = [[0,0,null,null]];
 
	while (stack.length) {
		let [i,j,k,ck] = stack[stack.length-1];

		let isNew = false;
		if (k == null) {
			isNew = true;
			g[Math.floor(i/2)][Math.floor(j/2)]='#';

			let i2=i&1, j2=j&1;
			k=i2 ? 3-j2 : j2;
			ck=k;
		} else {
			ans.push(dStr[ck^2]);
			i+=dir[(ck+1)%4][0];
			j+=dir[(ck+1)%4][1];
			ck=(ck+1)%4;
		}
		stack[stack.length-1] = [i,j,k,ck];

		let isFinished = true;

		while (ck != k || isNew) {
			isNew = false;
			let ni=i+dir[ck][0], nj=j+dir[ck][1];

			if (canGo(Math.floor(ni/2), Math.floor(nj/2))) {
				ans.push(dStr[ck]);
				
				stack.push([ni, nj,null,null]);
				isFinished = false;
				break;
			} else {
				ans.push(dStr[(ck+1)%4]);
				i+=dir[(ck+1)%4][0];
				j+=dir[(ck+1)%4][1];
				ck=(ck+1)%4;
				stack[stack.length-1] = [i,j,k,ck];
			}
		}
				
		if (isFinished) {
			ans.pop();
			stack.pop();
		}
	}
		
	for (let r=0; r<n; r++)
		for (let c=0; c<m; c++)
			if (g[r][c] == '*')
				return 'IMPOSSIBLE'
	
	ans.push('N');
	return ans.join('');
}
