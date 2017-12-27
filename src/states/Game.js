/* globals __DEV__ */
import Phaser from 'phaser'


export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
      this.setUpText();
  }

  setUpText() {
      this.createText(20,20, 'left', `Score: x`)
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
