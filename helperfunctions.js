function print(text)
{
  console.log(text);
}

function println(text)
{
  console.log(text);
}

//displaying processed variants
function drawHypothesis(board, color, points, depth) {
  var output="";
  output = '<div style="width:100px; margin:1em; padding: 0.3em; display:inline-block; background-color:'+color+'"> ';
  output += "-"+depth+"-<br>";
  //if(!selected) output = '<div style="width:100px; margin:1em; padding: 0.3em;  display:inline-block; background-color:yellow"> ';
  for (var i=0; i<3; i++)
  {
    for (var j=0; j<3; j++)
    {
      if(board[i][j]==0)
        output+=" _";
      if(board[i][j]==1)
        output+=" o";
      if(board[i][j]==-1)
        output+=" x";
    }
    output+="<br>";
  }
  output+="<br>"+points+"<br></div>";
  if(depth==3) output+="<br>";
  document.getElementById("output").innerHTML+=output;
}

//draw board on console.log
function drawBoard(board)
{
    var line="";
    for(var i=0; i<3; i++)
    {
      for(var j=0; j<3; j++)
      {
        if(board[i][j]==0) line += " _ ";
        if(board[i][j]==-1) line += " X ";
        if(board[i][j]==1) line += (" O ");
      }
      console.log(line);
      line="";
    }
    console.log("************")
}

//fields in html code
fields = [["f00", "f01", "f02"],
          ["f10", "f11", "f12"],
          ["f20", "f21", "f22"]];

//register mouselistener to fields
function registerMouselistener() {
  for (var i = 0; i<3; i++) {
    for (var j = 0; j<3; j++) {
      document.getElementById(fields[i][j]).onclick = function( event ) {
        //alert(event.target.id);
        for (var i = 0; i < 3; i++)
          for (var j = 0; j < 3; j++)
            if(fields[i][j]==event.target.id)
              myboard[i][j]=1;
              drawToHtml();
              nextMove = minimax(document.getElementById("depth").value, -1, true);
              if(win(myboard)==0) myboard[nextMove[0]][nextMove[1]]=-1;
              drawToHtml();
              if(win(myboard)==-1) alert("x wins");
              if(win(myboard)==1)
              {
                alert("o wins");
                var audio = new Audio('audio_file.mp3');
                audio.play();
              }
        document.getElementById("output").innerHTML+="<br>";
      }
    }
  }
}

function reset() {
  for(var i = 0; i < 3; i++)
    for(var j = 0; j < 3; j++)
       myboard[i][j]=0;
  drawToHtml();
  document.getElementById("output").innerHTML="";
}

//draw board to html
function drawToHtml() {
  for (var i = 0; i<3; i++) {
    for (var j = 0; j<3; j++) {
      if(myboard[i][j]==0)
        document.getElementById(fields[i][j]).innerHTML= "_";
      if(myboard[i][j]==1)
        document.getElementById(fields[i][j]).innerHTML= "o";
      if(myboard[i][j]==-1)
        document.getElementById(fields[i][j]).innerHTML= "x";
    }
  }
}


//find out if someone won the game
function win(localBoard)
{
  var total = 0;
  max=0;
  for(var i = 0; i < 3; i++)
  {
    var sum = localBoard[i][0]+localBoard[i][1]+localBoard[i][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  }
  for(var i = 0; i < 3; i++)
  {
    var sum = localBoard[0][i]+localBoard[1][i]+localBoard[2][i];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  }
  var sum = localBoard[0][0]+localBoard[1][1]+localBoard[2][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;

  var sum = localBoard[2][0]+localBoard[1][1]+localBoard[0][2];
    if (sum==3) return 1;
    if (sum==-3) return -1;
  //console.log("Total: " + total);
  return max;
}

//get list of possible moves
function possibleMoves(localBoard)
{
  //if(win(localBoard)!=0) return "";
  var moves=[];
  for (var i=0; i<3; i++)
    for (var j=0; j<3; j++)
      if(localBoard[i][j]==0)
        moves.push([i,j]);
  return moves;
}

