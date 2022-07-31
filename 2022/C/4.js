const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let max = 1000, M = 1e9+7;
let C = [...Array(max)].map(()=>Array(max).fill(0));
for (let i = 0; i < max; i++) {
  C[i][0] = C[i][i] = 1;
  for (let j = 1; j < i; j++) {
    C[i][j] = (C[i-1][j] + C[i-1][j-1]) % M;
  }
}

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let [S] = readword();
  console.log(`Case #${i}: ${solve(N, S)}`);
}

function solve(N, S) {
	let ans = 1, dp, ndp;
	for (let start of [1, 2]) {
		dp = [...Array(N)].map(()=>Array(N).fill(0));
		if (start == 1) {
			for (let i = 0; i < N; i++) {
				dp[i][i] = 1;
			}
		}

		if (start == 2) {
			for (let i = 0; i < N; i++) {
				for (let j = i + 1; j < N; j++) {
					if (S[i] == S[j]) {
						dp[i][j] = 1;
					}
				}
			}
		}

		let len = start;
		for (let k = 0; k <= N / 2; k++) {
			let total = 0;
			for (let i = 0; i < N; i++) {
				for (let j = i; j < N; j++) {
					total = (total + dp[i][j]) % M;
				}
			}

			if (total > 0 && len < N) {
				let tmp = BigInt(total) * pow(C[N][len], M - 2) % BigInt(M);
				ans = (ans + parseInt(tmp)) % M;
			}
			
			len += 2;
			ndp = [...Array(N)].map(()=>Array(N).fill(0));
			for (let L = N - 1; L >= 0; L--) {
				for (let R = L; R < N; R++) {
					if (L >= 1) 
						dp[L-1][R] = (dp[L-1][R] + dp[L][R]) % M;
				}
			}
			
			for (let L = N - 1; L >= 0; L--) {
				for (let R = L; R < N; R++) {
					if (R != N - 1) 
						dp[L][R+1] = (dp[L][R+1] + dp[L][R]) % M;
				}
			}

			for (let L = N - 1; L >= 0; L--) {
				for (let R = L; R < N; R++) {
					if (L != 0 && R != N - 1 && S[L-1] == S[R+1]) {
						ndp[L-1][R+1] = (ndp[L-1][R+1] + dp[L][R]) % M;
					}
				}
			}

			dp = ndp;
		}
	}

  return ans;
}

function pow(a, b) {
  let r = 1n, mod = BigInt(M);
	a = BigInt(a), b = BigInt(b);
  
	while(b) {
    if (b % 2n) {
      r = r * a % mod;
      b--;
    }
    a = a * a % mod;
    b /= 2n;
  }

  return r;
}
