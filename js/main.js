let game = new Phaser.Game(1580, 780, Phaser.AUTO, 'game',
        {preload: preload, create: create, update: update, render: render});

//

var widthWindow = 780;
var heightWindow = 1580;
var heightMap = 3078;
var widthMap = 4000;

var floorGroup, obstacleGroup ,grassGroup, itemsGroup, turretGroup, isoGroup;

var player;
var life = 100;
var loose = 0;
var win = 0;
var ennemy = [];
var lightState = 0;
var counter = counterMax = 160;
var text = 0;
var energy = 100;
var energyLosingValue = 0.07;
var mask;
var wave = false;
var nbEnnemies = 1;
var fire = 0;
var wood = 4;

var turrets = [];
var turretCreated = 0; 

lifeCampFire=energy/2;


function updateCounter() {

    if(counter > 0 && loose == 0){
        counter--;
    }
    text.setText('Tentez de survive : ' + counter + ' secondes');

}

// generate random number
function rndNum(num) {
    return Math.round(Math.random() * num);
}

function addAnimationToSprites()
{
    skeleton.animations.add('walkRight', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 10, true);
    skeleton.animations.add('walkLeft', [25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13], 10, true);
}

function animationLightCamp(_lightCamp)
{

    if(_lightCamp.frame == 21)
    {
        _lightCamp.animations.play('lightCampAnimationGrow');
  
    }else if (_lightCamp.frame == 0)
    {
        _lightCamp.animations.play('lightCampAnimationDecrease');
    }    
}

function rechargeLight(_lightCamp)
{
    if((player.position.x - 100) > _lightCamp.position.x 
        && (player.position.x - 100) < _lightCamp.position.x + 100 
        && player.position.y - 100 > _lightCamp.position.y 
        && player.position.y - 100 < _lightCamp.position.y + 100
        && energy < 100)
    {
        if(energy + 5 > 100)
        {
            energy = 100;
        }else
        {
            energy += 30;
 
        }

    _lightCamp.isoPosition.x = rndNum(1600); 
    _lightCamp.isoPosition.y = rndNum(1600);     
       
    }

    
    
}

function updateLightAreaSize(energy)
{
    mask.clear();
    mask.beginFill(0xffffff);
    mask.drawCircle(100, 100, energy*6);
    lifeCampFire-=1;
    mask.endFill();
}

function campFireLightAreaSize(energy)
{
    mask.clear();
    mask.beginFill(0xffffff);
    mask.drawCircle(100, 100, energy*6);
    mask.endFill();
}

function collisionHandler (player, chest) 
{
    chest.kill();
    getRandomItem(rndNum(3));
}

function collisionHandlerBulletsEnnemy(_bullet, _ennemy) 
{
    _ennemy.destroy();
    _bullet.destroy();
    console.log("collisionHandler Bullets/Ennemy");
}













function preload() 
{
    game.load.image('sand', 'assets/graphics/sand.png');
    game.load.image('ground', 'assets/graphics/ground_tile.png');

    game.load.image('grass1', 'assets/graphics/ground_tile_grass1.png');
    game.load.image('grass2', 'assets/graphics/ground_tile_grass2.png');
    game.load.image('grass3', 'assets/graphics/ground_tile_grass3.png');

    game.load.image('bullet', 'assets/graphics/bullet.png');

    game.load.spritesheet('characterAnim', 'assets/graphics/characterAnim.png', 70, 74);
    game.load.spritesheet('skeleton', 'assets/graphics/skeleton/SpriteSheets/skeleton_walk.png', 22, 33);

    game.load.spritesheet('lightCamp', 'assets/graphics/lightCamp.png', 191, 189);

    game.load.spritesheet('turret', 'assets/graphics/turretModif3.png', 44, 44);
    game.load.image('chest', 'assets/graphics/chest01.png');


    game.stage.scale.pageAlignHorizontally = true;
    // Add the Isometric plug-in to Phaser
    game.plugins.add(new Phaser.Plugin.Isometric(game));
    // Set the world size
    game.world.setBounds(0, 0, widthMap, heightMap);
    // Start the physical system
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
     // set the middle of the world in the middle of the screen
    game.iso.anchor.setTo(0.5, 0);

};

