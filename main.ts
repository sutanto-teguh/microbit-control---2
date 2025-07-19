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
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "up") {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
        Maju()
    }
    if (receivedString == "down") {
        Mundur()
    }
    if (receivedString == "right") {
        Kanan()
    }
    if (receivedString == "left") {
        Kiri()
    }
    if (receivedString == "stop") {
        Stop()
    }
    if (receivedString == "horn") {
        music.play(music.builtinPlayableSoundEffect(soundExpression.spring), music.PlaybackMode.UntilDone)
    }
})
function Stop () {
    pins.digitalWritePin(DigitalPin.P11, 0)
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P9, 0)
    pins.digitalWritePin(DigitalPin.P12, 0)
    pins.digitalWritePin(DigitalPin.P15, 0)
    music.stopAllSounds()
}
let receivedString = ""
bluetooth.startUartService()
basic.showIcon(IconNames.Square)
