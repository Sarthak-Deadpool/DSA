/**
 * @format
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */

var mergeAlternately = function (word1, word2) {
  let arr = new Array(word1.length + word2.length).fill(0);

  let i = 0;
  let j = 1;

  let x = 0;
  let y = 0;

  while (x < word1.length && y < word2.length) {
    arr[i] = word1[x];
    x++;
    i += 2;

    arr[j] = word2[y];
    y++;
    j += 2;
  }

  i = Math.min(word1.length, word2.length) * 2;

  while (x < word1.length) {
    arr[i] = word1[x];
    i++;
    x++;
  }

  while (y < word2.length) {
    arr[i] = word2[y];
    i++;
    y++;
  }

  return arr.join("");
};