function create() 
{
    var that = this;
    mask = game.add.graphics(0, 0);


    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.isoArcade.gravity.setTo(0, 0, -500);



    //Couleur de fond
    //game.stage.backgroundColor = "#DFE2CF";

    // --------- Init GROUP CALQUES --------- \\
    isoGroup = game.add.group();
    floorGroup = game.add.group();
    grassGroup = game.add.group();
    itemsGroup = game.add.group();
    obstacleGroup = game.add.group();
    turretGroup = game.add.group();


        // ------------   WEAPON  ---------------- \\ 
    weapon = game.add.weapon(30, 'bullet');
    game.world.bringToTop(weapon.bullets);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletAngleOffset = 0;
    weapon.bulletSpeed = 500;
    weapon.fireRate = 1500;
    weapon.autofire = true;

    
    game.physics.isoArcade.enable(itemsGroup);
    game.physics.isoArcade.enable(obstacleGroup);
    game.physics.isoArcade.enable(turretGroup);
    //game.physics.isoArcade.enable(bulletsGroup);
  
    // ---------  MASK --------- \\
    floorGroup.mask = mask;
    grassGroup.mask = mask;
    obstacleGroup.mask = mask;
    itemsGroup.mask = mask;
    turretGroup.mask = mask;
    isoGroup.mask = mask;
    weapon.mask = mask; 

    floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, isoGroup);
    floorTile.anchor.set(0.5);

    lightCamp = game.add.isoSprite(1000, 700, 0, 'lightCamp', 0, obstacleGroup);
    lightCamp.animations.add('lightCampAnimationGrow', [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
    lightCamp.animations.add('lightCampAnimationDecrease', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 10, true);
    lightCamp.frame = 0;

    

    lightCamp2 = game.add.isoSprite(500, 1500, 0, 'lightCamp', 0, obstacleGroup);
    lightCamp2.animations.add('lightCampAnimationGrow', [21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
    lightCamp2.animations.add('lightCampAnimationDecrease', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 10, true);
    lightCamp2.frame = 0;


    // TIMER
    text = game.add.text(widthWindow , 20, 'Try to survive :  ' + counter + ' seconds', { font: "28px Arial", fill: "white", align: "center" });
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    text.fixedToCamera = true;
    text.anchor.setTo(0.5, 0.5);



    // PLAYER
    player = game.add.isoSprite(900, 600, 0, 'characterAnim', 0, obstacleGroup);
    player.scale.setTo(0.5, 0.5);
    game.physics.isoArcade.enable(player);
        // Permet au sprite de ne pas tomber dans le vide
    player.body.collideWorldBounds = true;

   
    // add the ANIMATIONS from the spritesheet
    player.animations.add('S', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    player.animations.add('SW', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    player.animations.add('W', [16, 17, 18, 19, 20, 21, 22, 23], 10, true);
    player.animations.add('NW', [24, 25, 26, 27, 28, 29, 30, 31], 10, true);
    player.animations.add('N', [32, 33, 34, 35, 36, 37, 38, 39], 10, true);
    player.animations.add('NE', [40, 41, 42, 43, 44, 45, 46, 47], 10, true);
    player.animations.add('E', [48, 49, 50, 51, 52, 53, 54, 55], 10, true);
    player.animations.add('SE', [56, 57, 58, 59, 60, 61, 62, 63], 10, true);
     
    player.anchor.set(0.5);


    // ---------- CREATION DE LA MAP ---------- \\
    for (var xt = 2300; xt > 0; xt -= 32) 
    {
        for (var yt = 2300; yt > 0; yt -= 32) 
        {
            floorTile = game.add.isoSprite(xt, yt, 0, 'ground', 0, isoGroup);
            floorTile.anchor.set(0.5, 0);
        }
    }

    // create the grass tiles randomly
    var grassTile;
    for (var xt = 2048; xt > 0; xt -= 32) {
        for (var yt = 2048; yt > 0; yt -= 32) {
            
            var rnd = rndNum(20);
            
            if (rnd == 0) {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass1', 0, grassGroup);
                grassTile.anchor.set(0.5);
            }
            else if (rnd == 1)
            {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass2', 0, grassGroup);
                grassTile.anchor.set(0.5);
            }
            else if (rnd == 2)
            {
                grassTile = game.add.isoSprite(xt, yt, 0, 'grass3', 0, grassGroup);
                grassTile.anchor.set(0.5);
            }
            
            

        }
    }

    // --------------  HEALTHBAR -------------- \\ 
    var barConfig = 
    {
        x: 100, 
        y: 100, 
        width:200, 
        height:30,
        bg: {
            color: 'red'
        }, 
        bar : 
        { 
            color : 'green'
        }
    };
    this.myHealthBar = new HealthBar(game, barConfig);
    this.myHealthBar.setPercent(100); 

    // -------------- LIGHT BAR -------------- \\

    this.lightBar = new HealthBar(game, 
        {
            x: 100, 
            y: 200, 
            width: 200,
            height: 30, 
            bg: 
            {
                color: 'black'

            },
            bar : 
            {
                color : 'white'
            }

        });
    this.lightBar.setPercent(energy); 


   
    setInterval(function(){
        if(energy > 0 && win == 0 && loose == 0)
        {
            if(energy > 20)
            {
                energy -= energyLosingValue;
            }else if(energy > 15 )
            {
                energy -= energyLosingValue*2;
            }else if(energy > 8)
            {
                energy -= energyLosingValue*4;
            }else if(energy > 0)
            {
                energy -= energyLosingValue*10;
            }
            
            that.lightBar.setPercent(energy);
            updateLightAreaSize(energy);
        }            
    }, energyLosingValue*100);
    

    generateChest(3);
    setInterval(function(){
        generateChest(1);
    }, 20000);
    

    // ----------- WAVES ------------- \\
    // -------------------------------- \\

    waveInterval;


    // ------------- KEYBOARD ----------------- \\ 
    // ---------------------------------- \\

    cursors = this.input.keyboard.createCursorKeys();
    jump = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    leftButton = this.input.keyboard.addKey(Phaser.KeyCode.Q);
    downButton = this.input.keyboard.addKey(Phaser.KeyCode.S);
    upButton = this.input.keyboard.addKey(Phaser.KeyCode.Z);
    rightButton = this.input.keyboard.addKey(Phaser.KeyCode.D);

    // Provide a 3D position for the cursor
    cursorPos = new Phaser.Plugin.Isometric.Point3();

    game.camera.follow(player);
};
function update() 
{
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    this.myHealthBar.setPosition(this.camera.position.x + 130,this.camera.position.y + 60);
    this.lightBar.setPosition(this.camera.position.x + 130,this.camera.position.y + 100);


    mask.x = player.position.x - 100;
    mask.y = player.position.y - 100;

    var that = this;


    // TURRETS : AUTOMATIC FIRE 
    if(turretCreated)
    {  
        for(let i = 0 ; i < turrets.length ; i ++)
        {
            console.log("Feu !");
            weapon.trackSprite(turrets[i], 40, 2, true);
        }
    }




    // ------------------ POINTER INTERACTION TILE ------------------------- \\
    // ---------------------------------------------------------- \\
    game.iso.unproject(game.input.activePointer.position, cursorPos);
    // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
    isoGroup.forEach(function (floorTile) {
        var inBounds = floorTile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
        // If it does, do a little animation and tint change.
        if (!floorTile.selected && inBounds) {
            floorTile.selected = true;
            floorTile.tint = 0x86bfda;
            game.add.tween(floorTile).to({ isoZ: 10 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
        // If not, revert back to how it was.
        else if (floorTile.selected && !inBounds) {
            floorTile.selected = false;
            floorTile.tint = 0xffffff;
            game.add.tween(floorTile).to({ isoZ: 0 }, 200, Phaser.Easing.Quadratic.InOut, true);
        }
    });
 

        // ------------------ COLLIDE EVENT ------------------------- \\
    // ---------------------------------------------------------- \\
    game.physics.isoArcade.collide(player, obstacleGroup, function(){
        console.log(life);
        if(win == 0)
        {
            life -= 5;
        }

        that.myHealthBar.setPercent(life); 
    });

    game.physics.arcade.collide(weapon.bullets, obstacleGroup,  collisionHandlerBulletsEnnemy, null, this);

    game.physics.isoArcade.overlap(player, itemsGroup, collisionHandler, null, this);
    game.physics.isoArcade.collide(player, turretGroup);


    if(window.onfocus){
        animationLightCamp(lightCamp);
        animationLightCamp(lightCamp2);
        rechargeLight(lightCamp);
        rechargeLight(lightCamp2);
        gameOver();
        winFunction();
        keyboardPlayer();
    }


    
};

function render() 
{
};
