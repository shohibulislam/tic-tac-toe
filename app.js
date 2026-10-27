const boxEls = document.querySelectorAll('.boxes');
const newGameEl = document.getElementById("newGame-btn");
const instructionEl = document.getElementById("instructions");

const winnerPtrn = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let turnZero = true, gameStart = false, noWinner = true;
boxEls.forEach(box => {
    box.addEventListener('click', () => {
        if(turnZero){
            box.innerText = 'O';
            turnZero = false;
        }
        else{
            box.innerText = 'X';
            turnZero = true;
        }
        box.disabled = true;

        checkWinner();
    })
});

const checkWinner = () => {
    for(let ptrn of winnerPtrn){
        if(boxEls[ptrn[0]].innerText != '' && boxEls[ptrn[1]].innerText != '' && boxEls[ptrn[2]].innerText != ''){
            if(boxEls[ptrn[0]].innerText === boxEls[ptrn[1]].innerText && boxEls[ptrn[1]].innerText === boxEls[ptrn[2]].innerText){
                showWinner(boxEls[ptrn[0]].innerText);
                noWinner = false;

                ptrn.forEach(index => {
                    boxEls[index].style.backgroundColor = "lightgreen";
                });
                return;
            }
        }
    }
    checkTie();
};

const showWinner = (winner) => {
    if(winner == 'O'){
        instructionEl.innerText = `WINNER IS PLAYER 1 (O).`;
    }
    else{
        instructionEl.innerText = `WINNER IS PLAYER 2 (X).`;
    }
    instructionEl.classList.remove("hidden");
    disableBoxes();
}

const checkTie = () => {
    let full = true;
    for(let box of boxEls){
        if(box.innerText === ''){
            full = false;
            break;
        }
    }
    if(noWinner && full){
        boxEls.forEach(box => {
            box.style.backgroundColor = "lightcoral";
        });
        instructionEl.innerText = `ITS A TIE, START A NEW GAME.`;
        instructionEl.classList.remove("hidden");
    }
}

const disableBoxes = () => {
    for(let box of boxEls){
        box.disabled = true;
    }
}

newGameEl.addEventListener('click' , () => {
    boxEls.forEach(box => {
        box.textContent = '';
        box.disabled = false;
        box.style.backgroundColor = "white";
    });
    turnZero = true;
    noWinner = true;



    setTimeout(() => {
        instructionEl.classList.add("hidden");
    }, 1000);
});
