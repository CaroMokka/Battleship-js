const gamesBoardContainer = document.querySelector("#gamesboard-container");
const optionContainer = document.querySelector(".option-container");
const flipButton = document.querySelector("#flip-button");

//Option choosing
let angle = 0;
function flip() {
  const optionShips = Array.from(optionContainer.children);
  // if (angle === 0) {
  //     angle = 90
  // } else {
  //     angle = 0
  // }
  angle = angle === 0 ? 90 : 0;
  optionShips.forEach(
    (optionShip) => (optionShip.style.transform = `rotate(${angle}deg)`)
  );
}
flipButton.addEventListener("click", flip);

//creating Boards
const width = 10;

function createBoard(color, user) {
  const gameBoardContainer = document.createElement("div");
  gameBoardContainer.classList.add("game-board");
  gameBoardContainer.style.backgroundColor = color;
  gameBoardContainer.id = user;

  gamesBoardContainer.append(gameBoardContainer);

  for (let i = 0; i < width * width; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.id = i;
    gameBoardContainer.append(block);
  }
}

createBoard("yellow", "player");
createBoard("pink", "computer");

//creating ships
class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
}
const destroyer = new Ship("destroyer", 2);
const submarine = new Ship("submarine", 3);
const cruiser = new Ship("cruiser", 3);
const battleship = new Ship("battleship", 4);
const carrier = new Ship("carrier", 5);

const ships = [destroyer, submarine, cruiser, battleship, carrier];
console.log(ships);

//Add ships aleatory in computer board
function addShipPiece(ship) {
  const allBoardBlocks = document.querySelectorAll("#computer div"); //obtengo el tablero de divs de computer
  const randomBoolean = Math.random() > 0.5; //con esta condicion dice si es true o false
  const isHorizontal = randomBoolean;
  const randomStarIndex = Math.floor(Math.random() * width * width);
  console.log(randomStarIndex);

  //repasar esta logica de validaciones - estas valouidacion permite presionar el lugar del barco dentro  del campo y que no se desborden los barcos
  let valideStart = isHorizontal
    ? randomStarIndex <= width * width - ship.length
      ? randomStarIndex
      : width * width - ship.length
    : //hanlde vertical
    randomStarIndex <= width * width - width * ship.length
    ? randomStarIndex
    : randomStarIndex - ship.length * width + width;

  let shipBlocks = [];
  console.log(shipBlocks);

  for (let i = 0; i < ship.length; i++) {
    if (isHorizontal) {
      shipBlocks.push(allBoardBlocks[Number(valideStart) + i]);
    } else {
      shipBlocks.push(allBoardBlocks[Number(valideStart) + i * width]);
    }
  }

  let valid;
//metodo every recorre cada elemento revisando si se cumple la condicion, si la condicion se cumple en todos los elementos entonces retorna TRUE si no 
//es FALSE
  if (isHorizontal) {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid =
          shipBlocks[0].id % width !==
          width - (shipBlocks.length - (index + 1)))
    );
  } else {
    shipBlocks.every(
      (_shipBlock, index) =>
        (valid = shipBlocks[0].id < 90 + (width * index + 1))
    );
  }

  const notTaken = shipBlocks.every((shipBlock) => !shipBlock.classList.contains('taken'))

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
      addShipPiece(ship)
  }

  console.log(shipBlocks);
}

ships.forEach((ship) => addShipPiece(ship));
