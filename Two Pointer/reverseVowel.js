/**
 * @format
 * @param {String[]} s
 */

function reverse(s) {
  let set = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  let s1 = s.split("");

  let i = 0;
  let j = s1.length - 1;

  while (i < j) {
    while (i < j && !set.has(s1[i])) {
      i++;
    }

    while (i < j && !set.has(s1[j])) {
      j--;
    }

    [s1[i], s1[j]] = [s1[j], s1[i]];
    i++;
    j--;
  }

  return s1.join("");
}
