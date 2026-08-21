
function traping(arr){

  let i = 0;
  let j = arr.length-1;

  let maxi = arr[i];
  let maxj = arr[j];

  let water = 0;

  while(i < j){

    if(maxi < maxj){
      i++;
      maxi = Math.max(maxi, arr[i]);
      water = water + maxi - arr[i];
    }else{
      j--;
      maxj = Math.max(maxj, arr[j]);
      water =  water + maxj - arr[j];
    }
  }
}
