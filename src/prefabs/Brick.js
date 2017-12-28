import Phaser from 'phaser'

class Brick extends Phaser.Sprite {

    constructor(game, x , y) {
        super(game, x, y, 'brick');

        //enable physics for this object
        this.game.physics.arcade.enableBody(this);

        //flag as a static game object
        this.body.immovable = true;
    }

}
export default Brick
