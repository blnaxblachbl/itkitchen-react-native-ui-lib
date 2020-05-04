export default (props) => {
    let passedProps = {}
    if (props.disableAnimation) {
        Object.keys(props).map(key => {
            // console.log(key)
            switch (key) {
                case "value":
                    break;
                case "onChangeText":
                    break;
                case "containerStyle":
                    break;
                case "style":
                    break;
                case "iconVisible":
                    break;
                case "disableAnimation":
                    break;
                case "IconComponent":
                    break;
                case "maskType":
                    break;
                case "maxLength":
                    break;
                default: {
                    let obj = {}
                    obj[key] = props[key]
                    Object.assign(passedProps, obj)
                }
                    break;
            }
        })
    } else {
        Object.keys(props).map(key => {
            // console.log(key)
            switch (key) {
                case "value":
                    break;
                case "onChangeText":
                    break;
                case "placeholder":
                    break;
                case "containerStyle":
                    break;
                case "style":
                    break;
                case "placeholderTextColor":
                    break;
                case "focusedPlaceholderTextColor":
                    break;
                case "iconVisible":
                    break;
                case "disableAnimation":
                    break;
                case "IconComponent":
                    break;
                case "maskType":
                    break;
                case "maxLength":
                    break;
                case "onFocus":
                    break;
                case "onBlur":
                    break;
                default: {
                    let obj = {}
                    obj[key] = props[key]
                    Object.assign(passedProps, obj)
                }
                    break;
            }
        })
    }
    return passedProps
}