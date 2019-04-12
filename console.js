// https://developer.mozilla.org/fr/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Build_the_brick_field
// key code info : https://keycode.info/

let canvas = document.getElementById("MyCanvas"); //on recupere l'id que l'on ajoute dans une variable
let ctx = canvas.getContext("2d");

//Variable balle
let x = canvas.width / 2; // position X
let y = canvas.height - 30; // position Y
let ballRadius = 10; // rayon du cercle en px

// Deplacement de la balle
let dx = 3; //angle nombre de frame par ms de l'axe X
let dy = -4; //idem pour l'axe Y

// variable paddle
let paddleHeight = 10; // Hauteur de la raquette
let paddleWidth = 75; // Largeur de la raquette
let paddleX = (canvas.width-paddleWidth)/2; // Position X de la raquette
let paddleY = canvas.height-paddleHeight; // Position Y de la raquette

// Deplacement du paddle
let rightPressed = false; //Bouton initialisé à 'false' => bouton pas préssé a la base
let leftPressed = false;  //Idem

//Variable Brique
let brickRowCount = 4; // nb ligne
let brickColumnCount = 6; // nb colonne
let brickWidth = 75; //largeur brique
let brickHeight = 20; // hauteur brique
let brickPadding = 5; //espacement brique=>10
let brickOffsetTop = 30; //marge brique en haut
let brickOffsetLeft = (canvas.width)/6; // marge brique a gauche
// let brickOffsetLeft = 5;
//Le code ci-dessous va parcourir les lignes et les colonnes et créer de nouvelles briques. 
let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

//score
let score = 0;

//vie
var lives = 5;

// Permet de savoir si les touche sont préssé ou pas => va declencher les boutons
document.addEventListener("keydown",keyDownPressed,false);
document.addEventListener("keyup",keyUpPressed,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

/* Quand on presse une touche du clavier, l'information est gardée dans une variable.
 La variable concernée est mis sur 'true'. Quand la touche est relachée, la variable revient à 'false'.*/
function keyDownPressed(key) {
    if(key.keyCode == 39){
        rightPressed = true;
    } else if (key.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpPressed(key) {
    if(key.keyCode == 39){
        rightPressed = false;
    } else if (key.keyCode == 37) {
        leftPressed = false;
    }
}
//interaction du paddle avec la souris
function mouseMoveHandler(key) {
    var relativeX = key.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawScore() {
    ctx.font = "16px Arial"; //police d'ecrire
    ctx.fillStyle = "#0095DD"; ///couleur texte
    ctx.fillText("Score: "+score, 8, 20); //texte avec ses positions
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

// voir commentaire.txt pour les detail
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
      for(var r=0; r<brickRowCount; r++) {
        var b = bricks[c][r];
        if(b.status == 1) {
          if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
            dy = -dy;
            b.status = 0;
            score++;
            if(score == brickRowCount*brickColumnCount) {
              alert("YOU WIN, CONGRATS!");
              document.location.reload();
            }
          }
        }
      }
    }
  }

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //rond de rayon 10px
    ctx.fillStyle = "#ff0000"; // on stocke la couleur du rond qui sera appelé par la methode fill()
    // ctx.fillStyle = 'rgb('+
    //                         Math.floor(Math.random()*255)+','+
    //                         Math.floor(Math.random()*255)+','+
    //                         Math.floor(Math.random()*255)+')';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    // ctx.fillStyle = 'rgb('+
    //                         Math.floor(Math.random()*255)+','+
    //                         Math.floor(Math.random()*255)+','+
    //                         Math.floor(Math.random()*255)+')';
    ctx.fill();
    ctx.closePath();
}

/*Chaque position 'brickX' est déterminé avec 'brickWidth' + 'brickPadding', multiplié par le 
nombre de colonne 'c', plus le 'brickOffsetLeft'. Meme chose pour 'brickY' avec 'brickHeight' et 'brickOffsetTop' */
function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                // ctx.fillStyle = 'rgb('+
                //             Math.floor(Math.random()*255)+','+
                //             Math.floor(Math.random()*255)+','+
                //             Math.floor(Math.random()*255)+')';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface la trace des frames superposé lors du deplacement
    drawBall(); // appelle la fonction drawBall()
    drawPaddle(); // appelle la fonction drawPaddle()
    drawBricks(); // appelle la fonction drawBricks()
    collisionDetection(); //appelle la fonction collisionDetection()
    drawScore(); //appelle la fonction draw0Score()
    drawLives(); //appelle la fonction drawLives()

    //permet de faire rebondir la balle
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius) {
    dy = -dy;
  }
  else if(y + dy > canvas.height-ballRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER");
        document.location.reload();
        clearInterval(interval); // Needed for Chrome to end game
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width-paddleWidth)/2;
      }
    }
  }
    /* Si la position en Y de la balle est superieur la LONGUEUR - le RAYON du cercle du canvas ou INFERIEUR au RAYON du cercle, 
    on inverse sa position. Si la balle touche le sol => GAME OVER*/

    /*Si la balle rentre en collision avec le mur du bas, nous devons vérifier si elle frappe le paddle.
     Si c'est le cas, la balle rebondit et revient dans la zone de jeu. 
    Sinon, le jeu est terminé comme avant.*/
    
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) { 
        dx = -dx;
        /* Si la position en X de la balle est superieur la LARGEUR - le RAYON du cercle du canvas ou INFERIEUR au RAYON du cercle, 
        on inverse sa position*/
    }
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 10; //vitesse deplacement paddle
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 8;
    }

    /* Si la fleche droite est préssé et que la position en X 
    du paddle sont < à la largeur du canvas - la largeur du paddle
    => le paddle bougera de 7px sur la droite (meme chose pour la fleche gauche préssé).
    Cela permet de fixer une limite de mouvement pour que le paddle reste sur le canvas.*/

    x += dx; // permet de deplacer le rond sur l'axe X
    y += dy; // idem pour l'axe Y 
}

setInterval(draw, 9); //repetion de la fonction draw() en ms