//https://developer.mozilla.org/fr/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Build_the_brick_field
// key code info : https://keycode.info/

let canvas = document.getElementById("MyCanvas"); //on recupere l'id que l'on ajoute dans une variable
let ctx = canvas.getContext("2d");

//Variable balle
let x = canvas.width / 2; // position X
let y = canvas.height - 30; // position Y
let ballRadius = 10; // rayon du cercle en px

// Deplacement de la balle
let dx = 2; //nombre de frame par sec de l'axe X
let dy = -2; //idem pour l'axe Y

// varible paddle
let paddleHeight = 10; // Hauteur de la raquette
let paddleWidth = 75; // Largeur de la raquette
let paddleX = (canvas.width-paddleWidth)/2; // Position X de la raquette
let paddleY = (canvas.height-paddleHeight)-23; // Position Y de la raquette

//Deplacement du paddle
let rightPressed = false; //Bouton initialisé à 'false' => bouton pas préssé a la base
let leftPressed = false;  //Idem



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //rond de rayon 10px
    //ctx.fillStyle = "#ff0000"; // on stocke la couleur du rond qui sera appelé par la methode fill()
    ctx.fillStyle = 'rgb('+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+')';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface la trace des frames superposé lors du deplacement
    drawBall(); // appelle la fonction drawBal() dans la fonction draw()
    drawPaddle();
    //permet de faire rebondir la balle
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            alert("GAME OVER");
            document.location.reload();
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
        paddleX += 7; //vitesse deplacement paddle
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    /* Si la fleche droite est préssé et que la position en X 
    du paddle sont < à la largeur du canvas - la largeur du paddle
    => le paddle bougera de 7px sur la doite (meme chose pour la fleche gauche préssé).
    Cela permet de fixer une limite de mouvement pour que le paddle reste sur le canvas.*/

    x += dx; // permet de deplacer le rond sur l'axe X
    y += dy; // idem pour l'axe Y 
}

// Permet de savoir si les touche sont préssé ou pas => va declencher les boutons
document.addEventListener("keydown",keyDownPressed,false);
document.addEventListener("keyup",keyUpPressed,false);

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

setInterval(draw, 10); //repetion de la fonction draw() en ms