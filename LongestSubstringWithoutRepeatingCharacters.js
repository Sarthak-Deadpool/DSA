let longestSubStr = (str) =>{
    // using set 

    let set = new Set();

    let i = 0; 
    let maxLen = 0;

    for(let j = 0; j < str.length; j++){

        while(set.has(str[j])){
            set.delete(str[i]);
            i++;
        }
        set.add(str[j]);
        maxLen = Math.max(maxLen, j-i +1);
        
    }
    return maxLen;
}

console.log(longestSubStr("abcabdcvdsfcbb"))
