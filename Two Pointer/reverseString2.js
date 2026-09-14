/**
 * @format
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

var reverseStr = function (s, k) {
  let arr = s.split("");

  for (let i = 0; i < arr.length; i += 2 * k) {
    let x = i;
    let y = Math.min(i + k - 1, arr.length - 1);

    while (x < y) {
      [arr[x], arr[y]] = [arr[y], arr[x]];
      x++;
      j--;
    }
  }

  return arr.join("");
};
