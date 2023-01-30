# Battle in Space

Developed as the first project of my web development bootcamp at Ironhack Barcelona.

## About us

Hi! My name is Andrea. I'm a designer and a web developer. This project is a Car Race game for web browsers developed with JavaScript and Canvas.

## Deployment

You can play the game [here](#).

## Work structure

I developed this project alone and used [Trello](https://trello.com/home) to organize my workflow.

## About the game

In Canvas Race Car you control a car that is driving through a highway and has to avoid the obstacles that are approaching it.

## Controls

To play the game use the ArrowLeft key and the ArrowRight key to move the car in the direction you desire.

## Win condition

Dodge 50 obstacles.

## Lose condition

Collision with an obstacle.

## Classes

|   Class   | Properties                                                            | Methods                                          |
| :-------: | --------------------------------------------------------------------- | ------------------------------------------------ |
|   Coche   | x, y, w, h, vel, imgCoche                                             | print(ctx), moveIzq(), moveDer()                 |
| Obstaculo | x, y, w, h, vel, color                                                | print(ctx), move()                               |
|   Juego   | canvas, ctx, roadImg, coche, obstaculos, score, intervalId, iteracion | start(), stop(), clear(), print(), recalculate() |

---

Any doubts? Contact me!
<a href="https://www.behance.net/afabregasm"><img align="right" width="20px" src="https://simpleicons.now.sh/behance/495f7e" alt="Andrea's Behance" /></a>
<a href="https://www.linkedin.com/in/afabregasm"><img align="right" width="20px" src="https://simpleicons.now.sh/linkedin/495f7e" alt="Andrea's LinkedIn" /></a>
<a href="mailto:contact@afabregasm.com"><img align="right" width="20px" src="https://simpleicons.now.sh/maildotru/495f7e" alt="Andrea's Facebook" /></a>