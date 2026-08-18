function LongestConsecutive(nums){

  // by sorting Array and then using counter;

let sorted =   nums.sort((a, b) => a-b);

  let count = 1;
  let longest = 0;
  for(let i = 0; i < sorted.length; i++){
     if(sorted[i] === sorted[i + 1]){
       continue;
     } else if( sorted [i] +1 === sorted[i+1]){
       count++;
     }else{
       longest =  Math.max(longest, count);
       count = 0;
     }
  }
  return longest;

  // using set 

  let set = new Set();

  for (let i = 0; i < nums.length; i++){
    set.add(nums[i]);
  }

  let longest = 0;

  for(let val of set){
    if(!set.has(val-1)){
      let count = 1; 
      let curr = val;

      while(set.has(curr+1)){
        count++;
        curr++;
      }
      longest =  Math.max(longest, count);
    }
    
  }
  return longest;
}
