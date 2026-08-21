
let buySellStock = (stock) => {
    let i = 0;
    let j = i+1;

    let min = stock[i];
    let max = stock[j];


    while(j < stock.length){
        if(stock[j] < min){
            i = j;
            min = stock[j];
        }
    
          max = Math.max(max, stock[j]);
        
        j++;
      
        
    }

    return max-min;
}

console.log(buySellStock([7,1,5,3,6,4]))
