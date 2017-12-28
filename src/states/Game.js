/* globals __DEV__ */
import Phaser from 'phaser'
import Brick from '../prefabs/Brick'
import Paddle from '../prefabs/Paddle'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
      this.setUpText();
      this.setUpBricks();
      this.setUpPaddle();
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
      this.createText(20,20, 'left', `Score: ${this.game.global.score}`);
      this.createText(20,40, 'left', `Lives: ${this.game.global.lives}`);
      this.createText(-20,20, 'right', `Level: ${this.game.global.level}`);
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

  render () {

  }
}
