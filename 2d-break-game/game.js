// SELECT CANVAS ELEMENT
const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #0ff";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

// GAME VARIABLES AND CONSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3; // PLAYER HAS 3 LIVES
let leftArrow = false;
let rightArrow = false;

// CREATE THE PADDLE
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
}

// DRAW PADDLE
function drawPaddle(){
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", function(event){
   if(event.keyCode == 37){
       leftArrow = true;
   }else if(event.keyCode == 39){
       rightArrow = true;
   }
});
document.addEventListener("keyup", function(event){
   if(event.keyCode == 37){
       leftArrow = false;
   }else if(event.keyCode == 39){
       rightArrow = false;
   }
});

// MOVE PADDLE
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// CREATE THE BALL
const ball = {
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3 * (Math.random() * 2 - 1),
    dy : -3
}

// DRAW THE BALL
function drawBall(){
    ctx.beginPath();
    
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    
    ctx.strokeStyle = "#2e3548";
    ctx.stroke();
    
    ctx.closePath();
}

// MOVE THE BALL
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// BALL AND WALL COLLISION DETECTION
function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.dx = - ball.dx;
    }
    
    if(ball.y - ball.radius < 0){
        ball.dy = -ball.dy;
    }
    
    if(ball.y + ball.radius > cvs.height){
        LIFE--; // LOSE LIFE
        resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 * (Math.random() * 2 - 1);
    ball.dy = -3;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        
        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width/2);
        
        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width/2);
        
        // CALCULATE THE ANGLE OF THE BALL
        let angle = collidePoint * Math.PI/3;
            
            
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);
    }
}

//CREATE THE BRICK OBJECT

const brick ={
    rows :5,
    coloumns:3,
    width:20,
    heigth:20,
    offSetLeft:20,
    offSetTop:20,
    fillColor:"#2e3548",
    strokeColor:"#fff"
    }  
 //CREATE THE BRICK ARRAYS THAT STORE THE BRICKS POSITIONS
    
    let bricks =[];
    
    //CREATE THE POSITION OF THE BRICKS
    for(let r =0; r < brick.rows; r++){
    
    //FILL THE BRICKS  POSITIONS
    bricks[r]=[]
    for(let c = 0; c< brick.coloumns; c++){
    bricks[r][c]={
    x:c*(brick.offSetLeft + brick.width)+brick.offSetLeft,
    y:45,
    status:true
    }
    }
    
    }



 //DRAW BRICKS FUNCTION
 function drawBrick(){
    //LOOP THROUGTH THE TWO DIMENTIONAL 
    for( let r=0; r <brick.rows;r++){

        for(let c =0; c<brick.coloumns;c++){
            // this console log outputs the brick x and y position but there is a problem with the y variable 
            console.log(bricks[r][c])
        
            if(bricks[r][c].status){
               ctx.fillStyle=brick.fillColor;
                ctx.fillRect(bricks[r][c].x,bricks[r][c].y,bricks[r][c].width,bricks[r][c].height)
                ctx.strokeStyle=brick.strokeColor;
                ctx.strokeRect(bricks[r][c].x,bricks[r][c].y,bricks[r][c].width,bricks[r][c].height)

            }
        }
    }
 }

// DRAW FUNCTION
function draw(){
    drawPaddle();
    
    drawBall();
    drawBrick();
}

// UPDATE GAME FUNCTION
function update(){
    movePaddle();
    
    moveBall();
    
    ballWallCollision();
    
    ballPaddleCollision();
}




// GAME LOOP
function loop(){
    // CLEAR THE CANVAS
    ctx.drawImage(BG_IMG, 0, 0);
    //the draw function is responsible for drawing objects on the canvas
    draw();
    //the update function  dills with updating the moving paths of the game
    update();
    //this is the main game loop controls frame rate of the game
    requestAnimationFrame(loop);


}
loop();


// things to figure out 
//debug the bricks viewing on the screen























