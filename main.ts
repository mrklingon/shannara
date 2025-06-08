input.onButtonPressed(Button.A, function () {
    loc += -1
})
function mkLand () {
    lnd = []
    for (let index = 0; index < 100; index++) {
        lnd.push(randint(0, 2))
    }
    skl = []
    for (let index = 0; index < 5; index++) {
        skl.push(randint(0, 99))
    }
}
input.onButtonPressed(Button.B, function () {
    loc += 1
})
function showLND (locat: number) {
    for (let index = 0; index <= 4; index++) {
        spot = lnd[(locat + index) % 100]
        if (spot == 2) {
            led.plot(index, 3)
        }
        if (spot > 0) {
            led.plot(index, 4)
        } else {
            led.unplot(index, 4)
            led.unplot(index, 3)
        }
    }
}
let spot = 0
let skl: number[] = []
let lnd: number[] = []
mkLand()
let loc = 0
basic.showIcon(IconNames.Heart)
basic.pause(100)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
basic.forever(function () {
    showLND(loc)
})
