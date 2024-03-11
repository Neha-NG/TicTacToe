let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msgPara =document.querySelector("#msg");



let turnO = true;//playerX, playerO
let count = 0;  //To Track Draw


//2D Array
// let arr2 = [[0,1,2], [0,3,6], [0,4,8]];

const winPatterns =  [
    [0,1,2],
    [0,3,6], 
    [0,4,8],
    [3,4,5],
    [1,4,7],
    [2,4,6],
    [6,7,8],
    [2,5,8]
];


const resetGame = () => {              //resetting game to enable boxes
    turnO = true; 
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", ()  => {
        // console.log("box was clciked");
            
        if(turnO){                        // O - Player Turn O
            //playerO
            box.innerText = "O";
            turnO = false;
            box.classList.add("true");
            box.classList.remove("false");
            

        }else  {                        // X - Player Turn 
            //playerX
            box.innerText = "X";
            turnO = true;

            box.classList.add("false");
            box.classList.remove("true");

        }
        box.disabled = true;
        count++;


        let isWinner = checkWinner();        //check winner function
    
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });

});

const gameDraw = () => {        //showWinner function to declare Winner
    msg.innerText = `Game was a Draw , Please try Again!`;
    msgContainer.classList.remove("hide");
    disableBoxes();                   //disabled boxes once a player wins
}




const disableBoxes = () => {       //disables all boxes after winner is declared
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {        //enables all for new game
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";       //empty previous values
    }
}

const showWinner = (winner) => {        //showWinner function to declare Winner
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();                   //disabled boxes once a player wins
}


const checkWinner = () => {                //checkWinner function  traversing all values to check who is winner
    for(let pattern of winPatterns) {
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != "" && pos2Val != "" && pos3Val != ""){           //checking if all three values are filled and not epmty
                if(pos1Val === pos2Val && pos2Val === pos3Val) {           //checking if all three values are equal
                    // console.log("Winner", pos1Val);
                    showWinner(pos1Val);                //showWinner function displays winner i.e (pos1Val)
                    return true;
                }  
            }
          
     }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);