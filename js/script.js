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
        if(!this.position(x, y).classList.contains(state)){
            this.position(x, y).classList.add('live');
        }else{
            this.position(x, y).classList.remove('live')
        };     
    };

    GameOfLife.prototype.firstGlider=function(x, y, state){
        this.setCellState(x, y, state);
        this.setCellState(x-1, y-1, state);
        this.setCellState(x, y-1, state);
        this.setCellState(x+1, y+1, state);
        this.setCellState(x-1, y+1, state);
    }
var game = new GameOfLife (20, 20);
game.createBoard();

game.firstGlider(1, 1, 'live');











});