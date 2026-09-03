/** @format */

const array = (arr) => {
  this.a = arr;
};

array.prototype.sumRange = (l, r) => {
  let s = 0;

  for (let i = l; i <= r; i++) {
    s += this.a[i];
  }
  return s;
};
