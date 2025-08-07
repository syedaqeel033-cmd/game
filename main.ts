let smoke: Sprite = null
let trashbag: Sprite = null

// Intro
game.showLongText("WELCOME TO ECO RUNNER", DialogLayout.Center)

// Setup background, score, lives
scene.setBackgroundColor(7)
info.setScore(0)
info.setLife(3)

// Create Player
let player = sprites.create(assets.image`Person`, SpriteKind.Player)
player.setPosition(20, 60)
controller.moveSprite(player)
player.setStayInScreen(true)

// Collision: Catch Trash
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (player, trashbag) {
    trashbag.destroy()
    music.baDing.play()
    info.changeScoreBy(1)
})

// Collision: Hit Smoke
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player, smoke) {
    smoke.destroy()
    music.wawawawaa.play()
    info.changeLifeBy(-1)
})

// Game Loop
game.onUpdateInterval(1000, function () {
    let randomChance = Math.percentChance(50) // 50% chance

    if (randomChance) {
        // Trashbag (Good)
        trashbag = sprites.create(assets.image`Trashbag`, SpriteKind.Food)
        trashbag.setPosition(160, randint(20, 100))
        trashbag.setVelocity(-50, 0)
    } else {
        // Smoke (Bad)
        smoke = sprites.create(img`Smoke`, SpriteKind.Enemy)
        smoke.setPosition(160, randint(70, 110))
        smoke.setVelocity(-70, 0)
    }
})

