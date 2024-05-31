/* eslint-disable react/prop-types */
import { useState } from "react";
import confetti from "canvas-confetti"
const TURNS = {
  X:'x',
  O:'o'
}


const Square = ({children,isSelected, updateBoard,index})=>{
 const className = `square ${isSelected? 'is-selected' : ''}`

const handleClick = () =>{
  updateBoard(index)
}
 
 return (
  <div onClick={handleClick} className={className}>
    {children}
  </div>
 ) 
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [0,4,8],
  [2,4,6]

]



function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  const [turn, setTurn] = useState(TURNS.X)
  // null es que no hay ganador y false es empate
  const [winner, setWinner] = useState(null) 
  const checkWinner =(boardToCheck)=>{
    for(const combo of WINNER_COMBOS){
      const [a,b,c]=combo;
      if(boardToCheck[a]&& boardToCheck[a] === boardToCheck[b] && boardToCheck[a]===boardToCheck[c] ){
        return boardToCheck[a]
      }
    }
    return null
  }
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
    const newWinner = checkWinner(newBoard)
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
  {
    winner!=null && (
      <section className="winner">
        <div className="text">
      <h2>
        {
          winner === false ? 'Empate' : 'Gano'
        }
      </h2>
      <header className="win">
        {winner && <Square>{winner}</Square>}
        
      </header>
      <footer>
        <button onClick={resetGame}>Empezar de nuevo</button>
      </footer>
        </div>
      </section>
    )
  }
</section>
</main>
)
}

export default App
