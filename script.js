const gameInfo = document.querySelector('p')
const boxes = document.querySelectorAll('.box')
const newGameBtn = document.querySelector('.btn')


let currentPlayer;
const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let gameGrid;

function initGame() {
    currentPlayer = "X"
    gameGrid = ["","","","","","","","",""]
    gameInfo.innerText= `Current-Player - ${currentPlayer}`
    boxes.forEach((box) => {
        box.innerText = ""
        box.classList.remove('win')
        box.style.pointerEvents = "all"
    })

    
    
    console.log('value');
    newGameBtn.classList.remove("active")
}

initGame()


boxes.forEach( (box,index) => {
    box.addEventListener('click', () => {
        handleBoxClick(index)
    } )
} )


function handleBoxClick(index) {

    if (gameGrid[index] === "") {
        boxes[index].innerText = `${currentPlayer}`
        gameGrid[index] = currentPlayer
        boxes[index].style.pointerEvents = "none"
        swapPlayer()
        checkGameOver()
    }
    
}

function swapPlayer () {
    if (currentPlayer === "X") {
        currentPlayer = "0"
    } else {
        currentPlayer = "X"
    }

    gameInfo.innerText = `Current-Player - ${currentPlayer}`
}


function checkGameOver() {
    let answer;
    try {
        winningPositions.forEach( (positions) => {
            if ( (gameGrid[positions[0]] !== "" && gameGrid[positions[1]] !== "" && gameGrid[positions[2]] !== "" )
                && (gameGrid[positions[0]] === gameGrid[positions[1]] && gameGrid[positions[1]] === gameGrid[positions[2]])) {
                
                    answer = gameGrid[positions[0]]


                    boxes.forEach( (box, index) => {
                        box.style.pointerEvents = "none"
                    } )


                    gameInfo.innerText = `Winner - ${answer}`
                    newGameBtn.classList.add('active')

                    boxes[positions[0]].classList.add('win')
                    boxes[positions[1]].classList.add('win')
                    boxes[positions[2]].classList.add('win')

                    throw new Error("1 side attained");

            }
        } )
    }

    catch(e){
    }

    let emptyBoxes = 9
    for (let i = 0; i < gameGrid.length; i++) {
        if (gameGrid[i] !== "") {
            emptyBoxes--
        }


    }

    if (emptyBoxes === 0) {
        gameInfo.innerText = `It's A Tie`
        newGameBtn.classList.add('active')
    }
}

newGameBtn.addEventListener('click',initGame)