
var topKFrequent = function(nums, k) {
  let map = new Map();

  for(let i = 0; i < nums.length; i++){
    if(!map.has(nums[i])){
      map.set(nums[i], 1);
    }else{
      map.set(nums[i], map.get(nums[i]) +1);
    }
  }

  return [...map.entries()].sort((a, b) => b[1]-a[1]).slice(0, k).map(entry => entry[0])
                                                                      
}
