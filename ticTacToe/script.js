const turnSound = new Audio("turn.wav");
const gameOverSound = new Audio("gameOver.wav");

const boxes = document.getElementsByClassName("box");

let initialTurn = "X";
let turn = "X";
const xTurn = document.getElementById("X-turn");
const oTurn = document.getElementById("O-turn");
const updateTurnUI = () => {
    if(turn === "X"){
        xTurn.classList.add("active");
        oTurn.classList.remove("active");
    }
    else{
        oTurn.classList.add("active");
        xTurn.classList.remove("active");
    }
};



let xWinCnt = 0;
let oWinCnt = 0;
let totalCnt = 0;
let drawCnt = 0;
let filledBoxCnt = 0;
let isGameOver = false;
const xWin = document.getElementById("X-win");
const oWin = document.getElementById("O-win");
const total = document.getElementById("total");
const draw = document.getElementById("draw");
document.getElementById("reset-game").addEventListener("click",()=>{
    Array.from(boxes).forEach(element => {
        let boxText = element.querySelector(".boxText");
        boxText.innerText = "";
        boxText.classList.remove("X-color", "O-color");
        document.querySelectorAll(".info").forEach(el => el.classList.remove("blink"));
    });
    turn = initialTurn;
    filledBoxCnt = 0;
    isGameOver = false;
    updateTurnUI();
});


document.getElementById("reset-score").addEventListener("click",() => {
    document.querySelectorAll(".info").forEach(el => el.classList.remove("blink"));
    xWinCnt = oWinCnt = totalCnt = drawCnt = 0;
    xWin.innerText = xWinCnt;
    oWin.innerText = oWinCnt;
    total.innerText = totalCnt;
    draw.innerText = drawCnt;
});



const switchTurn = () => {
    return turn === "X" ? "O" : "X";
};

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const isWin = () => {
    for(let pattern of winPatterns){
        let [a,b,c] = pattern;
        let val1 = boxes[a].querySelector(".boxText").innerText;
        let val2 = boxes[b].querySelector(".boxText").innerText;
        let val3 = boxes[c].querySelector(".boxText").innerText;
        if(val1 && val1 === val2 && val2 === val3){
            return val1;
        } 
    }
    return null;
};

Array.from(boxes).forEach( element =>{
    let boxText = element.querySelector(".boxText");
    element.addEventListener("click",()=>{
        if(!isGameOver && boxText.innerText === ""){
            filledBoxCnt++;
            boxText.innerText = turn;
            if(turn === "X"){
                boxText.classList.add("X-color");
            }
            else{
                boxText.classList.add("O-color");
            }
            turnSound.currentTime = 0;
            turnSound.play();
            const win = isWin();
            if(win == null){
                turn = switchTurn();
                if(filledBoxCnt == 9){
                    initialTurn = turn;
                    draw.innerText = ++drawCnt;
                    total.innerText = ++totalCnt;
                    isGameOver = true;
                    draw.parentElement.classList.add("blink");
                }
            }
            else{
                total.innerText = ++totalCnt;
                isGameOver = true;
                if(win === "X"){
                    xWin.innerText = ++xWinCnt;
                    xWin.parentElement.classList.add("blink");
                    initialTurn = "X";
                }
                else{
                    oWin.innerText = ++oWinCnt;
                    initialTurn = "O";
                    oWin.parentElement.classList.add("blink");
                }
                turn = initialTurn;
            }
            if(isGameOver){
                gameOverSound.currentTime = 0;
                gameOverSound.play();
            }
            updateTurnUI();
        }
    });
});