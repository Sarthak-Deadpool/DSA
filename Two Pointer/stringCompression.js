/**
 * @format
 * @param {character[]} chars
 * @return {number}
 */

var compress = function (chars) {
  let index = 0;
  let count = 1;
  let ch = chars[0];

  for (let i = 0; i < chars.length; i++) {
    if (chars[i] === ch) {
      count++;
    }

    if (chars[i] !== ch) {
      chars[index] = ch;
      index++;

      if (count > 1) {
        let arr = count.toString();

        for (let val of arr) {
          chars[index] = val;
          index++;
        }
      }

      ch = chars[i];
      count = 1;
    }
  }

  hars[index] = ch;
  index++;

  if (count > 1) {
    let arr = count.toString();

    for (let val of arr) {
      chars[index] = val;
      index++;
    }
  }

  return index;
};
