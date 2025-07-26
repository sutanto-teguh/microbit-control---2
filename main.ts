function Mundur () {
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.analogWritePin(AnalogPin.P8, 0)
    pins.analogWritePin(AnalogPin.P9, 200)
    pins.analogWritePin(AnalogPin.P12, 200)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function Kanan () {
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.analogWritePin(AnalogPin.P8, 150)
    pins.analogWritePin(AnalogPin.P9, 0)
    pins.analogWritePin(AnalogPin.P12, 150)
    pins.analogWritePin(AnalogPin.P15, 0)
}
function readDistance () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    distance = Math.idiv(pins.pulseIn(DigitalPin.P2, PulseValue.High), 58)
    basic.pause(100)
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Happy)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
function Maju () {
    pins.digitalWritePin(DigitalPin.P11, 1)
    pins.analogWritePin(AnalogPin.P8, 220)
    pins.analogWritePin(AnalogPin.P9, 0)
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P15, 220)
}
function Kiri () {
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.analogWritePin(AnalogPin.P8, 0)
    pins.analogWritePin(AnalogPin.P9, 150)
    pins.analogWritePin(AnalogPin.P12, 0)
    pins.analogWritePin(AnalogPin.P15, 150)
}
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Hash), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Hash))
    if (receivedString == "up") {
        basic.showLeds(`
            . . # . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        Maju()
    }
    if (receivedString == "down") {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . # . .
            `)
        Mundur()
    }
    if (receivedString == "right") {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . #
            . . . . .
            . . . . .
            `)
        Kanan()
    }
    if (receivedString == "left") {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . . . .
            . . . . .
            . . . . .
            `)
        Kiri()
    }
    if (receivedString == "stop") {
        Stop()
    }
    if (receivedString == "horn") {
        basic.showIcon(IconNames.Giraffe)
        music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.UntilDone)
    }
    if (receivedString == "hallo") {
        basic.showIcon(IconNames.Heart)
        billy.say("Hi...how are you?")
    }
    if (receivedString == "temp") {
        basic.showIcon(IconNames.Sword)
        basic.showNumber(input.temperature())
    }
})
function Stop () {
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P9, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    music.stopAllSounds()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        # . . . #
        `)
}
let receivedString = ""
let distance = 0
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
