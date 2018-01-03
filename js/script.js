document.addEventListener('DOMContentLoaded', function(){
function GameOfLife(height,width){
    this.boardWidth=width;
    this.boardHeight=height;
    this.board=document.querySelector('#board');
    
    };
    GameOfLife.prototype.createBoard=function(){
        this.board.style.width = 10 * this.boardWidth + 'px';
        this.board.style.height = 10 * this.boardHeight + 'px';
        console.log(this.boardHeight);
        console.log(this.boardWidth); 
        var allCells = this.boardHeight * this.boardWidth;
         
         

         for (var i = 0; i < allCells; i++) {
            var newDiv = document.createElement('div');
            this.board.appendChild(newDiv)
            console.log (newDiv)
         }
    }
var game = new GameOfLife (50, 50);
game.createBoard();
console.log (game.allCells)






});