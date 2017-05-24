let game = new Phaser.Game(4096, 4096, Phaser.AUTO, 'game',
        {preload: preload, create: create, update: update, render: render});

var floorGroup;
var obstacleGroup;
var player;

function preload() 
{
	game.load.image('sand', 'assets/graphics/sand.png');
    game.load.image('ground', 'assets/graphics/ground_tile.png');
    game.load.spritesheet('characterAnim', 'assets/graphics/characterAnim.png', 70, 74);



	// Add the Isometric plug-in to Phaser
	    game.plugins.add(new Phaser.Plugin.Isometric(game));
	// Set the world size
	    game.world.setBounds(0, 0, 4096, 4096);
	// Start the physical system
	    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
	 // set the middle of the world in the middle of the screen
	    game.iso.anchor.setTo(0.5, 0);

	// Start the physical system
	    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);    

};

function create() 
{
	// Couleur de fond
	game.stage.backgroundColor = "#DFE2CF";
	
	// Init des groupes de calques
	floorGroup = game.add.group();
	obstacleGroup = game.add.group();

	let floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, floorGroup);
   	floorTile.anchor.set(0.5);
   	player = game.add.isoSprite(350, 280, 0, 'characterAnim', 0, obstacleGroup);

   	// Init physic
   	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.isoArcade.gravity.setTo(0, 0, -500);

   	// add the animations from the spritesheet
    player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    player.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
     

    // enable physics on the player
    game.physics.isoArcade.enable(player);
    player.body.collideWorldBounds = true;
    player.anchor.set(0.5);
 

    // Création du sol
    for (var xt = 2048; xt > 0; xt -= 32) 
    {
        for (var yt = 2048; yt > 0; yt -= 32) 
        {
        	floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, floorGroup);
        	floorTile.anchor.set(0.5);
        }
    }

    game.camera.follow(player);


    // ---------- KEYBOARD ------------- \\ 
    cursors = this.input.keyboard.createCursorKeys();
    //jump = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    leftButton = this.input.keyboard.addKey(Phaser.KeyCode.Q);
    downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
    upButton = this.input.keyboard.addKey(Phaser.KeyCode.Z);
    rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);

};
function update() 
{
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;

	 if (cursors.left.isDown || leftButton.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -300;

        //spriteCharacter.animations.play('walkLeft');
    } else if (cursors.right.isDown || rightButton.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 300;


        //spriteCharacter.animations.play('walkRight');
    } else if (cursors.up.isDown || upButton.isDown)
    {
        //  Stand still
        player.body.velocity.y = -300;
        //player.animations.stop();

    } else if (cursors.down.isDown || downButton.isDown)
    {
    	player.body.velocity.y = 300;
    }
    //else
    // {
    //     //  Stand still
    //     player.animations.stop();

    // }
};
function render() {};
