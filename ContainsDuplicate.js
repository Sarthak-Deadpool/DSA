// Brute  force 

var containsDuplicate = function (nums) {
  for(let i = 1; i< nums.length-1; i++){
      for(let j = i+1; j < nums.length; j++){
          if(nums[i] === nums[j]){
              return true;
            }
        }
      }
return false;
}

// using hash set 

var containsDuplicate = function (nums) {
      let set = new Set();

  for(let i= 0; i< nums.length; i++){
    if(set.has(nums[i]){
      return true;
    }
    set.add(nums[i]);
  }
  return false;
}

// using hash map

var containsDuplicate = function (nums) {
      let map = new Map();

  for(let i= 0; i< nums.length; i++){
    if(map.has(nums[i]){
      return true;
    }
    map.set(nums[i], i);
  }
  return false;
}




