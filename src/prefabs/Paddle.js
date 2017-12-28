import Phaser from 'phaser'

class Paddle extends Phaser.Sprite {

    constructor(game, x , y) {
        super(game, x, y, 'paddle');

        //enable physics for this object
        this.game.physics.arcade.enableBody(this);

        //anchoring to ensure correct positioning at render
        this.anchor.setTo(0.5,0.5);

        //flag as static for the sake of preventing collision event redraw
        this.body.immovable = true;
    }

    //facilitate movement
    update() {
        //bind x position of paddle to mouse x position
        this.x = this.game.input.x;

        // force stop at edge of screen
        if(this.x < this.width/2) {

            this.x = this.width/2;

        } else if(this.x > this.game.width - this.width/2) {

            this.x = this.game.width - this.width/2;

        }
    }

}
export default Paddle
