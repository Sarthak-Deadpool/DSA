const maximumSub = (arr) => {
    let maxSum = 0;
    let maxEnd = arr[0];

    for (let i = 1; i < arr.length; i++){
        maxEnd = Math.max(maxEnd, maxEnd + arr[i]);

        maxSum = Math.max(maxEnd, maxSum);
    }

    return maxSum;
}

console.log(maximumSub([-2, 1, -3, 4, -1, 2, 1, -5, 4]));