document.addEventListener('DOMContentLoaded', function(){
function GameOfLife(height,width){
    this.boardWidth=width;
    this.boardHeight=height;
    this.board=document.querySelector('#board');
    this.cells=[];
    };
    GameOfLife.prototype.createBoard=function(){
        this.board.style.width = 15 * this.boardWidth + 'px';
        this.board.style.height = 15 * this.boardHeight + 'px';
        console.log(this.boardHeight);
        console.log(this.boardWidth); 
        var allCells = this.boardHeight * this.boardWidth;
         
         for (var i = 0; i < allCells; i++) {
            var newDiv = document.createElement('div');
            newDiv.setAttribute('id', i);
            this.board.appendChild(newDiv)
            this.cells.push(newDiv)   
         }

         this.cells.forEach(function(elem) {
             elem.addEventListener('click', liveToggle)
         });

         function liveToggle(e){
             this.classList.toggle('live')
             
         }; 
    };
    GameOfLife.prototype.position=function(x, y){
        var index = x + y * this.boardWidth;
        return this.cells[index];   
    };

    GameOfLife.prototype.setCellState=function(x, y, state){
        if(this.position(x, y).classList.contains(state)){
            this.position(x, y).classList.remove(state);
        }else{
            this.position(x, y).classList.add(state)
        }     
    };

    GameOfLife.prototype.firstGlider=function(x, y, state){
        console.log (this);
        this.setCellState(x, y, state);
        this.setCellState(x-1, y-1, state);
        this.setCellState(x, y-1, state);
        this.setCellState(x+1, y+1, state);
        this.setCellState(x-1, y+1, state);
    };
 
    
GameOfLife.prototype.createNeighbors = function (x, y) {
    var neighbors = [];

    if (x === 0 && y === 0) {
        neighbors = [
            this.position(x + 1, y),
            this.position(x, y + 1),
            this.position(x + 1, y + 1)
        ];
    } else if (x === this.boardWidth - 1 && y === 0) {
        neighbors = [
            this.position(x - 1, y),
            this.position(x - 1, y + 1),
            this.position(x, y + 1)
        ];
    } else if (x === (this.boardWidth - 1) && y === (this.boardHeight - 1)) {
        neighbors = [
            this.position(x - 1, y - 1),
            this.position(x, y - 1),
            this.position(x - 1, y)
        ];
    } else if (x === 0 && y === this.boardHeight - 1) {
        neighbors = [
            this.position(x, y - 1),
            this.position(x + 1, y - 1),
            this.position(x + 1, y)
        ];
    } else if (y === 0 && x > 0 && x < this.boardWidth) {
        neighbors = [
            this.position(x - 1, y),
            this.position(x + 1, y),
            this.position(x - 1, y + 1),
            this.position(x, y + 1),
            this.position(x + 1, y + 1)
        ];
    } else if (x === 0 && y > 0 && y < this.boardHeight) {
        neighbors = [
            this.position(x, y - 1),
            this.position(x + 1, y - 1),
            this.position(x + 1, y),
            this.position(x, y + 1),
            this.position(x + 1, y + 1)
        ];
    } else if (y === (this.boardHeight - 1) && 0< x < this.boardWidth) {
        neighbors = [
            this.position(x - 1, y - 1),
            this.position(x, y - 1),
            this.position(x + 1, y - 1),
            this.position(x - 1, y),
            this.position(x + 1, y)
        ];
    } else if (x === this.boardWidth - 1 && 0 < y < this.boardHeight) {
        neighbors = [
            this.position(x, y - 1),
            this.position(x - 1, y - 1),
            this.position(x, y + 1),
            this.position(x - 1, y + 1),
            this.position(x - 1, y),
        ];
    } else {
        neighbors = [
            this.position(x - 1, y - 1),
            this.position(x, y - 1),
            this.position(x + 1, y - 1),
            this.position(x - 1, y),
            this.position(x + 1, y),
            this.position(x - 1, y + 1),
            this.position(x, y + 1),
            this.position(x + 1, y + 1)
        ];
    }
    return neighbors;
    }

    GameOfLife.prototype.computeCellNextState=function (x, y){
        var lifeNeighbours=[];
         var neighbours = this.createNeighbors(x, y);
        console.log('neighbours', neighbours)
        neighbours.forEach(function(neighbour){
            if (neighbour.classList.contains('live')){
                lifeNeighbours.push(neighbour);
                console.log (neighbour);
            };
            
            return lifeNeighbours;
            
        });
        if (this.position(x, y).classList.contains('live') && lifeNeighbours.length<2){
            
            return 0
        };
        if (this.position(x, y).classList.contains('live') && (lifeNeighbours.length===2||lifeNeighbours.length===3)){
            
            return 1;
        };
        if (this.position(x, y).classList.contains('live') && lifeNeighbours.length>3){
            
            return 0;
        };
        if ((!this.position(x, y).classList.contains('live')) && lifeNeighbours.length===3){
            
            return 1;
        }else{
            
            return 0
        };
    };

        GameOfLife.prototype.computeNextGeneration=function(){
            var nextGeneration=[];
            for (var y=0; y<this.boardHeight; y++){
                console.log ('y', y)
                for (var x=0; x<this.boardWidth; x++){
                    console.log('x', x)
                    nextGeneration.push(this.computeCellNextState(x, y));   
                }
                console.log ('nextGeneration', nextGeneration)
            }
             return nextGeneration
        };
        GameOfLife.prototype.printNextGeneration=function(){
            var newcells=[]
            var nextGen=this.computeNextGeneration();
            console.log ('nextGen', nextGen);
            for (var i=0; i<nextGen.length; i++){
                console.log (nextGen[i])
                if (nextGen[i]===1){
                    this.cells[i].classList.add('live')   
                }else{
                    this.cells[i].classList.remove('live')
                    console.log ('this.cells', this.cells)
                
                return this.cells;    
        }
        }
    }

    


var game = new GameOfLife (5, 5);
game.createBoard();
//game.computeCellNextState(0, 0);
game.setCellState(1, 1, 'live')
game.firstGlider(3, 3, 'live');


//game.computeNextGeneration();
game.printNextGeneration()












});