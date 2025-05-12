export function solveSudokuBitmask(board: number[][]): boolean {
    const rows = new Array(9).fill(0);
    const cols = new Array(9).fill(0);
    const boxes = new Array(9).fill(0);
  
    const emptyCells: [number, number][] = [];
  
    const getBoxIndex = (r: number, c: number) => Math.floor(r / 3) * 3 + Math.floor(c / 3);
  
    const setBit = (mask: number, bit: number) => mask | (1 << bit);
    const clearBit = (mask: number, bit: number) => mask & ~(1 << bit);
    const isSet = (mask: number, bit: number) => (mask & (1 << bit)) !== 0;
  
    // Initialization
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val === 0) {
          emptyCells.push([r, c]);
        } else {
          const bit = val - 1;
          rows[r] = setBit(rows[r], bit);
          cols[c] = setBit(cols[c], bit);
          boxes[getBoxIndex(r, c)] = setBit(boxes[getBoxIndex(r, c)], bit);
        }
      }
    }
  
    const dfs = (idx: number): boolean => {
      if (idx === emptyCells.length) return true;
  
      const [r, c] = emptyCells[idx];
      const boxIdx = getBoxIndex(r, c);
  
      for (let num = 1; num <= 9; num++) {
        const bit = num - 1;
  
        if (
          !isSet(rows[r], bit) &&
          !isSet(cols[c], bit) &&
          !isSet(boxes[boxIdx], bit)
        ) {
          // Place number
          board[r][c] = num;
          rows[r] = setBit(rows[r], bit);
          cols[c] = setBit(cols[c], bit);
          boxes[boxIdx] = setBit(boxes[boxIdx], bit);
  
          if (dfs(idx + 1)) return true;
  
          // Backtrack
          board[r][c] = 0;
          rows[r] = clearBit(rows[r], bit);
          cols[c] = clearBit(cols[c], bit);
          boxes[boxIdx] = clearBit(boxes[boxIdx], bit);
        }
      }
  
      return false;
    };
  
    return dfs(0);
  }
  