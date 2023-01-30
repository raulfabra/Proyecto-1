const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const background = new Image();
background.src = "imagenes/bkg.png";

let navePlayer = document.createElement("img");
navePlayer.src = "imagenes/player1.png";

let naveEnemiga = document.createElement("img");
naveEnemiga.src = "imagenes/enemigo1.png";

window.addEventListener("load", () => {
  class Player {
    constructor() {
      this.posX = 5;
      this.posY = 460;
      this.width = 100;
      this.height = 100;
      this.velocidadPos = 30;
      //this.velocidadDisp = 'valor';
    }
    print() {
      ctx.drawImage(navePlayer, this.posX, this.posY, this.width, this.height);
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

    shot() {}
  }

  class Enemies {
    constructor() {
      this.posX = canvas.width - 150;
      this.posY = canvas.height / 2; //Math.floor(Math.random * canvas.height)
      this.width = 80;
      this.height = 80;
      this.velocidadPos = 5;
      //this.velocidadDisp = 'valor';
    }

    print() {
      ctx.drawImage(naveEnemiga, this.posX, this.posY, this.width, this.height);
    }

    move() {
      this.posX -= this.velocidadPos;
    }

    shot() {}
  }

  class Game {
    constructor() {
      this.player1 = new Player();
      this.player1.print();
      this.enemies = [];
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
      this.enemies.forEach((enemie) => {
        enemie.print();
      });
    }

    recalcular() {
      if (this.iteracion == 70) {
        let enemigo1 = new Enemies();
        this.enemies.push(enemigo1);
        this.iteracion = 0;
      }
      this.enemies.forEach((enemie) => {
        enemie.move();
      });
      /*
                if (!(
                    this.player1.x + this.player1.width < enemie.x ||
                    this.player1.x > enemie.x + enemie.width ||
                    this.player1.y > enemie.y + enemie.height ||
                    this.player1.y + this.player1.height < enemie.y
                )){ 
                    this.end()
                }
            })*/
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
