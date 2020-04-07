function swapTiles(cell1, cell2) {
    var temp = document.getElementById(cell1).className;
    document.getElementById(cell1).className = document.getElementById(cell2).className;
    document.getElementById(cell2).className = temp;
}
var tiles = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
var shuffled = false;
var solved = false;

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
        var element = document.createElement("div");
        element.innerHTML = "<center>Solved! The password is " + (Math.pow(i,2) - i * 8 + 1 - 35) + ".</center>";
        document.body.appendChild(element);
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