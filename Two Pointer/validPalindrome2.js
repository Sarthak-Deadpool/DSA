/** @format */

function check(i, j, s) {
  while (i < j) {
    if (s[i] !== s[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
}

function valid(s) {
  let i = 0;
  let j = s.length - 1;

  while (i < j) {
    if (s[i] !== s[j]) {
      break;
    }

    i++;
    j--;
  }

  if (!check(i + 1, j, s)) {
    if (!check(i, j - 1, s)) {
      return false;
    }
  }

  return true;
}
