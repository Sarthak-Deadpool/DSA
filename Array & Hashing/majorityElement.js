const maj = (arr)=>{
    let map = new Map();

    for(let i = 0; i < arr.length; i++){
        if(map.has(arr[i])){
            map.set(arr[i], map.get(arr[i])+1);
        }else {
            map.set(arr[i], 1);
        }
    }

    return [...map.entries()].reduce((max, entry) => entry[1] > max[1]? entry : max)[0];
}

const input = [2,2,2,2,4,4,7,5,3,3,3];

console.log(maj(input));