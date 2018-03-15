/* globals __DEV__ */
import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'
import Ball from '../prefabs/Ball'


export default class extends Phaser.State {

  constructor() {
      super();

      this.ballOnPaddle = true;
  }

  init () {}
  preload () {}

  create () {
      this.setUpText();
      this.setUpBricks();
      this.setUpPaddle();
      this.setUpBall();

      this.game.input.onDown.add(this.releaseBall, this);
  }

  releaseBall() {

      //do not allow second release if ball already launched
      if(!this.ballOnPaddle) {
        return;
      }

      //unstick from paddle
      this.ballOnPaddle = false;

      this.ball.body.velocity.x = -30;
      this.ball.body.velocity.y = -350;
  }

  setUpBall() {
      this.ball = new Ball(this.game);

      //add new ball to game world
      this.game.add.existing(this.ball);

      this.putBallOnPaddle();
  }

  putBallOnPaddle() {
      this.ballOnPaddle = true;

      this.ball.reset(this.paddle.body.x, this.paddle.body.y - this.paddle.body.height);
  }

  setUpPaddle() {
      this.paddle = new Paddle (
          this.game,
          this.game.world.centerX,
          this.game.world.height - 70
      )

      this.game.add.existing(this.paddle);
  }

  setUpBricks() {
      //group bricks for mass event handling
      this.bricks = this.game.add.group();
      this.generateBricks(this.bricks);
  }

  generateBricks(bricksGroup) {
      let rows = 5;
      let cols = 15;

      //brick spacing offset
      let xOffset = 70;
      let yOffset = 45;

      let brick;

      for(let i = 0; i<rows; i++) {
          for(let j = 0; j<cols; j++) {
               brick =  new Brick(this.game, j * xOffset, i * yOffset);

              //add newly positioned brick to the group
              bricksGroup.add(brick);
          }

      }
          //position the brick grouping
          let bricksGroupWidth = ((xOffset * cols) - (xOffset - brick.width))/2;
          bricksGroup.position.setTo(
              this.game.world.centerX - bricksGroupWidth,
              this.game.world.centerY - 250
          );
  }

  setUpText() {
      this.scoreText = this.createText(20,20, 'left', `Score: ${this.game.global.score}`);
      this.livesText = this.createText(20,40, 'left', `Lives: ${this.game.global.lives}`);
      this.levelText = this.createText(-20,20, 'right', `Level: ${this.game.global.level}`);
  }

  createText(xOffset, yOffset, align, text) {
     return this.game.add
      .text(
          xOffset,
          yOffset,
          text, {
              font: '18px Arial',
               fill: '#000',
                boundsAlignH: align
                }
            ).setTextBounds(0,0,this.game.world.width, 0)
  }

  update() {
      if(this.ballOnPaddle) {

          //casue ball drag behind paddle at start
          this.ball.body.x = this.paddle.x - (this.ball.body.width/2);
      }

      //collision detection

      //ball -> paddle
      this.game.physics.arcade.collide(
          this.ball, //host object
          this.paddle, // target collision object
          this.ballHitPaddle, //triggered method
          null,
          this          //reference game world
      )

      //ball -> brick
      this.game.physics.arcade.collide(
          this.ball, //host object
          this.bricks, // target collision object
          this.ballHitBrick, //triggered method
          null,
          this          //reference game world
      )
  }

  ballHitPaddle(ball, paddle) {
      let diff = 0;

      //if ball collides with left side of paddle
      if(ball.x < paddle.x) {
          diff = paddle.x - ball.x;
          ball.body.velocity.x = (-10 * diff);
      }

      //if ball collides with right side of paddle
      if(ball.x > paddle.x) {
          diff = ball.x - paddle.x;
          ball.body.velocity.x = (10 * diff);
      }
  }

  ballHitBrick(ball, brick) {
      //destroy upon collision
      brick.kill();

      this.game.global.score += 10;

      this.scoreText.text = `Score: ${this.game.global.score}`;
  }

  render () {

  }
}
