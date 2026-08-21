function mostWater(arr){

  // two pointer approach
  
  let i = 0;
  let j = arr.length -1;

  let most = 0;
  
  while(i < j){

    let b = j-i;
    let h = Math.min(arr[i] , arr[j]);
    most = Math.max(most, b*h);

    if(arr[i] < arr[j]){
      i++;
    }else if(arr[i] > arr[j]){
      j--;
    }else{
      i++;
      j--;
    }
  }
  return most ;
}
