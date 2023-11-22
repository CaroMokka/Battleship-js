const gamesBoardContainer = document.querySelector('#gamesboard-container')
const optionContainer = document.querySelector('.option-container')
const flipButton = document.querySelector('#flip-button')

//Option choosing
let angle = 0
function flip() {
    const optionShips = Array.from(optionContainer.children)
    // if (angle === 0) {
    //     angle = 90
    // } else {
    //     angle = 0
    // }
    angle = angle === 0 ? 90 : 0
    optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`)
}
flipButton.addEventListener('click', flip)

//creating Boards
const width = 10

function createBoard(color, user){
    const gameBoardContainer = document.createElement('div')
    gameBoardContainer.classList.add('game-board')
    gameBoardContainer.style.backgroundColor = color
    gameBoardContainer.id = user

    gamesBoardContainer.append(gameBoardContainer)

    for (let i = 0; i < width * width; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.id = i
        gameBoardContainer.append(block)
    }
}

createBoard('yellow', 'player')
createBoard('pink', 'computer')

//creating ships
class Ship {
    constructor(name, length) {
        this.name = name
        this.length = length
    }
}
const destroyer = new Ship ('destroyer', 2)
const submarine = new Ship ('submarine', 3)
const cruiser = new Ship ('cruiser', 3)
const battleship = new Ship ('battleship', 4)
const carrier = new Ship ('carrier', 5)

const ships = [destroyer, submarine, cruiser, battleship, carrier]
console.log(ships)

function addShipPiece(ship) {
    const allBoardBlocks = document.querySelectorAll('#computer div')//obtengo el tablero de divs de computer
    const randomBoolean = Math.random() > 0.5
    const isHorizontal = true
    const randomStarIndex = Math.floor(Math.random() * width * width)
    console.log(randomStarIndex)

    for (let i = 0; i < ship.length; i++) {
        if(isHorizontal){
            console.log(allBoardBlocks[Number(randomStarIndex) + i])
        }
    }

}

addShipPiece(destroyer)
