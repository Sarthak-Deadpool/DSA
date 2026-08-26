const isomorph = (s, t) => {
    let map = new Map();

    for(let i = 0; i < s.length; i++){

        if(map.has(s[i]) && map.get(s[i]) !== t[i]){
            return false;
        }

        if(!map.has(s[i]) && Array.from(map.values()).includes(t[i])){
            return false;
        }

        map.set(s[i], t[i]);
    }

    return false;
}

const s = "egg"
const t = "odd"

console.log(isomorph(s, t));