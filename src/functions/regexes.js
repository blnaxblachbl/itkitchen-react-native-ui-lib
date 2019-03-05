const numberRegexp = (balance) => {
    let str = balance.toString()
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

const wordsFromUpperCase = (string) => {
    let str = string.toString()
    return str.replace(/(?:^|\s)\S/g, l => { return l.toUpperCase() })
}

const emailValid = (email) => {
    let re2= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    let str = email.toString()
    return re2.test(str)
}

export {
    numberRegexp,
    wordsFromUpperCase,
    emailValid
}