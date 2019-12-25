import React, { useState, useEffect, useRef } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native'
import isMasked, { clearMaskedValue, setMaxLength } from './masks'
import propsParser from './propsParser'

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
        fontSize: 16
    },
    placeholder: {
        fontSize: 16,
        color: "#A2A2A2",
    },
    placeholderContainer: {
        position: "absolute",
        marginHorizontal: 10,
    }
})

const CustopPreset = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.6
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.6
    },
    delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.6
    }
}

const TextInputComponent = (props) => {
    const {
        value,
        onChangeText,
        placeholder,
        containerStyle,
        style,
        placeholderTextColor,
        focusedPlaceholderTextColor,
        iconVisible,
        disableAnimation,
        IconComponent,
        maskType,
        maxLength
    } = props

    let passedProps = propsParser(props)

    const [focused, setFocused] = useState(false)
    const [componentHeight, setComponentHeight] = useState(0)
    const [placeholderHeight, setPlaceholderHeight] = useState(1)
    const inputRef = useRef(null)

    const offset = -(placeholderHeight + 2)
    const fucusedOffet = (componentHeight / 2) - (placeholderHeight / 2)

    useEffect(() => {
        if (Platform.OS == "android" && !disableAnimation) {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [disableAnimation])

    const onLayout = ({ nativeEvent }) => {
        const { x, y, width, height } = nativeEvent.layout
        setComponentHeight(height)
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
        if (iconVisible) {
            return IconComponent ? IconComponent : null
        } else {
            return null
        }
    }

    const onChange = (value) => {
        let clearedValue = clearMaskedValue(maskType, value)
        onChangeText(clearedValue)
    }

    if (disableAnimation) {
        return (
            <View style={[styles.container, containerStyle]}>
                <TextInput
                    ref={inputRef}
                    value={isMasked(maskType, value)}
                    onChangeText={onChange}
                    style={[styles.textInput, style]}
                    maxLength={setMaxLength(maskType, maxLength)}
                    {...passedProps}
                />
                {renderIcon()}
            </View>
        )
    }

    return (
        <View onLayout={onLayout} style={[styles.container, containerStyle]}>
            <TextInput
                ref={inputRef}
                value={isMasked(maskType, value)}
                onChangeText={onChange}
                style={[styles.textInput, style]}
                onFocus={() => setFocusedFunc(true)}
                onBlur={() => setFocusedFunc(false)}
                maxLength={setMaxLength(maskType, maxLength)}
                {...passedProps}
            />
            {renderIcon()}
            <View style={[styles.placeholderContainer, {
                top: focused || value ? offset : fucusedOffet,
            }]}>
                <Text
                    onPress={() => inputRef.current.focus()}
                    onLayout={onPlaceholderLayout}
                    style={[styles.placeholder, {
                        color: focused || value ? (focusedPlaceholderTextColor ? focusedPlaceholderTextColor : placeholderTextColor) : placeholderTextColor,
                        fontSize: focused || value ? 12 : 16
                    }]}
                >{placeholder}</Text>
            </View>
        </View>
    )
}

export default TextInputComponent