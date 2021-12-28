import React, { useState, useEffect, useMemo } from 'react'
import {
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native'

const styles = StyleSheet.create({
    switchContainerStyle: {
        width: 60,
        borderRadius: 25,
        padding: 4,
        justifyContent: "center"
    },
    switchCircleStyle: {
        width: 25,
        height: 25,
        borderRadius: 12,
        backgroundColor: 'white', // rgb(102,134,205)
        alignItems: "center",
        justifyContent: "center"
    },
    switchTextStyle: {
        color: "#ffffff",
        fontSize: 14,
        fontWeight: "bold"
    },
})

export default Switch = ({
    containderStyle,
    circleStyle,
    textStyle,
    enabledCircleColor = '#fff',
    disabledCircleColor = '#fff',
    enabledBackgroundColor = "#2196F3",
    disabledBackgroundColor = "#ccc",
    enabledText = "",
    disabledText = "",
    onChangeState = () => { },
    initValue = false
}) => {
    const [active, setActive] = useState(initValue)

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [])

    const toggleSwitch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setActive(!active)
        onChangeState(!active)
    }

    const switchContainerAlign = useMemo(() => !active ? "flex-start" : 'flex-end', [active])
    const backgroundColor = useMemo(() => active ? enabledBackgroundColor : disabledBackgroundColor, [active])
    const switchCircleColor = useMemo(() => active ? enabledCircleColor : disabledCircleColor)
    const circleText = useMemo(() => active ? enabledText : disabledText)

    return (
        <TouchableWithoutFeedback
            onPress={toggleSwitch}
        >
            <View
                style={[
                    styles.switchContainerStyle,
                    {
                        alignItems: switchContainerAlign,
                        backgroundColor
                    },
                    containderStyle
                ]}
            >
                <View
                    style={[
                        styles.switchCircleStyle,
                        {
                            backgroundColor: switchCircleColor
                        },
                        circleStyle
                    ]}
                >
                    {circleText ? (
                        <Text style={[styles.switchTextStyle, textStyle]}>{circleText}</Text>
                    ) : null}
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}