
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// const audio = new Audio("imagenes/bso.mp3");
// audio.play();

const background = new Image();
background.src = "imagenes/bkg.png";

let navePlayer = document.createElement("img");
navePlayer.src = "imagenes/player1.png";

let naveEnemiga1 = document.createElement("img");
naveEnemiga1.src = "imagenes/enemigo1.png";

let naveEnemiga2 = document.createElement("img");
naveEnemiga2.src = "imagenes/enemigo2.png";

let naveEnemiga3 = document.createElement("img");
naveEnemiga3.src = "imagenes/enemigo3.png";

let naveEnemiga4 = document.createElement("img");
naveEnemiga4.src = "imagenes/enemigo4.png";

window.addEventListener("load", () => {
   class Player1 {
     constructor() {
        this.posX = 55;
        this.posY = 460;
        this.width = 100;
        this.height = 100;
        this.velocidadPos = 30;
        //this.velocidadDisp = 'valor';
      }
      print() {
        ctx.drawImage(
          navePlayer,
          this.posX,
          this.posY,
          this.width,
          this.height
        );
      }

      moveUp() {
        this.posY -= this.velocidadPos;
        if (this.posY < 0) return (this.posY = 0);
      }
      moveDown() {
        this.posY += this.velocidadPos;
        if (this.posY > canvas.height - this.height)
          return (this.posY = canvas.height - this.height);
      }

      shotprint1() {
        //+++++++++++++++++++++++++++++++++++llegada impresion balaen player
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.fill(
          ctx.arc(
            this.posX,
            this.posY,
            this.radio,
            this.startAngle,
            this.endAngle,
            this.velocidadX,
            this.velocidadY
          )
        );
        ctx.stroke();
      }
    }

    class Enemie2 {
      constructor() {
        this.posX = canvas.width + 250;
        this.posY = Math.floor(Math.random * canvas.height - 100);
        this.width = 80;
        this.height = 80;
        this.velocidadPos = Math.random() * 1 + 1;

        //this.velocidadDisp = 'valor';
      }

      print() {
        ctx.drawImage(
          naveEnemiga1,
          this.posX,
          this.posY,
          this.width,
          this.height
        );
      }

      move() {
        this.posX -= this.velocidadPos;
      }

      shotprint2() {
        //+++++++++++++++++++++++++++++++++++llegada impresion balaen emigo
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fill(
          ctx.arc(
            this.posX,
            this.posY,
            this.radio,
            this.startAngle,
            this.endAngle,
            this.velocidadX,
            this.velocidadY
          )
        );
        ctx.stroke();
      }
    }

    class Bullets {
      constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
        this.radio = 5;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.velocidadX = 5;
        this.velocidadY = 25;
      }

      move(bollet001, bollet002) {
        if (bollet001) {
          this.posX += this.velocidadPos;
        }
        if (bollet002) {
          this.posX -= this.velocidadX;
        }
      }
    }

    class Game {
      constructor() {
        this.player1 = new Player1();
        this.player1.print();
        this.enemie2 = [];
        this.bulletArrEnemy = []; //+++++++++++++++++++++++array bullets enemy
        this.bulletArrPlayer = []; //+++++++++++++++++++++++array bullets player
        this.score = 0;
        this.intervalId = undefined;
        this.iteracion = 0;
      }

      start() {
        if (this.intervalId == undefined) {
          this.intervalId = setInterval(() => {
            this.iteracion++;
            //borra
            this.clear();
            //recalcula + genera obstaculos
            this.recalcular();
            //pinta
            this.print();
          }, 20);
        }
      }

      end() {
        if (this.intervalId) clearInterval(this.intervalId);
      }

      clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      print() {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        this.player1.print();
        this.enemie2.forEach((enemie02) => {
          //++++++++++++++++++++++++forEache print signal
          enemie02.print();
        });
        this.bulletArrPlayer.forEach((bullet01) => {
          bullet01.shotprint1();
        });

        this.bulletArrEnemy.forEach((bullet02) => {
          bullet02.shotprint2();
        });
      }

      recalcular() {
        if (this.iteracion % 25 == 0) {
          let enemigo2 = new Enemie2();
          this.enemie2.push(enemigo2);
          this.iteracion = 0;
        }
        if (this.iteration % 10 == 0) {
          let bulletEnemy002 = new Bullets(); //++++++crear bullet+ push al array/enemy
          this.bulletArrEnemy.push(bulletEnemy002);
          let bulletPlayer001 = new Bullets(); // +++++++++crear bullet+ push to array/player
          this.bulletArrPlayer.push(bulletPlayer001);
        }

        this.enemie2.forEach((enemie002) => {
          enemie002.move();
        });

        // this.bulletarr.forEach((bollet001) => {
        //   bollet001.move(bollet001); //+++++++++++++++++++++++señal movimiento
        // });
        // this.bulletarr.forEach((bollet002) => {
        //   bollet002.move(bollet002); //+++++++++++++++++++++++señal movimiento
        // });

        //   if (!(
        //     this.player1.posX + this.player1.width <= Enemie1.posX + 20||
        //     this.player1.posX > Enemie1.posX + Enemie1.width ||
        //     this.player1.posY > Enemie1.posY + Enemie1.height ||
        //     this.player1.posY + this.player1.height <= Enemie1.posY + 20
        // )){
        //     this.end()
        // }
      }
    }

    let partida = new Game();

    partida.start();

    document
      .getElementsByTagName("body")[0]
      .addEventListener("keydown", (event) => {
        switch (event.key) {
          case "ArrowUp":
            partida.player1.moveUp();
            break;
          case "ArrowDown":
            partida.player1.moveDown();
            break;
        }
      });
  });


