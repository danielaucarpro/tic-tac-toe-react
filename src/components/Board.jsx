import { useEffect, useState } from "react";
import Square from "./Square";

const Board = () => {

    // Create an array with 9 prefilled values (0)
    const [boardSize, setBoardSize] = useState(new Array(9).fill(0));
    const [player, setPlayer] = useState(1);
    const [playerOneScore, setPlayerOneScore] = useState(0);
    const [playerTwoScore, setPlayerTwoScore] = useState(0);
    const [roundCountDown, setRoundCountDown] = useState(30);
    const [winnerPlayer, setWinnerPlayer] = useState('');

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // Fire this function whenever there was a change in boardsize
    useEffect(() => {

        for (let item of winningCombinations) {
            if (boardSize[item[0]] === 1 && boardSize[item[1]] === 1 && boardSize[item[2]] === 1) {
                alert("First person have won");
                setPlayerOneScore(playerOneScore + 1);
                resetGame();
            } else if (boardSize[item[0]] === 2 && boardSize[item[1]] === 2 && boardSize[item[2]] === 2) {
                alert("Second person have won");
                setPlayerTwoScore(playerTwoScore + 1);
                resetGame();
            }

            // Assignement for today 

            // 1. Change background color of the winning person

            // 4. If the game draws, you have to say alert("Game oVer") and then restart the game.
            // 5. If the user did not respond for 30 seconds, you have to mark any random position and give control to the second player

            // This is an assignment for tommorrow , We will make a connect four game
        }

    }, [boardSize])

    const handleClick = (position) => {
        if (boardSize[position] === 0) {
            const tempSize = [...boardSize];
            setRoundCountDown(30);
            // actually changing daata inside the boardSize [0,0,0,0,0,0];
            // We will change data inside array to either 1 or 2
            tempSize[position] = player;
            setPlayer(player === 1 ? 2 : 1);
            setBoardSize(tempSize);
        } else {
            alert("Please click on empty boxes");
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setRoundCountDown(roundCountDown - 1);
            if(roundCountDown === 0){
                setRoundCountDown(30);
                playRandom();
            }
        }, 1000)
    }, [roundCountDown])

    const playRandom = () => {
        const randomIndex = Math.floor(Math.random() * (9 - 0 + 1) + 0);
        handleClick(randomIndex);
    }

    // useEffect(() => {
    //     if (roundCountDown <= 0) {
    //         // setRoundCountDown(0);
    //         setRoundCountDown(30);
    //         const randomIndex = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    //         handleClick(randomIndex);
    //     }
    // }, [roundCountDown <= 0]);

    const resetGame = () => {
        setBoardSize(new Array(9).fill(0));
    }

    const resetScore = () => {
        setPlayerOneScore(0);
        setPlayerTwoScore(0);
        alert('Score Reseted');
    }

    return (
        <>
            <div className="board">
                {
                    boardSize.map((data, index) => {
                        return <Square handleClick={handleClick} mark={data} position={index} whoWon={winnerPlayer} />
                    })
                }
                <button onClick={resetGame}>Reset Game</button>
                <p>Turn: {`${roundCountDown < 0 ? "" : roundCountDown}`} sec</p>
            </div>
            <div className="score-board">
                <h1>Score board</h1>
                <p>Player 1: {`${playerOneScore}`}</p>
                <p>Player 2: {`${playerTwoScore}`}</p>
                <button onClick={resetScore}>Reset Score</button>
            </div>
        </>
    )
}


export default Board;