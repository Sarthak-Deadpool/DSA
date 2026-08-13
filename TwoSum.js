
// first method is bruate force 

var func = function (nums, target){
 
  for(let i = 0; i < nums.length-1; i++){
    for(let j = i+1; j < nums.length; j++){
      if(nums[i] + nums[j] === target){
        return [i, j];
      }
    }
  }
  return[-1, -1];
}

// using two pass hash map 

var func = function (nums, target){

  let map = new Map();

  for(let i = 0; i < nums.length-1; i++){
    map.set(nums[i], i);
  }
  
  for(let i = 0; i < nums.length-1; i++){
    let diff = target - nums[i]
    if(map.has(diff) && map.get(nums[diff]) !== i){
      return [map.get(nums[diff]), i]
  }

    return [-1, -1];
}

  // using single pass hash map


  var func = function (nums, target){

    let map = new Map();

      for(let i = 0; i < nums.length-1; i++){
        let diff = target - nums[i]
        if(map.has(diff)){
          return [map.get(diff), i] 
        }
        map.set(nums[i], i)
      }

    return [-1, -1]
    
  }

  
  

  
