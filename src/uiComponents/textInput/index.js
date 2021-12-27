import React, { useState, useRef, forwardRef, useMemo, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Animated,
    Keyboard
} from 'react-native'
import List from './list'

const TextInputComponent = forwardRef(({
    value,
    placeholder,
    style,
    placeholderTextColor = "#A2A2A2",
    containerStyle,
    onFocus = () => { },
    onBlur = () => { },
    focusedContainerStyle,
    focusedStyle,
    focusedPlaceholderTextColor = "#A2A2A2",
    iconVisible = true,
    leftIconVisible = true,
    disableAnimation = false,
    IconComponent,
    LeftIconComponent,
    onChangeText = () => { },
    listData = [],
    listProps = {},
    onListItemSelect = () => { },
    ...props
}, ref) => {

    let inputRef = ref ? ref : useRef()
    const anim = useRef(new Animated.Value(0)).current
    const [focused, setFocused] = useState(false)
    const [componentHeight, setComponentHeight] = useState(0)
    const [componentPosition, setComponentPosition] = useState(0)
    const [placeholderHeight, setPlaceholderHeight] = useState(1)
    const [placeholderTopOffset, setPlaceholderTopOffset] = useState(0)
    const [leftOffset, setLeftOffset] = useState(0)
    const [_value, _setValue] = useState("")

    const fucusedOffet = useMemo(() => -(componentHeight - placeholderTopOffset + 2), [componentHeight, placeholderHeight])
    const fontSizeFromStyle = useMemo(() => style && style.fontSize ? style.fontSize : 16, [style])
    const fontSizeOnFocus = useMemo(() => (fontSizeFromStyle - 4) < 4 ? 4 : (fontSizeFromStyle - 4), [fontSizeFromStyle])
    const placeholderColor = useMemo(() => focused ? focusedPlaceholderTextColor : placeholderTextColor, [focusedPlaceholderTextColor, placeholderTextColor, focused])
    const fontSize = useMemo(() => focused || value || _value ? fontSizeOnFocus : fontSizeFromStyle, [fontSizeFromStyle, fontSizeOnFocus, focused, value, _value])
    const showList = useMemo(() => focused && listData.length > 0, [focused, listData])

    const onLayout = useCallback(({ nativeEvent }) => {
        const { y, height } = nativeEvent.layout
        setComponentHeight(height)
        setComponentPosition(y)
    }, [])

    const onLeftLayout = useCallback(({ nativeEvent }) => {
        const { width } = nativeEvent.layout
        setLeftOffset(width + 5)
    }, [])

    const onPlaceholderLayout = useCallback(({ nativeEvent }) => {
        const { y, height } = nativeEvent.layout
        setPlaceholderHeight(height)
        setPlaceholderTopOffset(y + height)
    }, [])

    const setFocusedFunc = useCallback((focus) => {
        const text = value || _value
        if (!disableAnimation && (!text || focus)) {
            Animated.timing(anim, {
                toValue: focus ? 1 : 0,
                duration: 200,
                useNativeDriver: true
            }).start()
        }
        setFocused(focus)
    }, [disableAnimation, value, _value, setFocused])

    const renderIcon = useCallback(() => {
        if (iconVisible && IconComponent) {
            return IconComponent
        }
        return null
    }, [iconVisible, IconComponent])

    const onChangeTextFunc = useCallback((text) => {
        onChangeText(text)
        _setValue(text)
    }, [onChangeText])

    const renderLeftIcon = useCallback(() => {
        if (leftIconVisible && LeftIconComponent) {
            const Icon = React.cloneElement(LeftIconComponent, { onLayout: onLeftLayout })
            return Icon
        }
        return null
    }, [LeftIconComponent, leftIconVisible])

    const selectItem = useCallback((item) => {
        onListItemSelect(item)
        if (item && item.label) {
            _setValue(item.label)
        }
        Keyboard.dismiss()
    }, [onListItemSelect])

    const left = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [leftOffset, -10],
        extrapolate: 'clamp'
    })
    const top = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, fucusedOffet],
        extrapolate: 'clamp'
    })

    return (
        <>
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
                    ref={ref ? ref : inputRef}
                    value={value || _value}
                    placeholder={disableAnimation ? placeholder : undefined}
                    placeholderTextColor={disableAnimation ? placeholderColor : undefined}
                    style={[
                        styles.textInput,
                        style,
                        focused ? focusedStyle : {}
                    ]}
                    defaultValue=''
                    onFocus={() => {
                        setFocusedFunc(true)
                        onFocus()
                    }}
                    onBlur={() => {
                        setFocusedFunc(false)
                        onBlur()
                    }}
                    onChangeText={onChangeTextFunc}
                    {...props}
                />
                {renderIcon()}
                {
                    !disableAnimation ? (
                        <Animated.View
                            style={[
                                styles.placeholderContainer,
                                {
                                    transform: [{ translateX: left }, { translateY: top }]
                                }
                            ]}
                        >
                            <Text
                                numberOfLines={1}
                                onPress={() => inputRef.current.focus()}
                                onLayout={onPlaceholderLayout}
                                style={[
                                    styles.placeholder,
                                    {
                                        color: placeholderColor,
                                        fontSize
                                    }
                                ]}
                            >{placeholder}</Text>
                        </Animated.View>
                    ) : null
                }
            </View>
            {
                showList ? (
                    <List
                        value={value || _value}
                        data={listData}
                        offset={componentHeight + componentPosition}
                        selectItem={selectItem}
                        listProps={listProps}
                    />
                ) : null
            }
        </>
    )
})

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between",
        position: 'relative',
        zIndex: 1
    },
    textInput: {
        flex: 1,
        width: "auto",
        borderRadius: 10,
        paddingHorizontal: 0,
        paddingVertical: 10,
        color: "#000000",
        paddingHorizontal: 10
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