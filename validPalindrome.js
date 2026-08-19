
function validPlindrome(str){

  // two pointer Approch to solve this 
   
  let cleanString  str.replace(/[^a-zA-Z0-9]/g,"");

  let i = 0; 
  let j = cleanStirng-1;

  while(i< j){
    
    if(cleanString[i] !== cleanString[j]){
      return false;
    }
    i++;
    j--;
  }
  return true;
}
