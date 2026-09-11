/** @format */

function merge(a1,m, a2, n) {
  let i = m-1
  let j = n-1
  let k = m+n-1;


  while (i >= 0 && j >= 0) {
    if (a1[i] > a2[j]) {
      a1[k] = a1[i]
      i--;
    } else {
      a1[k] = a2[j];
      j--;
    }

    k--;
  }

  while (j >= 0) {
    a1[k] = a2[j];
    j--;
    k--;
  }
}
