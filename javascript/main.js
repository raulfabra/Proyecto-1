const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "imagenes/bkg.png";



let navePlayer = document.createElement("img");
navePlayer.src = "imagenes/player1.png";


let naveEnemiga001 = document.createElement ("img");
naveEnemiga001.src = "imagenes/enemigo1.png";

let naveEnemiga003 = document.createElement ("img");
naveEnemiga003.src = "imagenes/enemigo3.png"




window.addEventListener("load",() =>{
    class Player {
        constructor (){
            this.posX = 50;
            this.posY = 460;
            this.width = 100;
            this.height = 100;
            this.velocidadPos = 30;
            //this.velocidadDisp = 'valor';
        }
        print(){
            ctx.drawImage (navePlayer, this.posX, this.posY, this.width, this.height)
        }

        moveUp(){
            this.posY -= this.velocidadPos;
            if (this.posY < 0) return this.posY = 0;
        }
        moveDown(){
            this.posY += this.velocidadPos;
            if (this.posY > (canvas.height-this.height)) return this.posY = canvas.height - this.height;
        }
        
        bala(){

        }

    }

    class Enemies {
        constructor (archivo){
            this.posX = canvas.width +10;
            this.posY = Math.floor(Math.random() * (canvas.height - 100))
            this.width = 90;
            this.height = 90;
            this.velocidadPos = 2;
            /* this.fire = []; */
            this.imagen = archivo;
            //this.velocidadDisp = 'valor';
        }

        print(){
            ctx.drawImage(this.imagen, this.posX, this.posY, this.width, this.height);
            //pintar balas tambien
            

        }

        move(){
            this.posX -= this.velocidadPos;
            /* this.fire.forEach(bala => { //Recorrer array balas y moure
                bala.move()
            })  */
        }

        /*crearBala(){
            let bala = new Shot(this.posX, this.posY + (this.height/2));
            //this.fire.push(bala);

            /*this.fire.forEach(bala => {
                bala.move()
                bala.print()
               // bala.clear();
            }) */
        //}

        /* clear(){
            setInterval(() => {
                ctx.clearRect(this.posX, this.posY + (this.height/2))
            }, 20);
        }*/

    }
    class Shot {
        constructor(x,y){
            this.posX = x
            this.posY = y
            this.radio = 5
            this.startAngle = 0
            this.endAngle = 2 * Math.PI
            this.velocidadX = 5
            this.velocidadY = 25
            this.contadorBalas = 0;
        }
        print(){
            
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fill(ctx.arc(this.posX, this.posY, this.radio, this.startAngle, this.endAngle));
            ctx.stroke();
            let count = 50;
            let identificador = setInterval(() => {
                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.fill(ctx.arc((this.posX + count), this.posY, this.radio, this.startAngle, this.endAngle));
                ctx.stroke();
                count += 50
            },1000)

            setTimeout(()=>{
                clearInterval(identificador)
            },3000)
        } 

        move(){
            this.posX -= this.velocidadX
            //this.posY -= this.velocidadY

        }
    }

    class Game{
        constructor (){
            this.player1 = new Player();
            this.player1.print();
            this.enemies = [];
            this.fire = [];
            this.firePlayer = [];
            this.score = 0;
            this.intervalId = undefined;
            this.iteracion = 0;
            this.contadorBalas = 0;
        }

        start(){
            if(this.intervalId == undefined) {
                this.intervalId = setInterval(()=>{
                  this.iteracion ++;
                  //this.contadorBalas ++;
                  //this.contadorBalas++;
                  //console.log(this.iteracion)
                  //console.log(this.contadorBalas)
                  
                  //borra
                  this.clear();
                  //recalcula + genera obstaculos
                  this.recalcular();                  
                  //pinta
                  this.print();
                }, 20);
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
            this.enemies.forEach((enemie) => {
                enemie.print();
            })
            this.fire.forEach(bala => {
                bala.print()
                
            })
            


        }

        recalcular(){

            /* if(this.interacion % 20){
                this.enemies.forEach(enemie => {
                    let bala011 = new Shot(enemie.posX, enemie.posY);
                    this.fire.push(bala011)
                }) 
                
            }*/
            if (this.iteracion == 200){
                let enemigo1 = new Enemies(naveEnemiga001);
                this.enemies.push(enemigo1);
                let bala1 = new Shot(enemigo1.posX, enemigo1.posY);
                this.fire.push(bala1)
                
                /* this.fire.forEach((bala) => {
                    bala.crearBala()
                    this.fire.push(bala)

                }) */

            }
            
            if(this.iteracion == 350){
                let enemigo3 = new Enemies(naveEnemiga003);
                this.enemies.push(enemigo3);
                let bala3 = new Shot(enemigo3.posX, enemigo3.posY);
                this.fire.push(bala3)
                /* this.fire.forEach((bala) => {
                    bala.crearBala()
                }) */
                this.iteracion = 0
            }
            
            this.enemies.forEach((enemie) => {
                enemie.move();

                if (!(
                    this.player1.posX + this.player1.width < enemie.posX + 20||
                    this.player1.posX - 8 > enemie.posX + enemie.width ||
                    this.player1.posY + 20 > enemie.posY + enemie.height ||
                    this.player1.posY + this.player1.height <= enemie.posY + 20
                )){ 
                    this.end()
                }
            })
            this.fire.forEach(bala => {
                bala.move()
            })
            
            /* if (this.contadorBalas == 500){
                this.enemies.forEach((enemie) => {
                    enemie.bala();
                })
                this.contadorBalas = 0;
              } */
            
        }

        score(){
            let record = document.getElementById('scoreKeeper').innerHTML;
            //if (){ return record += 100}
        };
    }



    let partida = new Game();

    partida.start();

    document.getElementsByTagName("body")[0].addEventListener("keydown",(event) => { //console.log(event.offsetX)
        switch(event.key){
          case "ArrowUp":
            partida.player1.moveUp()
            break;
          case "ArrowDown":
            partida.player1.moveDown()
            break;
            case "a":
            partida.player1.shot()
            break;
        }
      })


})