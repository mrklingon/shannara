input.onButtonPressed(Button.A, function () {
    loc = (loc + 99) % 100
    led.unplot(1, 4)
    led.unplot(1, 3)
    showLND(loc)
})
function hitskull (locat: number) {
    cur = (locat + 1) % 100
    skl[cur] = 0
    showLND(locat)
}
function mkLand () {
    lnd = []
    for (let index = 0; index < 100; index++) {
        lnd.push(randint(0, 2))
    }
    skl = []
    for (let index = 0; index < 100; index++) {
        if (8 < randint(0, 20)) {
            skl.push(1)
        } else {
            skl.push(0)
        }
    }
    Sword = randint(33, 66)
    if (Sword < 0) {
        lnd[100 + Sword] = 3
    } else {
        lnd[Sword] = 3
    }
}
input.onButtonPressed(Button.AB, function () {
    if (chkSkull(loc)) {
        hitskull(loc)
        basic.showIcon(IconNames.Target)
        basic.pause(100)
        basic.showIcon(IconNames.Diamond)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        skore = skore + 5 * randint(3, 7)
        showLND(loc)
    }
    showLND(loc)
})
input.onButtonPressed(Button.B, function () {
    loc = (loc + 101) % 100
    led.unplot(1, 4)
    led.unplot(1, 3)
    showLND(loc)
})
function chkSkull (locat: number) {
    cur = (locat + 1) % 100
    if (skl[cur] == 0) {
        return false
    } else {
        return true
    }
}
function showLND (locat: number) {
    for (let index = 0; index <= 4; index++) {
        spot = lnd[(locat + index) % 100]
        skspot = skl[(locat + index) % 100]
        if (spot == 2) {
            led.plotBrightness(index, 3, 47)
        }
        if (spot > 0) {
            led.plotBrightness(index, 4, 47)
        } else {
            led.unplot(index, 4)
            led.unplot(index, 3)
        }
        if (skspot != 0) {
            led.plotBrightness(index, 0, 141)
        } else {
            led.unplot(index, 0)
        }
        if (spot == 3) {
            led.plot(index, 2)
            led.plot(index, 3)
            led.plot(index, 4)
            if (index == 2) {
                game.setScore(1000 + skore)
                game.gameOver()
            }
        }
    }
    led.plot(1, 3)
    led.plot(1, 4)
}
let skspot = 0
let spot = 0
let skore = 0
let Sword = 0
let lnd: number[] = []
let skl: number[] = []
let cur = 0
let loc = 0
game.setLife(5)
let hit = 0
mkLand()
loc = 0
basic.showIcon(IconNames.TShirt)
basic.pause(100)
basic.showIcon(IconNames.Sword)
basic.pause(100)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
showLND(loc)
basic.forever(function () {
    basic.pause(1000 * (1 + randint(0, 3)))
    if (chkSkull(loc)) {
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            . # # # .
            . # . # .
            `)
        basic.pause(100)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        hit += 1
        showLND(loc)
        basic.pause(2000)
        if (hit >= 5) {
            game.setScore(skore)
            game.setLife(0)
        }
    }
})
