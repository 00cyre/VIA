const letters = require('./letters')

module.exports = class BrailleTranslator {
    constructor(text) {
        this.text = text
        this.braille = []

        this.alfaLetters = 'abcdefghijqlmnopqrstuvwxyz'
        this.alfaNumbers = '0123456789'

        this.isLetter = 'LETTER'
        this.isNumber = 'NUMBER'
        this.isCapital = 'CAPITAL'
    }

    getBrailleFromText() {
        let lastType = this.isLetter

        for (let i = 0; i < this.text.length; i++) {
            let char = this.text.charAt(i)
            let type = this.checkType(char)

            if (!type) {
                console.log(`Cannot find letter ${char} in translator.`)
                continue
            } else if (type != lastType) {
                this.braille.push(letters.find(x => x.letter == type).braille)
                lastType = type
            }

            this.braille.push(letters.find(x => x.letter == char.toUpperCase()).braille)
        }

        return this.braille
    }

    checkType(char) {
        if (this.alfaNumbers.indexOf(char) !== -1) return this.isNumber
        if (this.alfaLetters.indexOf(char) !== -1) return this.isLetter
        if (this.alfaLetters.toUpperCase().indexOf(char) !== -1) return this.isCapital
        return null
    }
}