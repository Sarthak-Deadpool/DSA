/**
 * @format
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */

var arrayStringsAreEqual = function (word1, word2) {
  let s = word1.join("");
  let t = word2.join("");

  if (s.length !== t.length) {
    return false;
  }

  if (s !== t) {
    return false;
  }

  return true;
};
