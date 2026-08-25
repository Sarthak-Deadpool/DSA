const longestConsecutive = (arr) => {
    let set = new Set();

    for(let i = 0; i < arr.length; i++){
        set.add(arr[i]);
    }

    let longest = 0;

    for(let value of set){

        if(!set.has(value-1)){
            let curr = value;
            let count = 1;

            while(set.has(curr+1)){
                count++;
                curr++;
            }

            longest =  Math.max(longest, count);
        }
    }

    return longest;
}

const input = [100, 1, 78, 2, 3, 4];

console.log(longestConsecutive(input));