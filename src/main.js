function lose(){
	for (var i = 0; i < squares.length; i++) {
		if (squares[i].isMine) {
			squares[i].show()
		}
	}
}
const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const size = urlParams.get('size')
console.log();
var grid_x = size;
var grid_y = size;
var total_mines = 50
var current_mines = 0
var grid = [ ]
for (var i = 0; i < grid_y; i++) {
	grid.push([])
}
document.getElementById('grid').style.gridTemplateColumns = "repeat(" + grid_x + "," + 100/grid_x + "%)"
var squares = []
var x = 0
var y = 0
for (var i = 0; i < grid_y; i++) {
	// console.log(i);
	for (var j = 0; j < grid_x; j++) {
		var square = new Square(x,y, "square"+j+i)
		if (current_mines < total_mines) {
			square.setMine()
			// current_mines++

		}
		// if (square.isMine) {
		// 	current_mines++
		// }
		squares.push(square)
		grid[square.y].push(square)
		// square.element.innerHTML = square.isMine
		// if (square.y == 0) {
		// 	grid[0].push(square)
		// 	// console.log("y=0");
		// }else if (square.y == 1) {
		// 	grid[1].push(square)
		//
		// }else {
		//
		// 	grid[2].push(square)
		// }
		x++
	}
	x = 0
	y++
}
// console.log(current_mines);
function neighbors(arr, m, n) {
	// define what a neighbor is
	// let v = [[1,1]]
	// let v = [[0, 1],[1, 0],[0, -1],[-1, 0]]
	let v = [[0, 1],[1, 0],[0, -1],[-1, 0],[1,1],[-1,-1],[1,-1],[-1,1]]
	// filter edges & map
	return v.filter(([h, j]) => h + m >= 0 && h + m < arr.length && j + n >= 0 && j + n < arr[0].length)
	.map(([h, j]) => arr[h + m][j + n])

}
	// console.log(squares.length);
// console.log(grid);
for (var i = 0; i < squares.length; i++) {
	// console.log(squares[i].name);

	var neighbor_mines = neighbors(grid, squares[i].y, squares[i].x)
	// console.log(neighbor_mines);
	if (!squares[i].isMine) {
		// console.log(neighbors(grid, squares[i].y, squares[i].x))
		squares[i].neighbors = neighbors(grid, squares[i].y, squares[i].x)
		// console.log(squares[i].neighbors);
		for (var k = 0; k < neighbor_mines.length; k++) {
			// console.log(neighbor_mines[k]);
			if (neighbor_mines[k] == undefined){
				// console.log(squares[i]);
				// console.log(neighbors(grid, squares[i].y, squares[i].x))
			}
			if (neighbor_mines[k] != undefined && neighbor_mines[k].isMine ) {
				squares[i].mine_neighbors++
			}
			// console.log(squares[i].mine_neighbors);
		}

		// console.log(squares[i].mine_neighbors);
	}else {
		// console.log("is mine!");
	}
}
for (var i = 0; i < squares.length; i++) {
	if (!squares[i].isMine) {
		var content = document.createTextNode(squares[i].mine_neighbors);
		// squares[i].element.appendChild(content)
	}
}
for (var i = 0; i < squares.length; i++) {
	// window.oncontextmenu = function (){
	// var square = squares.find(square => square.element = event.target);
	// 	square.show(true)
	// 	return false;     // cancel default menu
	// }
	squares[i].element.addEventListener("click", e => {
		var this_square = squares.find(element => element.element == e.target)
		if (!this.visible) {
			this_square.show()
		}
	})
	squares[i].element.addEventListener("contextmenu", e => {
		e.preventDefault()
		var this_square = squares.find(square => square.element == e.target);
			this_square.show(true)
			// return false;
	})
}
window.addEventListener("resize", e => {
	console.log("resize");
})
// console.log(squares);
