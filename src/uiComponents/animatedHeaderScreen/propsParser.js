export default (props) => {
    let passedProps = {}
    Object.keys(props).map(key => {
        // console.log(key)
        switch (key) {
            case "onScroll":
                break;
            case "headerMaxHeight":
                break;
            case "headerMinHeight":
                break;
            case "headerComponentsMinOpacity":
                break;
            case "style":
                break;
            case "contentContainerStyle":
                break;
            case "headerContainertStyle":
                break;
            case "headerBackgroundColor":
                break;
            case "renderHeader": 
                break;
            default: {
                let obj = {}
                obj[key] = props[key]
                Object.assign(passedProps, obj)
            }
                break;
        }
    })
    return passedProps
}