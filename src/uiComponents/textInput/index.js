import React, { useState, useEffect, useRef, forwardRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native'

const CustopPreset = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 1
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 1
    },
    delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 1
    }
}

const TextInputComponent = forwardRef((props, ref) => {
    const {
        value,
        placeholder,
        containerStyle,
        focusedContainerStyle,
        style,
        focusedStyle,
        placeholderTextColor = props.style && props.style.color ? props.style.color : "#A2A2A2",
        focusedPlaceholderTextColor = "#A2A2A2",
        iconVisible = true,
        leftIconVisible = true,
        disableAnimation = false,
        IconComponent,
        LeftIconComponent,
        onFocus = () => { },
        onBlur = () => { },
    } = props

    const [focused, setFocused] = useState(false)
    const [componentHeight, setComponentHeight] = useState(0)
    const [placeholderHeight, setPlaceholderHeight] = useState(1)
    const [leftOffset, setLeftOffset] = useState(0)
    let inputRef = ref ? ref : useRef()

    const offset = -(placeholderHeight + 2)
    const fucusedOffet = (componentHeight / 2) - (placeholderHeight / 2)
    const fontSize = style && style.fontSize ? style.fontSize : 16
    const fontSizeOnFocus = (fontSize - 4) < 4 ? 4 : (fontSize - 4)

    useEffect(() => {
        if (Platform.OS == "android" && !disableAnimation) {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [disableAnimation])

    const onLayout = ({ nativeEvent }) => {
        const { x, y, width, height } = nativeEvent.layout
        setComponentHeight(height)
    }

    const onLeftLayout = ({ nativeEvent }) => {
        const { x, y, width, height } = nativeEvent.layout
        setLeftOffset(width + 5)
    }

    const onPlaceholderLayout = ({ nativeEvent }) => {
        const { x, y, width, height } = nativeEvent.layout
        setPlaceholderHeight(height)
    }

    const setFocusedFunc = (focus) => {
        LayoutAnimation.configureNext(CustopPreset)
        setFocused(focus)
    }

    const renderIcon = () => {
        if (iconVisible && IconComponent) {
            return IconComponent
        }
        return null
    }

    const renderLeftIcon = () => {
        if (leftIconVisible && LeftIconComponent) {
            const Icon = React.cloneElement(LeftIconComponent, { onLayout: onLeftLayout })
            return Icon
        }
        return null
    }

    if (disableAnimation) {
        return (
            <View
                onLayout={onLayout}
                style={[
                    styles.container,
                    containerStyle,
                    focused ? focusedContainerStyle : {}
                ]}
            >
                {renderLeftIcon()}
                <TextInput
                    {...props}
                    ref={ref ? ref : inputRef}
                    style={[
                        styles.textInput,
                        style,
                        focused ? focusedStyle : {}
                    ]}
                />
                {renderIcon()}
            </View>
        )
    }

    return (
        <View
            onLayout={onLayout}
            style={[
                styles.container,
                containerStyle,
                focused ? focusedContainerStyle : {}
            ]}
        >
            {renderLeftIcon()}
            <TextInput
                {...props}
                ref={ref ? ref : inputRef}
                style={[
                    styles.textInput,
                    style,
                    focused ? focusedStyle : {}
                ]}
                onFocus={() => {
                    setFocusedFunc(true)
                    if (onFocus) {
                        onFocus()
                    }
                }}
                onBlur={() => {
                    setFocusedFunc(false)
                    if (onBlur) {
                        onBlur()
                    }
                }}
                placeholder={undefined}
            />
            {renderIcon()}
            <View style={[styles.placeholderContainer, {
                top: focused || value ? offset : fucusedOffet,
                left: focused || value ? 0 : leftOffset
            }]}>
                <Text
                    onPress={() => inputRef.current.focus()}
                    onLayout={onPlaceholderLayout}
                    style={[styles.placeholder, {
                        color: focused || value ? (focusedPlaceholderTextColor ? focusedPlaceholderTextColor : placeholderTextColor) : placeholderTextColor,
                        fontSize: focused || value ? fontSizeOnFocus : fontSize
                    }]}
                >{placeholder}</Text>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 0,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    textInput: {
        flex: 1,
        width: "auto",
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 10,
        color: "#000000",
    },
    placeholder: {
        color: "#A2A2A2",
    },
    placeholderContainer: {
        position: "absolute",
        marginHorizontal: 10,
        justifyContent: 'center'
    }
})

export default TextInputComponent