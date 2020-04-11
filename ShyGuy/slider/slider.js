function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}
var tiles = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
var shuffled = false;
var solved = false;
var panels = [49,50,49,53,53,52,54,61,40,58,64,69,63,67];
var remaining = 2;
var solutionTimer;

function swapTilesInt(row1, col1, row2, col2)
{
    swapTiles("cell" + row1 + col1, "cell" + row2 + col2);
    var temp = tiles[row1-1][col1-1];
    tiles[row1-1][col1-1] = tiles[row2-1][col2-1];
    tiles[row2-1][col2-1] = temp;

    if(!shuffled)
        return;

    for(var i = 0; i < 15; i++)
    {
        if(tiles[Math.floor(i/4)][i%4] > tiles[Math.floor((i+1)/4)][(i+1)%4])
        {
            return;
        }
    }

    if(!solved)
    {
        document.getElementById("cell44").className = "tileComplete";
        var element = document.getElementById("result");
        element.innerText = processPanel();
        solved = true;
    }
}

function shuffle() {
    for(var i = 0; i < 2000; i++)
    {
        clickTile(Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 4 + 1));
    }
    shuffled = true;
}

function processPanel()
{
    var ret = "Time of death: ";
    for(var i = 0; i < panels.length; i++)
    {
        ret += String.fromCharCode(panels[i] - i);
    }
    return ret;
}

function onToggleBtnClicked()
{
    var element = document.getElementById("previewCol");
    if(!element.style.display)
    {
        element.style.display = "none";
        document.getElementById("puzzleCol").style.display = "";
        document.getElementById("toggleBtn").innerText = "Show solution (" + remaining + " remaining)";
    }
    else
    {
        if(remaining)
        {
            document.getElementById("toggleBtn").disabled = true;
            document.getElementById("toggleBtn").innerText = "Show solution (" + --remaining + " remaining)";
            element.style.display = "";
            document.getElementById("puzzleCol").style.display = "none";
            solutionTimer = setInterval(() => {
                clearInterval(solutionTimer);
                document.getElementById("previewCol").style.display = "none";
                document.getElementById("puzzleCol").style.display = "";
                document.getElementById("toggleBtn").disabled = false;
            }, 3000);
        }
    }
}

function clickTile(row, column) {
    var cell = document.getElementById("cell" + row + column);
    var tile = cell.className;
    if (tile != "tile16") {
        //Checking if white tile on the right
        if (column < 4) {
            if (document.getElementById("cell" + row + (column + 1)).className == "tile16") {
                swapTilesInt(row, column, row, (column + 1));
                return;
            }
        }
        //Checking if white tile on the left
        if (column > 1) {
            if (document.getElementById("cell" + row + (column - 1)).className == "tile16") {
                swapTilesInt(row, column, row, (column - 1));
                return;
            }
        }
        //Checking if white tile is above
        if (row > 1) {
            if (document.getElementById("cell" + (row - 1) + column).className == "tile16") {
                swapTilesInt(row, column, (row - 1), column);
                return;
            }
        }
        //Checking if white tile is below
        if (row < 4) {
            if (document.getElementById("cell" + (row + 1) + column).className == "tile16") {
                swapTilesInt(row, column, (row + 1), column);
                return;
            }
        }
    }

}