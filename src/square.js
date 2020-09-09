class Square {
	constructor(x,y,name) {
		this.name = name
		this.x = x;
		this.y = y;
		this.isMine = false
		this.visible = false
		this.mine_neighbors = 0
		this.neighbors = []
		this.element = document.createElement("div")
		document.getElementById("grid").appendChild(this.element)
		this.element.classList.add("square")
		// var content = document.createTextNode(this.isMine + "," + this.x + "," + this.y + "; ");
		// this.element.appendChild(content)
		// this.element.innerHTML = this.name
	}
	setMine(){
		var num = Math.floor(Math.random() * 10);
		if (num <= 1) {
			this.isMine = true
			// var content = document.createTextNode("m");
			// this.element.appendChild(content)
			current_mines++
			// console.log(current_mines);
		}
			// this.isMine = true
	}
	show(isFlag){
		// console.log(this);
		if (!this.visible) {
			this.visible = true
			if (isFlag) {
				// this.element.innerHTML = ""
				this.element.classList.add("flagged")
			}else {
				this.element.classList.add("visible")
				if (this.isMine) {
					lose()
					this.element.classList.add("mine")
				} else if (!this.isMine && this.mine_neighbors != 0) {
					// console.log("not mine");
					this.element.innerHTML = this.mine_neighbors
				}
				else {
					// this.neighbors[0].show()
					for (var j = 0; j < this.neighbors.length; j++) {
						this.neighbors[j].show()
					}
				}

			}
		}
	}
}
