const numberRegexp = (balance) => {
    try {
        let str = balance.toString().replace(/ /g, '')
        return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
    } catch (e) {
        return e
    }
}

const wordsFromUpperCase = (string) => {
    try {
        let str = string.toString()
        return str.replace(/(?:^|\s)\S/g, l => { return l.toUpperCase() })
    } catch (e) {
        return e
    }
}

const emailValid = (email) => {
    try {
        let re2 = /^\w+@\w+\.[a-zA-Z]{2,}$/
        let str = email.toString()
        return re2.test(str)
    } catch (e) {
        return e
    }
}

export {
    numberRegexp,
    wordsFromUpperCase,
    emailValid
}