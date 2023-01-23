const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/[\n\r]+/);

let count = 0;
const readnum = () => input[count++].trim().split(' ').map(a => +a);
const readword = () => input[count++].trim().split(' ');

class TrieNode {
  constructor() {
    this.count = 0;
    this.children = Array(26).fill(null);
  }

  getChild(char) {
    return this.children[char.charCodeAt(0) - 65];
  }

  addChild(char) {
    if (!this.hasChild(char)) {
      this.children[char.charCodeAt(0) - 65] = new TrieNode();
    }

    const childNode = this.getChild(char);
    childNode.count++;
    return childNode;
  }

  hasChild(char) {
    return this.getChild(char) != null;
  }
}

class Trie {
  constructor() {
    this.head = new TrieNode();
  }

  addWord(word) {
    let currentNode = this.head;

    for (let index = 0; index < word.length; index++) {
      currentNode = currentNode.addChild(word[index]);
    }

    return this;
  }
}

let [T] = readnum();
for (let i = 1; i <= T; i++) {
  let [N, K] = readnum();

  let arr = [];
  for (let i = 1; i <= N; i++) {
    arr.push(...readword());
  }
  
  console.log(`Case #${i}: ${solve(arr, K)}`);
}

function solve(arr, K) {
  const trie = new Trie();
  
  for (const str of arr) {
    trie.addWord(str);
  }

  let res = 0; 
  const stack = [trie.head];

  while (stack.length) {
    let cur = stack.pop();
    
    for (let child of cur.children) {
      if (child) {
        stack.push(child);
      }
    }

    res += Math.floor(cur.count / K); 
  }

  return res;
}
