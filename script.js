//IIFE facories
const gameBoard = (function(){
    const gameBoardArray = [["","",""],["","",""],["","",""]];
    const dispalyBoard = () => {for (let i = 0; i < gameBoardArray.length; i++) { console.log(gameBoardArray[i])}};
    const setTile = (symbol, pos) => {gameBoardArray[pos[0]][pos[1]] = symbol}
    const notFull = () => {gameBoardArray.forEach(element=>{element.forEach(e=>{if(e === ""){return true;}})});return false;}
    
    return {dispalyBoard, setTile, gameBoardArray, notFull};
})();

const gameController= (function(){
    let currentTurn = "player1"

    //inner function[]
    const compare = (arg1,arg2,arg3) => {return (arg1===arg2)&&(arg1==arg3)}
    const checkRow = () =>{            
        let win = false;
        gameBoard.gameBoardArray.forEach(element => {
            if(compare(element[0],element[1],element[2]) && element[0] !== ""){win = true;}
        });
        return win;
    }
    const checkCol = () => {
        let win = false
        gameBoard.gameBoardArray.forEach((element, index) => {
            if(compare(gameBoard.gameBoardArray[0][index],gameBoard.gameBoardArray[1][index],gameBoard.gameBoardArray[2][index]) && gameBoard.gameBoardArray[0][index] !== ""){win = true}
        })
        return win;
    }
    const checkDiagnal = () =>{
        if( compare(gameBoard.gameBoardArray[0][0],gameBoard.gameBoardArray[1][1],gameBoard.gameBoardArray[2][2]) && gameBoard.gameBoardArray[0][0] !== ""){return true;}
        else if(compare(gameBoard.gameBoardArray[0][2],gameBoard.gameBoardArray[1][1],gameBoard.gameBoardArray[2][0])&& gameBoard.gameBoardArray[0][2] !== ""){return true;}
        else{return false}
    }

    const changeTurn = () => {currentTurn = currentTurn === "player1" ? "player2" : "player1"}
    const logCurrTurn = () => {console.log(`${changeTurn} It's your Turn.`)}
    const checkWin = () => { return  checkRow() || checkCol() || checkDiagnal()}
    return {checkWin, logCurrTurn, changeTurn};
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

let name = prompt("Whats your name ?")
console.log("Name")
