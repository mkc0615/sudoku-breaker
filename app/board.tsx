import { View, TextInput, Text, Pressable, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { solveSudoku } from '../utils/solverV1';

export default function BoardScreen() {
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(''))
  );

  const handleInputChange = (text: string, row: number, col: number) => {
    const newBoard = board.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? text.replace(/[^1-9]/g, '') : c))
    );
    setBoard(newBoard);
  };

  const handleSolve = () => {
    const targetBoard = board.map(row => 
        row.map(cell => cell === '' ? 0 : parseInt(cell))
    );

    const copiedBoard = targetBoard.map( row => [...row]);

    const success = solveSudoku(copiedBoard);

    if(success) {
        const solvedBoardStr = copiedBoard.map( row => 
            row.map(num => (num === 0? '' : num.toString()))
        );
        setBoard(solvedBoardStr);
    } else {
        alert("No Solution Found !!!");
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Sudoku Breaker</Text>

      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <TextInput
              key={`${rowIndex}-${colIndex}`}
              style={[
                styles.cell,
                (rowIndex % 3 === 0 && rowIndex !== 0) && { borderTopWidth: 3 },
                (colIndex % 3 === 0 && colIndex !== 0) && { borderLeftWidth: 3 },
              ]}
              keyboardType="number-pad"
              maxLength={1}
              value={cell}
              onChangeText={(text) => handleInputChange(text, rowIndex, colIndex)}
              placeholder=""
              placeholderTextColor="#000"
            />
            
            ))}
          </View>
        ))}
      </View>

      <Pressable style={styles.button} onPress={handleSolve}>
        <Text style={styles.buttonText}>Solve</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // black background
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff', // white text
  },
  board: {
    width: '90%',
    aspectRatio: 1,
    justifyContent: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000', 
    backgroundColor: '#fff', 
    color: '#000',
    textAlign: 'center',
    fontSize: 9,
  },
  button: {
    backgroundColor: '#fff', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
