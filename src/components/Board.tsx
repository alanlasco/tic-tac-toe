import React, { useState, useEffect } from 'react';
import '../stylesheets/Board.css';

export const Board = () => {
    const initialCells = ['', '', '', '', '', '', '', '', ''];
    const [cellValues, setCellValues] = useState<string[]>(initialCells);
    const [currentUser, setCurrentUser] = useState<string>('X');
    const [winner, setWinner] = useState<string | null>(null);

    /*const current = (c: string) => {
        c === 'X' ? (c = 'O') : (c = 'X');
        setCurrentUser(c);
    };*/

    const checkWinner = () => {
        const winningCombinations: number[][] = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]           // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cellValues[a] &&
                cellValues[a] === cellValues[b] &&
                cellValues[a] === cellValues[c]
            ) {
                return cellValues[a];
            }
        }

        return null;
    };
    useEffect(() => {
        const winner = checkWinner();
        if (winner) {
            setWinner(winner);
        }
    }, [cellValues]);

const handleClick = (index: number) => {
    if (!cellValues[index] && !winner) {
        const newCellValues = [...cellValues];
        newCellValues[index] = currentUser;
        setCellValues(newCellValues);
        setCurrentUser(currentUser === 'X' ? 'O' : 'X'); // Cambio de jugador
    }
};
const handleReset = () => {
     setCellValues(initialCells);
     setCurrentUser('X');
     setWinner(null);
    };

    return (
        <>
            <div className='board'>
                {cellValues.map((value, index) => (
                    <div
                        className={`cells ${winner === value ? 'winner' : ''}`}
                        key={`cell-${index}`}
                        onClick={() => handleClick(index)}
                    >
                        {value}
                    </div>
                ))}
            </div>
            {winner && <p className='winner-message'>¡Ganador: {winner}!</p>}
            <br />
            <button className='reset' onClick={handleReset}>Reiniciar</button>
        </>
    );
};