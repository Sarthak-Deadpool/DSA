/** @format */

// constructer

const productOfNumbers = () => {
  this.arr = [];
};

productOfNumbers.prototype.add = (num) => {
  this.arr.push(num);
  return null;
};

productOfNumbers.prototype.getProduct = (k) => {
  let p = 1;
  for (let i = this.arr.length - 1; i >= this.arr.length - k; i--) {
    p *= this.arr[i];
  }

  return p;
};
