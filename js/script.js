document.addEventListener('DOMContentLoaded', function(){
function GameOfLife(height,width){
    this.boardWidth=width;
    this.boardHeight=height;
    this.board=document.querySelector('#board');
    this.cells=[];
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
            this.cells.push(newDiv)   
         }

         this.cells.forEach(function(elem) {
             elem.addEventListener('click', liveToggle)
         });

         function liveToggle(e){
             this.classList.toggle('live')
             console.log (this)
         }

    }
var game = new GameOfLife (20, 20);
game.createBoard();
console.log (game.allCells)
console.log (game.cells)










});