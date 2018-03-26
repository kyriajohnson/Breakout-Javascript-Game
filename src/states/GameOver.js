import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}

  preload () {


  }

  create () {
      let text = this.add.text(
          this.game.width * 0.5, this.game.height * 0.5,
          `Game Over :( \n\n You reached level ${this.game.global.level} with a score of ${this.game.global.score}`,
          {
              font:'24px Ariel',
              fill: '#000',
              align: 'center'
          }

      )

     text.anchor.set(0.5);
  }
}
