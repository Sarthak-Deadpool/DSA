// by sorting string and then compare both 

var isAnagram = function (s, t) {

  // checking length 
  if(s.length !== t.length){
    return false;
  }
  
// by sorting string and then compare both

  let strS = s.split('').sort().join();
  let strT = t.split('').sort().join();

  for(let i = 0 ; i< strS.length; i++){
    if(strS[i] !== strT[i]){
      return false
    }
  }

  return true;

  
  // using frequency hash map 

  let map =  new Map();
 
  for(let i = 0; i< s.length; i++){
    if(map.has(s[i])){
      map.set(s[i], map.get(s[i]) +1);
    }else{
      map.set(s[i], 1);
    }
  }

  for(let i = 0; i < t.length; i++){
    if(!map.has(t[i]) || map.get(t[i]) <=0){
      return false;
    }
    map.set(t[i], map.get(t[i]) -1)
  }
  return true; 

  // frequncy array

  let sArr = new Array(26).fill(0);
  let tArr = new Array(26).fill(0);

  for(let i =0; i < s.length; i++){
    sArr[s[i].charCodeAt(0) -97] += 1;
    tArr[t[i].charCodeAt(0) -97] += 1;
  }

  for(let i = 0; i< sArr.length; i++){
    if(sArr[i] !== tArray[i]){
      return false;
    }
  }

  return true
 

  
  
}
