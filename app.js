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

let notDropped

function getValidity(allBoardBlocks, isHorizontal, startIndex, ship){
  //repasar esta logica de validaciones - estas valouidacion permite presionar el lugar del barco dentro  del campo y que no se desborden los barcos
  let valideStart = isHorizontal
    ? startIndex <= width * width - ship.length
      ? startIndex
      : width * width - ship.length
    : //hanlde vertical
    startIndex <= width * width - width * ship.length
    ? startIndex
    : startIndex - ship.length * width + width;

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

  const notTaken = shipBlocks.every(
    (shipBlock) => !shipBlock.classList.contains("taken")
  );

  return { shipBlocks, valid, notTaken }
}

//Add ships aleatory in computer board
function addShipPiece(user, ship, startId) {
  const allBoardBlocks = document.querySelectorAll(`#${user} div`); //obtengo el tablero de divs de computer o player
  const randomBoolean = Math.random() > 0.5; //con esta condicion dice si es true o false
  const isHorizontal = user === 'player' ? angle === 0 : randomBoolean;
  const randomStarIndex = Math.floor(Math.random() * width * width);
  console.log(randomStarIndex);

  let startIndex = startId ? startId : randomStarIndex

  const { shipBlocks, valid, notTaken } = getValidity(allBoardBlocks, isHorizontal, startIndex, ship)

  if (valid && notTaken) {
    shipBlocks.forEach((shipBlock) => {
      shipBlock.classList.add(ship.name);
      shipBlock.classList.add("taken");
    });
  } else {
    if(user === 'computer') addShipPiece(ship);
    if(user === 'player') notDropped = true
  }

  console.log(shipBlocks);
}

ships.forEach( ship => addShipPiece('computer',ship));

//drag player ships

let draggedShip

const optionShips = Array.from(optionContainer.children);
optionShips.forEach((optionShip) =>
  optionShip.addEventListener("dragstart", dragStart)
);

const allPlayerBlocks = document.querySelectorAll('#player div')
allPlayerBlocks.forEach(playerBlock => {
  playerBlock.addEventListener('dragover', dragOver)
  playerBlock.addEventListener('drop', dropShip)
})

function dragStart(e) {
  notDropped = false
  draggedShip = e.target
}
function dragOver(e){
  e.preventDefault()
  const ship = ships[draggedShip.id]
  highlightArea(e.target.id, ship)
}
function dropShip(e){
  const startId = e.target.id
  const ship = ships[draggedShip.id]
  if(!notDropped) draggedShip.remove()

  addShipPiece('player', ship, startId)
}

//add highlight
function highlightArea(startIndex, ship){
  const allBoardBlocks =  document.querySelectorAll('#player div')
  let isHorizontal = angle === 0

  const { shipBlocks, valid, notTaken } = getValidity( allBoardBlocks, isHorizontal, startIndex, ship )

  if(valid && notTaken){
    shipBlocks.forEach( shipBlock => { 
      shipBlock.classList.add('hover')
      setTimeout(() => shipBlock.classList.remove('hover'), 500)
    
    })
  }


}