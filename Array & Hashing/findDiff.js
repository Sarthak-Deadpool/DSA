/** @format */

const diff = (s, t) => {
  let arr = t.split("");

  for (let val of s) {
    if (arr.includes(val)) {
      let index = arr.indexOf(val);

      arr.splice(index, 1);
    }
  }

  return arr.join("");
};
