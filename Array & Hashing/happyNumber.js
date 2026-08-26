const happyNumber = (n)=>{
    let set = new Set();

    function nextNumber(n) {
        let next = 0;

        while(n > 0){
            let digit = n % 10;
            next += digit* digit;
            n = Math.floor(n/10);
        }

        return next;
    }

    while(!set.has(n)){
        set.add(n);

        n = next(n);

        if(n === 1){
            return true;
        }
    }

    return false;
}

const inp = 12;

console.log(happyNumber(inp));