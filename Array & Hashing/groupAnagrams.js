/** @format */

const groupAnagrams = (strs) => {
  let map = new Map();

  for (let i = 0; i < strs.length; i++) {
    let s = strs[i];

    let fr = new Array(26).fill(0);

    for (let j = 0; j < s.length; j++) {
      fr[s[j].charCodeAt(0) - 97] += 1;
    }

    let key = fr.join("#");

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(s);
  }
  return [...map.values()];
};

const input = ["eat","tea","tan","ate","nat","bat"]

console.log(groupAnagrams(input));
