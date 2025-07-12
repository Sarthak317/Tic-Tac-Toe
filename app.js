let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let newbutton = document.querySelector(".New");
let messageconatiner = document.querySelector(".message-container");
let message = document.querySelector(".message");
let count = 0;
let theme = document.querySelector(".theme");
let computer = document.querySelector(".computer");
let isComputerMode = false;

const themechanger = () => {
    document.body.classList.toggle("dark");
};
theme.addEventListener("click", themechanger);

let turnO = true;
const winpttr = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4 ,8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    count = 0;
    turnO = true;
    isComputerMode = false;
    enableBoxes();
    messageconatiner.classList.add("hide");
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const showWinner = (winner) => {
    message.innerText = `Congratulations , Winner is Player ${winner}`;
    messageconatiner.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winpttr) {
        let [a, b, c] = pattern;
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 && val1 === val2 && val2 === val3) {
            return val1;
        }
    }
    return null;
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;

        if (!isComputerMode) {
            count++;
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            turnO = !turnO;
            let winner = checkWinner();
            if (winner) {
                showWinner(winner);
            } else if (count === 9) {
                message.innerText = `It's A Draw`;
                messageconatiner.classList.remove("hide");
                disableBoxes();
            }
        } else {
            if (!turnO) return;
            box.innerText = "O";
            box.disabled = true;
            count++;
            turnO = false;

            let winner = checkWinner();
            if (winner) {
                showWinner(winner);
                return;
            }

            if (count < 9) {
                setTimeout(() => {
                    computerMove();
                }, 300);
            } else {
                message.innerText = `It's A Draw`;
                messageconatiner.classList.remove("hide");
                disableBoxes();
            }
        }
    });
});


computer.addEventListener("click", () => {
    resetGame();
    isComputerMode = true;
});

const computerMove = () => {
    for (let pattern of winpttr) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        let countX = vals.filter(v => v === "X").length;
        let countEmpty = vals.filter(v => v === "").length;

        if (countX === 2 && countEmpty === 1) {
            let emptyIndex = pattern[vals.indexOf("")];
            boxes[emptyIndex].innerText = "X";
            boxes[emptyIndex].disabled = true;
            count++;
            turnO = true;
            checkGameAfterComputerMove();
            return;
        }
    }

    for (let pattern of winpttr) {
        let [a, b, c] = pattern;
        let vals = [boxes[a].innerText, boxes[b].innerText, boxes[c].innerText];
        let countO = vals.filter(v => v === "O").length;
        let countEmpty = vals.filter(v => v === "").length;

        if (countO === 2 && countEmpty === 1) {
            let emptyIndex = pattern[vals.indexOf("")];
            boxes[emptyIndex].innerText = "X";
            boxes[emptyIndex].disabled = true;
            count++;
            turnO = true;
            checkGameAfterComputerMove();
            return;
        }
    }

    let emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "X";
    randomBox.disabled = true;
    count++;
    turnO = true;
    checkGameAfterComputerMove();
};

const checkGameAfterComputerMove = () => {
    let winner = checkWinner();
    if (winner) {
        showWinner(winner);
    } else if (count === 9) {
        message.innerText = `It's A Draw`;
        messageconatiner.classList.remove("hide");
        disableBoxes();
    }
};

newbutton.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
