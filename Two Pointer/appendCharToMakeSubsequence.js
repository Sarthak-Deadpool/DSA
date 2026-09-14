/**
 * @format
 * @param {string} s
 * @param {string} t
 * @return {number}
 */

var appendCharacters = function (s, t) {
  let i = 0;
  let j = 0;

  while (i < s.length) {
    if (s[i] === t[j]) {
      j++;
    }

    i++;
  }

  return t.length - j;
};

console.log(appendCharacters("abcdfgh", "abc"));
