# Battle in Space

Developed as the first project of our web development bootcamp at Ironhack Barcelona.

## About us

This project has been developed by Raul and Ruben who are following a web developement course in Ironhack.

## Deployment

You can play the game [here](#).

## Work structure

The project implementation steps has been structured following [Trello](https://trello.com/home) workflow.

## About the game

It's based on the world of StarWars, in which there one spaceship that need to resists against the incoming attacks of groups of enemies.

## Controls

To play the game, use the `Arrows` to move the spaceship in the direction you prefer, and with `tab` you shoot the boolets to kill the enemy.

## Win condition

The player need to gain 1000 points to be a winner. Every time a player kills an enemy will gain 100 poins

## Lose condition

When a player get a collision with an enemy or player points reaches to Zero(0).

## Classes

|    Class    | Properties                                                    | Methods                                                 |
| :---------: | ------------------------------------------------------------- | ------------------------------------------------------- |
| **Player**  | `x, y, w, h, vel, imgPlayer`                                  | `print(ctx), moveIzq(), moveDer(), moveArr(),moveabj()` |
| **Enemies** | `x, y, w, h, vel, imgEnemy1,imgEnemy3; img explotion`         | `print(ctx), move(),dead()`                             |
|  **Shoot**  | `x, y, r, startAngle, endAngle, vel`                          | `moveIzq(), moveDer(), print()`                         |
|  **Game**   | `player1, enemi[], fire[], score, life, interval & iteration` | `start(), end(), clear(), print(), recalculate()`       |
