
var groupAnagrams = function (strs) {
  let map =  new Map();

  for(let i = 0; i <strs.length; i++){
    let fr = new Array(26).fill(0);
    let word = strs[i];

    for(let j = 0; j< word.length; j++){
      fr[word[j].charCodeAt(0)-97] += 1;
    }

    let key = fr.split("#").join();

    if(map.has(key)){
      map.get(key).push[...word];
    }else{
      map.set(key, []);
    }
  }

  return [...map.values()];
}
