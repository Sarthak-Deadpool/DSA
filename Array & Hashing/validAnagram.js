/** @format */

const validAnagram = (s, t) => {
  if (s.length !== t.length) {
    return false;
  }

  // using frequency Array

  //   let frs = new Array(26).fill(0);
  //   let frt = new Array(26).fill(0);

  //   for (let i = 0; i < s.length; i++) {
  //     frs[s[i].charCodeAt(0) - 97] += 1;
  //     frt[t[i].charCodeAt(0) - 97] += 1;
  //   }

  //   for(let i = 0; i < s.length; i++){
  //     if(frs[i] !== frt[i]){
  //         return false;
  //     }
  //   }

  //   return true;

  // using frequency map

  let maps = new Map();
  let mapt = new Map();

  for (let i = 0; i < s.length; i++) {
    if (maps.has(s[i])) {
      maps.set(s[i], maps.get(s[i]) + 1);
    } else {
      maps.set(s[i], 1);
    }

    if (mapt.has(t[i])) {
      mapt.set(t[i], mapt.get(t[i]) + 1);
    } else {
      mapt.set(t[i], 1);
    }
  }

  for (let [key, value] of maps) {
    if (mapt.get(key) !== value) {
      return false;
    }
  }

  return true;
};

const s = "car";
const t = "arc";

console.log(validAnagram(s, t));
