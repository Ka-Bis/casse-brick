//https://developer.mozilla.org/fr/docs/Games/Workflows/2D_Breakout_game_pure_JavaScript/Faire_rebondir_la_balle_sur_les_murs

let canvas = document.getElementById("MyCanvas"); //on recupere l'id que l'on ajoute dans une variable
let ctx = canvas.getContext("2d");

let x = canvas.width / 2; // position X
let y = canvas.height - 30; // position Y
let ballRadius = 20; // rayon du cercle en px

let dx = 2; //nombre de frame par sec de l'axe X
let dy = -2; //idem pour l'axe Y



function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2); //rond de rayon 10px
    ctx.fillStyle = "#ff0000"; // on stocke la couleur du rond qui sera appelé par la methode fill()
    /*ctx.fillStyle = 'rgb('+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+')';*/
    ctx.fill(); 
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // efface la trace des frames superposé lors du deplacement
    drawBall(); // appelle la fonction drawBal() dans la fonction draw()

    //permet de faire rebondir le rond
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) { 
        dy = -dy;
        /* Si la position en Y de la balle est superieur la LONGUEUR - le RAYON du cercle du canvas ou INFERIEUR au RAYON du cercle, 
        on inverse sa position*/
    }
    
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) { 
        dx = -dx;
        ctx.fillStyle = 'rgb('+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+')';
        /* Si la position en X de la balle est superieur la LARGEUR - le RAYON du cercle du canvas ou INFERIEUR au RAYON du cercle, 
        on inverse sa position*/
    }

    x += dx; // permet de deplacer le rond sur l'axe X
    y += dy; //idem pour l'axe Y+    
}

setInterval(draw, 20); //repetion de la fonction draw() en ms