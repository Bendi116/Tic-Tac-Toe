//IIFE facories
const gameBoard = (function(){
    const gameBoardArray = [["Q","Q","Q"],["","",""],["","",""]];
    const dispalyBoard = () => {for (let i = 0; i < gameBoardArray.length; i++) { console.log(gameBoardArray[i])}};
    const setTile = (symbol, pos) => {gameBoardArray[pos[0]][pos[1]] = symbol}
    const notFull = () => {
        for (let i = 0; i < gameBoardArray.length; i++) 
        { for (let j = 0; j < gameBoardArray.length; j++) {
            if (gameBoardArray[i][j] ===""){return true;}}
        }
            return false;
    }
    return {dispalyBoard, setTile, gameBoardArray};
})();

const gameController= (function(){
    let currentTurn = "player1"
    let hasWin = false;

    //inner function
    const checkRow = () =>{
        gameBoard.gameBoardArray.forEach(element => {
            if(element[0] === element[1] === element[2] && element[0] !== ""){return true;}
        });
        return false;
    }
    const checkCol = () => {
        gameBoard.gameBoardArray.forEach((element, index) => {
            if(gameBoard.gameBoardArray[index][0] === gameBoard.gameBoardArray[index][1] === gameBoard.gameBoardArray[index][2] && gameBoard.gameBoardArray[index][0] !== ""){return true}
        })
        return false
    }
    const checkDiagnal = () =>{
        if(gameBoard.gameBoardArray[0][0] === gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[2][2] && gameBoard.gameBoardArray !== ""){return true;}
        else if(gameBoard.gameBoardArray[0][2] === gameBoard.gameBoardArray[1][1] === gameBoard.gameBoardArray[2][0] && gameBoard.gameBoardArray !== ""){return true;}
        else{return false}
    }
    


    const changeTurn = () => {currentTurn = currentTurn === "player1" ? "player2" : "player1"}
    const logCurrTurn = () => {console.log(`${changeTurn} It's your Turn.`)}

    
    const checkWin = () => { return checkRow() || checkCol() || checkDiagnal()}
    return {checkWin};
})();

//factories
function createPlayer(symbol){
    let ownSymbol = symbol;
    const chooseTile = (pos) => {gameBoard.setTile(ownSymbol,pos)};
    return{chooseTile};
};



// gameBoard.dispalyBoard()
// player1 = createPlayer("X");
// player2 = createPlayer("O");
// player1.chooseTile([1,2])
// player2.chooseTile([0,1])
// gameBoard.dispalyBoard()

gameBoard.dispalyBoard()
console.log(gameController.checkWin())
console.log((1 === 1) === 1)