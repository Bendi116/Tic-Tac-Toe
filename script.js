//IIFE facories
const gameBoard = (function(){
    const gameBoardArray = [["","Q",""],["","M",""],["Q","",""]];
    const dispalyBoard = () => {for (let i = 0; i < gameBoardArray.length; i++) { console.log(gameBoardArray[i])}};
    const tileIsFree = (pos) => {return gameBoardArray[pos[0]][pos[1]] === ""}
    const setTile = (symbol, pos) => {gameBoardArray[pos[0]][pos[1]] = symbol}
    const notFull = () => {
        let isTrue = false;
        gameBoardArray.forEach(element=>{element.forEach(e=>{if(e === ""){isTrue = true;}})});return isTrue;}
    
    return {dispalyBoard, setTile, gameBoardArray, notFull, tileIsFree};
})();

const gameController= (function(){
    let currentPlayer = "";
    let winCondition = false;
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
    const logCurrTurn = () => {console.log(`${currentPlayer.name} It's your Turn.`)}
    const checkWin = () => { if(checkRow() || checkCol() || checkDiagnal()){winCondition = true;}}

    const play = () =>{
        const Player1 = createPlayer()
        const Player2 = createPlayer()
        currentPlayer = Player2

        const changePlayer = () => {currentPlayer = currentPlayer === Player1 ? Player2 : Player1}
        let row;
        let col;
        while (gameBoard.notFull() && !winCondition) {
            changePlayer()
            logCurrTurn();
            
            do{
                row = prompt(`${currentPlayer.name} Which row you want to place your symbol?`)
                col = prompt(`${currentPlayer.name} Which col you want to place your symbol?`)
            }while(!gameBoard.tileIsFree([row,col]))
            

            gameBoard.setTile(currentPlayer.symbol, [row,col])
            gameBoard.dispalyBoard()

            checkWin()
            
        }
        if(winCondition){alert(`Game ended. ${currentPlayer.name} win the game`)}
        else{alert("The game is draw.")}
        
    }
    return {play};
})();

const displayGame = (function(){
    const btns = document.querySelectorAll("button")
    const getCoord = (str) => {
        let coord = str.split("-")
        coord = coord.map(Number)
        return coord;
    }


    const displayBoardOnWindow = () =>{
        btns.forEach(element => {
            let coord = getCoord(element.className);
            element.innerText = gameBoard.gameBoardArray[coord[0]][coord[1]];
            
        });
    }
    return{displayBoardOnWindow}

})();

//factories
function createPlayer(){
    let name = prompt("Player Name:")
    let symbol = prompt(`${name} symbol?`)
    return{name,symbol};
};

displayGame.displayBoardOnWindow()