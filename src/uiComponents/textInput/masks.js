export default (maskType, value) => {
    switch (maskType) {
        case "mobile-phone":
            return phoneMask(value)
        default:
            return value
    }
}

export const clearMaskedValue = (maskType, value) => {
    switch (maskType) {
        case "mobile-phone":
            return value.replace(/\D/g, '')
        default:
            return value
    }
}

export const setMaxLength = (maskType, maxLength) => {
    switch (maskType) {
        case "mobile-phone":
            return 18
        default:
            return maxLength
    }
}

const phoneMask = (value) => {
    if (value) {
        if (value.match(/^(\+7|7|8)+/g)) {
            let arr = value.replace(/^(\+7|7|8)+/g, '+7').match(/^(\+7|7|8)?(\d{1,3})?(\d{1,3})?(\d{1,2})?(\d{1,2})?/)
            let res = ""
            for (let i = 1; i < 6; i++) {
                let item = arr[i]
                if (item) {
                    if (i == 2) {
                        res = res + " " + `(${item}`
                    } else if (i == 3) {
                        res = res + ") " + item
                    } else {
                        res = res + " " + item
                    }
                }
            }
            return res.replace(/^ /, "")
        } else {
            return "+7" + value
        }
    } else {
        return ""
    }
}


