
function validSudoku(grid){
  // using Array of set

  let row = new Array.from({length: 9}, () => new Set());
  let col = new Array.from({length: 9}, () => new Set());
  let box = new Array.from({length :9}, () => new Set());

  for(let r = 0; r < 9; r++){
    for(let c = 0; c < 9; c++){

      if(grid[r][c]){
        continue;
      }
      
      let val = grid[r][c];
      let boxIndex = Math.floor(r/3) *3 + Math.floor(c/3);
      
      if(row[r].has(val) || col[c].has(val) || box[boxIndex].has(val)){
        return false;
      }

      row[r].add(val);
      col[c].add(val);
      box[boxIndex].add(val);
    }
  }

  return true;


  // using hash map and value as set

  let row = new Map();
  let col = new Map();
  let box = new Map();

  for(let i = 0; i < 9; i++){
    row.set(i, new Set());
    col.set(i, new Set());
    box.set(i, new Set());
  }

  for(let r = 0; r < 9; r++){
    for(let c = 0; c < 9; c++){

      if(grid[r][c]){
        continue;
      }
      
      let val = grid[r][c];
      let boxIndex = Math.floor(r/3) *3 + Math.floor(c/3);
      
      if(row.get(r).has(val) || col.get(c).has(val) || box.get(boxIndex).has(val)){
        return false;
      }

      row.get(r).add(val);
      col.get(c).add(val);
      box.get(boxIndex).add(val);
    }
  }
return true;
  
    
}
