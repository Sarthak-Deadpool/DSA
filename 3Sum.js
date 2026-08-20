function threeSum(nums){
  let arr = nums.sort((a,b) => a-b);
  let ans = []

  for(let i = 0; i < arr.length-2; i++){
    if(i > 0 && arr[i] === arr[i-1]){
      continue;
    }
    let j = i+1;
    let k = arr.length-1;

    while(j < k){
      let val = arr[i] + arr[j] + arr[k];

      if(val < 0){
        j++;
      }else if(val > 0){
        k--;
      }else{
        ans.push([arr[i] , arr[j] , arr[k]]);
        j++;
        k--;
        while(j<k && arr[j] === arr[j-1]){
          j++;
        }
      }
    }
  }
  return ans;
}


let input = [1,1,2,-3,0,-1,-2,3];
console.log(threeSum(input));
