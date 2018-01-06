

document.addEventListener('DOMContentLoaded', function(){
function GameOfLife(height,width){
    this.boardWidth=prompt('Set the width of the board')
    this.boardHeight=prompt('Set the height of the board')
    this.board=document.querySelector('#board');
    this.cells=[];
    };
    GameOfLife.prototype.createBoard=function(){
        this.board.style.width = 20 * this.boardWidth + 'px';
        this.board.style.height = 20 * this.boardHeight + 'px';
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
        neighbours.forEach(function(neighbour){
            if (neighbour.classList.contains('live')){
                lifeNeighbours.push(neighbour);
                
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
                for (var x=0; x<this.boardWidth; x++){   
                    nextGeneration.push(this.computeCellNextState(x, y));   
                }   
            }
             return nextGeneration
        };
        GameOfLife.prototype.printNextGeneration=function(){
            var nextGen=this.computeNextGeneration();
            for (var i=0; i<nextGen.length; i++){
                
                if (nextGen[i]===1){
                    this.cells[i].classList.add('live')   
                }else{
                    this.cells[i].classList.remove('live')
                   
                }
            }
                return this.cells;    
    
        };
        GameOfLife.prototype.startAnimation=function(){
            var self=this;
            var myInterval = setInterval(function () {
                   self.printNextGeneration();
                       }, 1000);
            var pause = document.querySelector('#pause');
            pause.addEventListener('click', pauseGame);
                 function pauseGame(e) {
                        clearInterval(myInterval)
};
        };
        GameOfLife.prototype.playGame=function(){
            var self=this;
            var play = document.querySelector('#play');
            play.addEventListener('click', startAnimation)
            function startAnimation(e){
                self.startAnimation();
            }

        }
    
        


var play =document.querySelector('#play');
var pause=document.querySelector('#pause');
var  start =document.querySelector('#start');
start.addEventListener('click', startGame)
function startGame(){
    play.classList.remove('invisible')
    pause.classList.remove('invisible')
    start.classList.add('invisible')
var game = new GameOfLife()
game.createBoard();
//game.setCellState(0, 0, 'live')
game.firstGlider(1, 2, 'live');
game.playGame();
}

















});