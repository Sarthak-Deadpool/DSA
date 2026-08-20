function threeSum(arr){
  let ans = []

  for(let i = 0; i < arr.length; i++){
    if(i > 0 && arr[i] === arr[i+1]){
      continue;
    }
    let j = i;
    let k = arr.length;

    while(j < k){
      let val = arr[i] + arr[j] + arr[k];

      if(val < 0){
        j++;
      }else if(val > 0){
        k--;
      }else{
        ans.push(arr[i] + arr[j] + arr[k]);
        while(j<arr.length && arr[j] === arr[j+1]){
          j++;
        }
      }
    }
  }
  return ans;
}


let input = [1,1,2,-3,0,-1,-2,3];
console.log(threeSum(input));
