const pattern = (s, t) => {
    let map = new Map();

    let arr = t.split(' ');

    for(let i = 0; i <  s.length; i++){
        if(map.has(s[i]) && map.get(s[i]) !== arr[i]){
            return false;
        }

        if(!map.has(s[i]) && Array.from(map.values()).includes(arr[i])){
            return false;
        }

        map.set(s[i], arr[i]);
    }

    return true;
}

const s = "abba"
const t = "dog cat cat dog"

console.log(pattern(s, t));