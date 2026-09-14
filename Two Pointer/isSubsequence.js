/**
 * @format
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

function Sub(s, t) {
  let i = 0;
  let j = 0;

  while (j < t.length) {
    if (s[i] === t[j]) {
      i++;
      j++;
    }

    j++;
  }

  if (i < s.length) {
    return false;
  }

  return true;
}
