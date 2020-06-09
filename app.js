const canvas=document.querySelector("#canvas");
const context=canvas.getContext("2d");

//score variables
let bottomScore=0;
let topScore=0;

//common paddle variables
let paddleWidth=120;
let paddleHeight=10;
let Dx=8;

//paddle bottom variables
let bottomX=(canvas.width-paddleWidth)/2;
let bottomY=canvas.height-10;
let bottomRightMove=false;
let bottomLeftMove=false;

function drawBotttomPaddle()
{
    context.beginPath();
    context.rect(bottomX,bottomY,paddleWidth,paddleHeight);
    context.fillStyle="#2E4053";
    context.fill();
    context.closePath();
}

//paddle top variables
let topX=(canvas.width-paddleWidth)/2;
let topY=0;
let topRightMove=false;
let topLeftMove=false;

function drawTopPaddle()
{
    context.beginPath();
    context.rect(topX,topY,paddleWidth,paddleHeight);
    context.fillStyle="#2E4053";
    context.fill();
    context.closePath();
}


//ball variables
let ballX=canvas.width/2;
let ballY=canvas.height-25;
let ballRadius=7;
let ballMove=false;
let ballDx=4;
let ballDy=4;

function drawBall()
{

    context.beginPath();
    context.arc(ballX,ballY,ballRadius,0,Math.PI*2);
    context.fillStyle="#561731";
    context.fill();
    context.closePath();

}


let ballSpeedInterval;
let ballSpeedIntervalController=true;

document.addEventListener("keydown",keyDownHandler);
document.addEventListener("keyup",keyUpHandler);

//start buttons
let startButtons= document.querySelectorAll(".start");

startButtons.forEach((btn)=>{
  btn.addEventListener("click",function(){

    ballMove=true;
    allPaddleMoveController=true;

    if(ballSpeedIntervalController)
    {
        ballSpeedInterval= setInterval(()=>{
        if(ballDy<=10 && ballDy>=-10)
        {
        if(ballDy>0)
        ballDy++;
        else
        ballDy--;
        }
        },15000);
        ballSpeedIntervalController=false;
    }
});
});

let allPaddleMoveController=true;

let pauseButtons= document.querySelectorAll(".pause")

pauseButtons.forEach((btn)=>{
  
     btn.addEventListener("click",function(){

    clearInterval(ballSpeedInterval);
    ballSpeedIntervalController=true;
    ballMove=false;
    allPaddleMoveController=false;

});
});

function keyDownHandler(event)
{
    if(allPaddleMoveController){
    switch(event.keyCode)
    {
        case 39:
            bottomRightMove=true;
            bottomLeftMove=false;
            break;
        case 37:
            bottomLeftMove=true;
            bottomRightMove=false;
            break;
        case 68:
            topRightMove=true;
            topLeftMove=false;
            break;
        case 65:
            topLeftMove=true;
            topRightMove=false;
            break;
    }
}
}

function keyTouchStartHandler(keyCode)
{
  if (allPaddleMoveController) {
    switch (keyCode)
    {
      case 39:
        bottomRightMove = true;
        bottomLeftMove=false;
        break;
      case 37:
        bottomLeftMove = true;
        bottomRightMove=false;
        break;
      case 68:
        topRightMove = true;
        topLeftMove=false;
        break;
      case 65:
        topLeftMove = true;
        topRightMove=false;
        break;
    }
  }
}

function keyUpHandler(event)
{

    switch(event.keyCode)
    {
        case 39:
            bottomRightMove=false;
            break;
        case 37:
            bottomLeftMove=false;
            break;
            case 68:
                topRightMove=false;
                break;
            case 65:
                topLeftMove=false;
                break;
    }
}

function keyTouchEndHandler(keyCode)
{

  switch (keyCode)
  {
    case 39:
      bottomRightMove = false;
      break;
    case 37:
      bottomLeftMove = false;
      break;
    case 68:
      topRightMove = false;
      break;
    case 65:
      topLeftMove = false;
      break;
  }
}

let gameOverAlertController=true;

