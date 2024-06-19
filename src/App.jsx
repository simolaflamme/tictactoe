import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.jsx";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function App() {
  const [player,setPlayer]=useState({
    x:'player 1',
    O:'player 2'
  })
  //const [activePlayer,setActivePlayer]=useState('X');


  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard =[ ...initialGameBoard.map((array=>[...array]))];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
       firstSquareSymbol === secondSquareSymbol &&
        firstSquareSymbol === thirdSquareSymbol){

      winner=player[firstSquareSymbol

      ];
    }
}
const  hasDraw=gameTurns.length===9 &&!winner;
  function handleSelectSquare(rowIndex, colIndex) {

    //setActivePlayer((curActivePlayer) => curActivePlayer ==='X'?'O':'X');
    setGameTurns((preTurns) => {
      const currentPlayer = deriveActivePlayer(preTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...preTurns,
      ];
      return updatedTurns;
    });
  }
  function handleRestart(){
    setGameTurns([]);
  }
  function handlePlayerNameChange(symbol,newName){

    setPlayer(prevPlayer=>{
      return { ...prevPlayer,
         [symbol]:newName};
    })
  }
  return (
    <main>
      <div id="game-container">

        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'} onChangeNameChange={handlePlayerNameChange} />
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'} onChangeNameChange={handlePlayerNameChange} />

        </ol>
        {(hasDraw||winner) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />

      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
