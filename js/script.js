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
        console.log (this);
        this.setCellState(x, y, state);
        this.setCellState(x-1, y-1, state);
        this.setCellState(x, y-1, state);
        this.setCellState(x+1, y+1, state);
        this.setCellState(x-1, y+1, state);
    };
    GameOfLife.prototype.computeCellNextState=function (x, y){
        var lifeNeighbours=[];
        var neighbour1=this.position(x-1, y-1);
        var neighbour2=this.position(x, y-1);
        var neighbour3=this.position(x+1, y-1);
        var neighbour4=this.position(x-1, y);
        var neighbour5=this.position(x+1, y);
        var neighbour6=this.position(x-1, y+1);
        var neighbour7=this.position(x, y+1);
        var neighbour8=this.position(x+1, y+1);
        var neighbours= [neighbour1, neighbour2, neighbour3, neighbour4, neighbour5, neighbour6, neighbour7, neighbour8];
        neighbours.forEach(function(neighbour){
            if (neighbour.classList.contains('live')){
                lifeNeighbours.push(neighbour);
                console.log (neighbour);
            };
            return lifeNeighbours;
            
        });
        if (this.position(x, y).classList.contains('live') && lifeNeighbours.length<2){
            console.log ('op1', 0);
            return 0
        };
        if (this.position(x, y).classList.contains('live') && (lifeNeighbours.length===2||lifeNeighbours.length===3)){
            console.log ('op2', 1)
            return 1;
        };
        if (this.position(x, y).classList.contains('live') && lifeNeighbours.length>3){
            console.log('op3', 0)
            return 0;
        };
        if ((!this.position(x, y).classList.contains('live')) && lifeNeighbours.length===3){
            console.log ('op4', 1)
            return 1;
        };

    };










var game = new GameOfLife (20, 20);
game.createBoard();
game.firstGlider(1, 1, 'live');
game.computeCellNextState(1,1)











});