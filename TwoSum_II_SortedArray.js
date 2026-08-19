function twoSum(arr, target){
  let i = 0; 
  let j = arr.length-1;

  while(i < j){

    if(arr[i] + arr[j] < target){
      i++;
    }else if(arr[i] + arr[j] > target){
      j--;
    }else{
      return[i, j];
    }
  }
  return[-1, -1];
}
