//HTML Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');

//Game Variables
let gameIsLive = true;
let xIsNext = true;
let winner = null;
let turn = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

//Functions
function isWinner()
{
      winningPatterns.forEach(winningCombos => 
        {
            let cell1 = winningCombos[0];
            let cell2 = winningCombos[1];
            let cell3 = winningCombos[2];

            if (cellDivs[cell1].classList[2] && cellDivs[cell1].classList[2] === cellDivs[cell2].classList[2] && cellDivs[cell1].classList[2] === cellDivs[cell3].classList[2])
            {
                endGame(cell1)
                cellDivs[cell1].style.backgroundColor = "#e6496b";
                cellDivs[cell2].style.backgroundColor = "#e6496b";
                cellDivs[cell3].style.backgroundColor = "#e6496b";
            }
        })
}

function endGame(num)
{
    gameIsLive = false;
    winner = cellDivs[num].classList[2];
    statusDiv.innerHTML = `${winner} has won!`;
}

function Tie()
{
    gameIsLive = false;
    statusDiv.innerHTML = 'Game is Tie!';
}

//Event Handlers
const handleReset = (e) =>
{
    location.reload();
}

const handleCellClick = (e) =>
{
    if (gameIsLive == false)
        return;

    const location = e.target.classList[1];
    const classList = e.target.classList;

    if (classList[2] === 'x' || classList[2] === 'o')
    {
        return;
    }

    if (xIsNext)
    {
        classList.add('x');
        xIsNext = !xIsNext
        statusDiv.innerHTML = "○'s next";
    }
    else
    {
        classList.add('o');
        xIsNext = !xIsNext
        statusDiv.innerHTML = "×'s next";
    }
    turn++;
    console.log(turn);
    if (turn > 8)
    {
        Tie();
    }
    isWinner();
}

//Event Listeners
resetDiv.addEventListener('click', handleReset);

let counter = 0;
for (const cell of cellDivs)
{
    cell.addEventListener('click', handleCellClick)
    cell.classList.add(counter);
    counter++;
}