const productExceptSelf = (arr) => {

    let ans = [];

    let prefix = 1;
    for(let i = 0; i < arr.length; i++){
        ans[i] = prefix;
        prefix *= arr[i];
    }

    console.log("hello");

    let suffix = 1;

    for(let i = arr.length-1; i >= 0; i -- ){
        ans[i] = ans[i] * suffix;
        suffix *= arr[i];
    }

    return ans;
};

const input = [1, 2, 3, 4];

console.log(productExceptSelf(input));