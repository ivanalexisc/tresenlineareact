/* eslint-disable react/prop-types */
import { useState } from "react";
import confetti from "canvas-confetti"
import { Square } from "./components/Square";
import {TURNS} from "./constants";
import { checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";



function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador y false es empate
  const [winner, setWinner] = useState(null) 


 

// funcion para resetear el juego que vacia el tablero
  const resetGame = ()=>{
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null)
  }
  const checkEndGame = (newBoard)=>{
    return newBoard.every((square)=> square != null)
  }

  const updateBoard = (index)=>{
    if (board[index]|| winner) return // con este if no actualizo nada si ya tiene algo 
    // si tiene algo actualizamos
    const newBoard = [...board]
    newBoard[index]=turn
    setBoard(newBoard)
    // cambiar el turno 
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    //revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if  (checkEndGame(newBoard)){
      setWinner(false)
    }
  }
  

return (
<main className='board'>
<h1>TIC TAC TOE</h1>
<button onClick={resetGame}>Resetear juego</button>
<section className="game">
{
  board.map((square,index)=>{
    return(
      <Square
        key={index}
        index={index}
        updateBoard={updateBoard}
      >
        {square}
      </Square>
    )
  })
}
</section>
<section className="turn">
<Square isSelected={turn === TURNS.X}>
{TURNS.X}
</Square>
<Square isSelected={turn === TURNS.O}>
{TURNS.O}
</Square>
</section>

<section>
<WinnerModal resetGame={resetGame} winner={winner}/>
</section>
</main>
)
}

export default App
