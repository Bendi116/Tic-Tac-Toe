//IIFE facories
const gameBoard = (function(){
    const gameBoardArray = [["","",""],["","",""],["","",""]];
    const dispalyBoard = () => {for (let i = 0; i < gameBoardArray.length; i++) { console.log(gameBoardArray[i])}};
    const tileIsFree = (pos) => {return gameBoardArray[pos[0]][pos[1]] === ""}
    const setTile = (symbol, pos) => {gameBoardArray[pos[0]][pos[1]] = symbol}
    const notFull = () => {
        let isTrue = false;
        gameBoardArray.forEach(element=>{element.forEach(e=>{if(e === ""){isTrue = true;}})});return isTrue;}
    const clearBoard = () => {
        for (let i = 0; i < gameBoardArray.length; i++) {
            for (let j = 0; j < gameBoardArray[i].length; j++) {
                gameBoardArray[i][j] = "";
            }
            
        }
    }
    
    return {dispalyBoard, setTile, gameBoardArray, notFull, tileIsFree, clearBoard};
})();

const gameController= (function(){
    let gameEnable = false;
    const gameInfoDiv = document.querySelector(".game-info")
    const startBtn = document.querySelector(".start-restart")
    
    const startGame = () => {
        gameBoard.clearBoard()
        console.log("The game have started.")
        gameEnable = true;
        gameInfoDiv.innerText = "Game has started!"
        displayGame.displayBoardOnWindow()
        
    }
    startBtn.addEventListener("click", startGame)

    const Player1 = createPlayer("Harry","O")
    const Player2 = createPlayer("Joe","X")
    let currentPlayer = Player2
    gameInfoDiv.innerText = currentPlayer.name
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
    const checkWin = () => { 
        if(checkRow() || checkCol() || checkDiagnal()){
            gameEnable = false;
            gameInfoDiv.innerText = currentPlayer.name + " has won the game!"
        }}

    const changePlayer = () => {
        if(gameEnable){
            currentPlayer = currentPlayer === Player1 ? Player2 : Player1
            gameInfoDiv.innerText = currentPlayer.name
        }
        }
    const getGameEnable = () => { return gameEnable}
    const getPlayerSymbol = () => {return currentPlayer.symbol}
        
       
    return {changePlayer, checkWin, getPlayerSymbol, getGameEnable};
})();

const displayGame = (function(){
    const btns = document.querySelectorAll(".tile")

    const getCoord = (str) => {
        let coord = str.split(" ")
        coord = coord[0].split("-")
        coord = coord.map(Number)
        return coord;
    }
    const getUserInput = (e) => {
        if(gameController.getGameEnable()){
            let inputCoord = getCoord(e.target.className)
        if(gameBoard.tileIsFree([inputCoord[0], inputCoord[1]])){
            gameBoard.setTile(gameController.getPlayerSymbol(), [inputCoord[0], inputCoord[1]])
        }
        gameController.checkWin()
        gameController.changePlayer()
        displayBoardOnWindow()    
        }
        
    }
    btns.forEach(element => {
        element.addEventListener("click", getUserInput)
    }); 
    
    const displayBoardOnWindow = () =>{
        btns.forEach(element => {
            let outputCoord = getCoord(element.className);
            element.innerText = gameBoard.gameBoardArray[outputCoord[0]][outputCoord[1]];
            
        });
    }
    return{displayBoardOnWindow}

})();

//factories
function createPlayer(name ,symbol){
    return{name,symbol};
};

displayGame.displayBoardOnWindow()