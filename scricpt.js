let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgamebtn = document.querySelector("#newgame");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0; 

const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const reset1 = () => {
    turnO = true;
    count = 0;
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    msgcontainer.classList.add("hide");
};

const showwinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgcontainer.classList.remove("hide");
};

const checkwinner = () => {
    for (let pattern of winpattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showwinner(pos1val);  
                return true;
            }
        }
    }
    return false;
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Prevent clicking on an already selected box
        if (box.innerText !== "") return;

        // Place the symbol ('O' or 'X') based on the turn
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        // Disable the box after selection
        box.disabled = true;
        count++;

        // Check for a winner after each move
        if (checkwinner()) return;

        // If all boxes are filled and no winner, it's a draw
        if (count === 9) {
            msg.innerText = "It's a draw!";
            msgcontainer.classList.remove("hide");
        }
    });
});

// Reset button functionality
reset.addEventListener("click", reset1);

// New game button functionality
newgamebtn.addEventListener("click", () => {
    reset1();  // Reset the game
});
