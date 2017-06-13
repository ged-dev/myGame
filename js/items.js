function generateChest(number){
	for(let i = 0 ; i < number ; i++){
		chest = game.add.isoSprite(rndNum(2000), rndNum(2000), 0, 'chest', 0, itemsGroup);
		game.physics.isoArcade.enable(chest);
		chest.body.collideWorldBounds = true;
		chest.frame = 1;
		//chest.anchor.set(0.5);
		game.physics.isoArcade.overlap(chest, player, function(e){
        e.destroy();
    });
	}
}

function getRandomItem(number)
{
    console.log("number = " + number);
    if(number == 0)
    {
        energy+=10;
        textFire = game.add.text(widthWindow - 220, 180, 'Energie + 10', { font: "26px Arial", fill: "green", align: "center" });
        textFire.fixedToCamera = true;
        textFire.alpha = 0.1;
        textFire2 = game.add.tween(textFire).to( { alpha: 1 }, 800, "Linear", true);
        textFire2.onComplete.add(function(){
        	game.add.tween(textFire).to( { alpha: 0 }, 900, "Linear", true);
        	}, this)
        console.log("fire[0] " + fire);
    }else if(number == 1)
    {
        wood++;
        woodText = game.add.text(widthWindow - 220, 180, 'Fer + 1', { font: "26px Arial", fill: "green", align: "center" });
        woodText.fixedToCamera = true;
        woodText.alpha = 0.1;
        woodText2 = game.add.tween(woodText).to( { alpha: 1 }, 800, "Linear", true);
        woodText2.onComplete.add(function(){
        	game.add.tween(woodText).to( { alpha: 0 }, 900, "Linear", true);
        	}, this)
        console.log("wood[1] " + wood);
    }else
    {
    	emptyText = game.add.text(widthWindow - 220, 180, 'Le coffre était vide, dommage', { font: "26px Arial", fill: "red", align: "center" });
        emptyText.fixedToCamera = true;
        emptyText.alpha = 0.1;
        emptyText2 = game.add.tween(emptyText).to( { alpha: 1 }, 800, "Linear", true);
        emptyText2.onComplete.add(function(){
        	game.add.tween(emptyText).to( { alpha: 0 }, 2500, "Linear", true);
        	}, this)
    }
}