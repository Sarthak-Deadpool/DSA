
function product(nums){

  // using prefix and suffix array

  let prefix = new Array(nums.length).fill(1);
  let suffix =  new Array(nums.length).fill(1);

  let pre = 1;
  for(let i = 0; i < nums.length; i++){
    prefix[i] =  prefix[i] * pre;
    pre = pre * nums[i];
  }

   let suf = 1;
   for(let i = nums.length-1; i >= 0; i--){
    suffix[i] =  suffix[i] * suf;
    suf = suf * nums[i];
  }

  let ans = new Array(nums.length).fill(1);
  for(let i = 0; i<nums.length; i++){
    ans[i] = prefix[i] * suffix[i];
  }

  retrun ans;


  // without using extra Space excluding Ans Array;


  let ans = new Array(nums.length).fill(1);

  let pre = 1; 
  for(let i = 0;  i < nums.length; i++){
    ans[i] *= pre;
    pre *= nums[i];
  }

  let suf = 1;
  for(let i = nums.length -1; i >= 0; i--){
    ans[i] *= suf;
    suf *= nums[i];
  }

  return ans;

  
  
}
