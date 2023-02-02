const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const audio = new Audio("imagenes/bso.mp3");
audio.play();

const background = new Image();
background.src = "imagenes/galaxia1.jpg";


let navePlayer = document.createElement("img");
navePlayer.src = "imagenes/player1.png";


let naveEnemiga001 = document.createElement ("img");
naveEnemiga001.src = "imagenes/enemigo1.png";

let naveEnemiga003 = document.createElement ("img");
naveEnemiga003.src = "imagenes/enemigo3.png"

let explotion = document.createElement("img");
explotion.src = "imagenes/explosion.png"


/* let gameOver = document.createElement("img");
gameOver.src = "imagenes/game-over.png"

let enemigoFinal = document.createElement("img");
enemigoFinal.src = "imagenes/darkvader.png" */


window.addEventListener("load",() =>{
    let pulsador = false;
    document.getElementById("game-board").style.display = "none";
    document.querySelector("main").style.display = "block";
    

    class Player {
        constructor (){
            this.width = 100;
            this.height = 100;
            this.posX = this.width;
            this.posY = (canvas.height / 2) - (this.height / 2);
            this.velocidadPos = 30;
        }
        print(){
            ctx.drawImage (navePlayer, this.posX, this.posY, this.width, this.height)
        }

        moveUp(){
            this.posY -= this.velocidadPos;
            if (this.posY < 0) this.posY = 0;
        }
        moveDown(){
            this.posY += this.velocidadPos;
            if (this.posY > (canvas.height-this.height)) return this.posY = canvas.height - this.height;
        }
        moveLeft(){
            this.posX -= this.velocidadPos;
            if (this.posX < this.width ) this.posX = this.width
        }
        moveRight(){
            this.posX += this.velocidadPos;
            if (this.posX > (canvas.width/2 - this.width)) this.posX = canvas.width/2 - this.width;
        }
        
        dirShotPlayer(){
            this.posX += 5
        }

    }

    class Enemies {
        constructor (archivo){
            this.posX = canvas.width +10;
            this.posY = Math.floor(Math.random() * (canvas.height - 100))
            this.width = 90;
            this.height = 90;
            this.velocidadPos = 2;
            this.imagen = archivo;

        }

        print(){
            ctx.drawImage(this.imagen, this.posX, this.posY, this.width, this.height);            

        }

        move(){
            this.posX -= this.velocidadPos;

        }

        dead(muerte){
            let identificador = setInterval(() => {
                ctx.drawImage(muerte, this.posX, this.posY, this.width, this.height);
            },20)
            
            setTimeout(() => {
                clearInterval(identificador)
            },900);

        }

    }
    class Shot {
        constructor(x,y,color){
            this.posX = x
            this.posY = y
            this.radio = 5
            this.startAngle = 0
            this.endAngle = 2 * Math.PI
            this.velocidadX = 10
            this.velocidadY = 25
            this.color = color
        }

        print(){
            
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fill(ctx.arc(this.posX, this.posY, this.radio, this.startAngle, this.endAngle));
            ctx.stroke();
        } 

        moveLeft(){
            this.posX -= this.velocidadX
        }

        moveRight(){
            this.posX += this.velocidadX; 
        }
    }

    class Game{
        constructor (){
            this.player1 = new Player();
            this.player1.print();
            this.enemies = [];
            this.fire = [];
            this.firePlayer = [];
            this.personalScore = 0;
            this.live = 5;
            this.intervalId = undefined;
            this.iteracion = 0;
           // this.subirDificultad = 0;
        }

        start(){
            if(this.intervalId == undefined) {
                this.intervalId = setInterval(()=>{
                  this.iteracion ++;
                 // this.subirDificultad ++;
                 // console.log(this.subirDificultad)
                  //borra
                  this.clear();
                  //recalcula + genera obstaculos
                  this.recalcular();                  
                  //pinta
                  this.print();
                }, 28);
              }
        }

        end(){
            if(this.intervalId) clearInterval(this.intervalId);
        }

        clear(){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        print(){
            ctx.drawImage(background,0,0,canvas.width, canvas.height)
            this.player1.print()
            //this.bala002.print()
            this.enemies.forEach((enemie) => {
                enemie.print();
            })
            this.fire.forEach(bala => {
                bala.print()
            })
            this.firePlayer.forEach(bala => {
                bala.print()
            })

        }

        recalcular(){

            if (this.iteracion == 70){
                let enemigo1 = new Enemies(naveEnemiga001);
                this.enemies.push(enemigo1);

            }
            if (this.iteracion == 100){
                this.enemies.forEach(enemie => {
                    let bala1 = new Shot(enemie.posX, enemie.posY + (enemie.height/2),"red")
                    this.fire.push(bala1)
                })
            }
            if(this.iteracion == 100){
                let enemigo3 = new Enemies(naveEnemiga003);
                this.enemies.push(enemigo3);
            }

            if (this.iteracion == 120){
                this.enemies.forEach(enemie => {
                    let bala2 = new Shot(enemie.posX, enemie.posY + (enemie.height/2),"red")
                    this.fire.push(bala2)
                })
            }
            if (this.iteracion == 180){
                this.enemies.forEach(enemie => {
                    let bala3 = new Shot(enemie.posX, enemie.posY + (enemie.height/2),"red")
                    this.fire.push(bala3)
                })
            }
            
            if(this.iteracion == 182){
                this.iteracion = 0
            }
            //BONUS DIFICULTAD DE JUEGO
            /* if(this.subirDificultad == 2500){
                let n = 0
                while (n < 6){
                    let darkvader = new Enemies(enemigoFinal);
                    this.enemies.push(darkvader)
                }
                this.subirDificultad = 0;
            } */



            this.enemies.forEach((enemie) => {
                enemie.move();

                if (!(
                    this.player1.posX + this.player1.width < enemie.posX + 25||
                    this.player1.posX - 15 > enemie.posX + enemie.width ||
                    this.player1.posY + 25 > enemie.posY + enemie.height ||
                    this.player1.posY + this.player1.height <= enemie.posY + 25
                )){ 
            
                    this.end()
                }

            })
            this.fire.forEach((bala,i) => {
                bala.moveLeft();

                if (!(
                    this.player1.posY + this.player1.height /4 > bala.posY + (bala.radio*2) ||
                    this.player1.posX + this.player1.width < bala.posX ||
                    bala.posY > this.player1.posY + this.player1.height * 3/4||
                    bala.posX + (bala.radio*2) < this.player1.posX
                )){
                    //console.log("2")
                    delete(this.fire[i])
                    this.live -= 1;
                    this.life()
                    
                }
            })

            this.firePlayer.forEach((bala,k) => {
                bala.moveRight();
                this.enemies.forEach((enemie,i) => {
                    if (!(
                        enemie.posY > bala.posY + (bala.radio*2)/4 ||
                        enemie.posX + enemie.width < bala.posX ||
                        bala.posY > enemie.posY + enemie.height ||
                        bala.posX + (bala.radio*2)< enemie.posX
                    )){
                    
                        delete(this.enemies[i]);
                        enemie.dead(explotion);
                        this.firePlayer.splice(k,2);
                        this.personalScore += 100;
                        
                        this.score()

                    }
                })
                
            })
        }

        score(){
            document.querySelector(".datos span").innerHTML = `${this.personalScore}`;
            if (this.personalScore == 10000){
                this.end()
            }

        }
        life(){
            document.querySelector(".vidas span").innerHTML = `${this.live}`;
            if (this.live == 0){
                this.end()
            }
        }
    }

    let partida = new Game();
    
    document.getElementById("button").addEventListener('click',()=>{
        pulsador = true
        if (pulsador == true){
            document.querySelector("main").style.display = "none";
            document.getElementById("game-board").style.display = "block";
            partida.start();
            pulsador = false;
      }
    })

    document.getElementById("sound").addEventListener('click', ()=>{
        if (pulsador == false) audio.pause();
        else audio.play();
    })

    

    document.getElementsByTagName("body")[0].addEventListener("keydown",(event) => { //console.log(event.offsetX)
        switch(event.key){
          case "ArrowUp":
            partida.player1.moveUp()
            break;
          case "ArrowDown":
            partida.player1.moveDown()
            break;
          case "ArrowLeft":
            partida.player1.moveLeft()
            break;
          case "ArrowRight":
            partida.player1.moveRight()
            break;
          case " ":
            let bala001 = new Shot(partida.player1.posX + partida.player1.width, partida.player1.posY + partida.player1.height/2,"green")
            partida.firePlayer.push(bala001)
            break;
        }
      })
    
      
})