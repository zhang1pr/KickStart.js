const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);;

let count = 0;
const readnum = () => input[count++].split(' ').map(a => +a);
const readword = () => input[count++].split(' ');

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N] = readnum();
  let [S] = readword();

  console.log(`Case #${i}: ${solve(N, S)}`);
}

function solve(N, S) {
  if (N < 5) return 'POSSIBLE';

  let arr = getChoices(S.slice(0, 6));
  if (N == 5) return 'POSSIBLE';

  for (let i=6; i<N; i++) {
    let narr = [];

    let lasts = S[i] != '?' ? S[i] : '01';

    for (let root of arr) {
      for (let last of lasts) {
        let cand = root.slice(1) + last;

        if (isValid(cand)) narr.push(cand);
      }
    }

    arr = narr;
    if (!arr.size) return 'IMPOSSIBLE';
  }

  return 'POSSIBLE';
}

function isValid(S) {
  let len = S.length, f = true;
  for (let i=0, j=len-1; i<j; i++, j--)
    if (S[i] != S[j]) 
      f = false;
  
  if (f) return false;

  if (len == 5) return true;

  return isValid(S.slice(1)) && isValid(S.slice(0, len-1));    
}

function generateString(arr) {
  let res = [''];

  for (let i=0; i<arr.length; i++) {
    let nres = [];
    
    for (let cur of res) {
      nres.push(cur + '0');
      nres.push(cur + '1');
    }

    res = nres;
  }
 
  return res;
}

function getChoices(S) {
  let ans = [], indices = [];
  S = [...S];

  for (let i=0; i<S.length; i++) 
    if (S[i] == '?')
      indices.push(i);

  for (let string of generateString(indices)) {
    let choice = S.slice();

    for (let i=0; i<S.length; i++) {
      choice[indices[i]] = string[i];
    }

    let cand = choice.join('');
    if (isValid(cand)) ans.push(cand)
  } 

  return ans;
}
