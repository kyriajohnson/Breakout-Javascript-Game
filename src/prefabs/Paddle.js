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

        //forces paddle to start in middle of screen
        //don't want to follow mouse input at game start
        if(this.game.input.x === 0) {
            return;
        }

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
