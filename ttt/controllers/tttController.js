class tttController {
  static async getUser(req, res, next) { 
    let json = req.query;
    let name = undefined;
    console.log("Received parameters!");

    if (req.query && req.query.name) {
      name = json.name;
    }    

    let response = {
      name: name,
      date: new Date().toUTCString()
    };
    console.log("Returning user info!");
    
    res.status(200).render('game', response);
  }

  static async makeMove(req, res, next) { 
    let json = req.body;
    let grid = json.grid;
    let winner = ' ';    
    console.log("Received json!");
    console.log(req.body);

    // validate json(?)
    if (!req.body || !req.body.grid || req.body.grid.length !== 9) {
        let response = {
          grid: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], 
          winner: ' '
        };
        return res.status(200).send(response);
    }
    
    if (checkWin(grid, 'X') == 'X'){ // if user wins, set winner to X
      winner = 'X';
    }
  
    if (winner == ' ' && checkDraw(grid)){ // if game is draw, set winner to T
      winner = 'T';
    }
  
    if (winner == ' '){ // server makes action
      grid = serverPlay(grid, 'O');
      if (checkWin(grid, 'O') == 'O'){   // if server wins, set winner to O
        winner = 'O';
      } 
    }        
  
    let response = {
      grid: grid,
      winner: winner
    };
    console.log("Returning game status!");

    return res.status(200).send(response);
  }
}
  
function checkWin(grid, char) {
  // horizontal/vertical case
  for (let i = 0; i < 3; i++){
      if ((grid[i*3] == char && grid[i*3+1] == char && grid[i*3+2] == char) ||
          grid[i] == char && grid[i+3] == char && grid[i+6] == char) {
          console.log(char + " won!");
          return char;
      } 
  }

  // diagonal case
  if ((grid[0] == char && grid[4] == char && grid[8] == char) ||
      (grid[2] == char && grid[4] == char && grid[6] == char)) {
      console.log(char + " won!");
      return char;
  } else {
      console.log(char + " did not win yet...");
      return ' ';
  }
}

function checkDraw(grid) {
  for (let i = 0; i < 9; i++){
      if (grid[i] == ' '){
          console.log("No draw");
          return false;
      }
  }
  console.log("Draw");
  return true;
}

function serverPlay(grid, char){
  let index = Math.floor(Math.random() * 9);

  // check what this does, eventually...
  // if (!grid.some((val) => val == ' ')) return grid;

  // server checks for empty space, then places
  while(true){
      if (grid[index] == ' '){
          grid[index] = char;
          console.log("Server places O in index: " + index);
          return grid;
      }
      index = Math.floor(Math.random() * 9);
  }
}

module.exports = tttController;