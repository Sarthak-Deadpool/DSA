/** @format */

function inter(a1, a2) {
  a1.sort((a, b) => a - b);
  a2.sort((a, b) => a - b);

  let ans = [];

  let i = 0;
  let j = 0;

  while (i < a1.length && j < a2.length) {
    if (a1[i] === a2[j]) {
      ans.push(a1[i]);
      i++;
      j++;
    } else if (a1[i] < a2[j]) {
      i++;
    } else {
      j++;
    }
  }

  console.log(ans);
}