function draw()
{
    context.clearRect(0,0,canvas.width,canvas.height);
    drawBotttomPaddle();
    drawTopPaddle();
    drawBall();


//  bottom paddle mover
    if(bottomRightMove && bottomX+paddleWidth<=canvas.width){bottomX+=Dx;}
    else if(bottomLeftMove && bottomX>=0){bottomX-=Dx;}
//  top paddle mover
    if(topRightMove && topX+paddleWidth<=canvas.width){topX+=Dx;}
    else if(topLeftMove && topX>=0){topX-=Dx;}

    //ball movement
    if(ballMove){ballX+=ballDx;ballY-=ballDy};

//ball and wall collsion detector
    if(ballX+ballRadius>canvas.width){ballDx=-ballDx}
    //else if(ballY-ballRadius<0){
    else if(ballY<0){
        bottomScore++; 
        ballMove=false; 
        ballX=canvas.width/2;
        ballY=25;
        ballDy=-ballDy;

        //paddle bottom variables
        bottomX=(canvas.width-paddleWidth)/2;
        bottomY=canvas.height-10;

        //paddle top variables
        topX=(canvas.width-paddleWidth)/2;
        topY=0;
    }
    else if(ballX-ballRadius<0){ballDx=-ballDx}
    // else if(ballY+ballRadius>canvas.height){
    else if(ballY>canvas.height){
        topScore++;
        ballMove=false;
        ballX=canvas.width/2;
        ballY=canvas.height-25;
        ballDy=-ballDy;

        //paddle bottom variables
        bottomX=(canvas.width-paddleWidth)/2;
        bottomY=canvas.height-10;
        // bottomRightMove=false;
        // bottomLeftMove=false;

        //paddle top variables
        topX=(canvas.width-paddleWidth)/2;
        topY=0;
    }

//bottom paddle collision detector
    if((ballX>=bottomX && ballX<=bottomX+paddleWidth/4) && ballY+ballRadius>=bottomY)
    {
        ballDy=-ballDy;
        ballDx=-4;
    }
    else if((ballX>=bottomX+paddleWidth/4 && ballX<=bottomX+(5*paddleWidth)/12) && ballY+ballRadius>=bottomY)
    {
        ballDy=-ballDy;
        ballDx=-2;
    }
    else if((ballX>=bottomX+(5*paddleWidth)/12 && ballX<=bottomX+(7*paddleWidth)/12) && ballY+ballRadius>=bottomY)
    {
        ballDy=-ballDy;
        ballDx=0;
    }
    else if((ballX>=bottomX+(7*paddleWidth)/12 && ballX<=bottomX+(3*paddleWidth)/4) && ballY+ballRadius>=bottomY)
    {
        ballDy=-ballDy;
        ballDx=+2;
    }
    else if((ballX>=bottomX+(3*paddleWidth)/4 && ballX<=bottomX+paddleWidth) && ballY+ballRadius>=bottomY)
    {
        ballDy=-ballDy;
        ballDx=+4;
    }

//top paddle collision detector
    if((ballX>=topX && ballX<=topX+paddleWidth/4) && ballY-ballRadius<=topY+paddleHeight)
    {
        ballDy=-ballDy;
        ballDx=-4;
    }
    else if((ballX>=topX+paddleWidth/4 && ballX<=topX+(5*paddleWidth)/12) && ballY-ballRadius<=topY+paddleHeight)
    {
        ballDy=-ballDy;
        ballDx=-1.5;
    }
    else if((ballX>=topX+(5*paddleWidth)/12 && ballX<=topX+(7*paddleWidth)/12) && ballY-ballRadius<=topY+paddleHeight)
    {
        ballDy=-ballDy;
        ballDx=0;
    }
    else if((ballX>=topX+(7*paddleWidth)/12 && ballX<=topX+(3*paddleWidth)/4) && ballY-ballRadius<=topY+paddleHeight)
    {
        ballDy=-ballDy;
        ballDx=+1.5;
    }
    else if((ballX>=topX+(3*paddleWidth)/4 && ballX<=topX+paddleWidth) && ballY-ballRadius<=topY+paddleHeight)
    {
        ballDy=-ballDy;
        ballDx=+4;
    }

//game over winner selection
    if(bottomScore==5 && gameOverAlertController){
        gameOverAlertController=false;
        setTimeout(()=>{
        // alert("Game Over! Bottom Wins!");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.font="30px Arial";
        context.fillText("Game Over! Bottom Wins!",canvas.width/2-150,canvas.height/2)
    },500)}
    else if(topScore==5 && gameOverAlertController){
        gameOverAlertController=false;
        setTimeout(()=>{
        // alert("Game Over! Top Wins!");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.clearRect(0,0,canvas.width,canvas.height);
        context.font="30px Arial";
        context.fillText("Game Over! Top Wins!",canvas.width/2-150,canvas.height/2)
    },500)}


    document.querySelectorAll(".bottom-score").forEach((score)=>{
        score.innerHTML=bottomScore;
    })
    document.querySelectorAll(".top-score").forEach((score)=>{
        score.innerHTML=topScore;
    })


    if(gameOverAlertController){requestAnimationFrame(draw);}
}


requestAnimationFrame(draw);


// setInterval(()=>{
//     if(ballDy<=10 && ballDy>=-10)
//     {
//     if(ballDy>0)
//     ballDy++;
//     else
//     ballDy--;
//     }
//     console.log(ballDy)},10000);