import React, { useState, useEffect } from 'react'
import {
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
    View,
    Text
} from 'react-native'

const styles = StyleSheet.create({
    switchContainerStyle: {
        width: 170,
        height: 35,
        borderRadius: 25,
        padding: 5,
        justifyContent: "center"
    },
    switchCircleStyle: {
        width: 85,
        height: 30,
        borderRadius: 15,
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

const initSate = {
    active: false,
    switchContainerAlign: "flex-start",
    switchCircleColor: "red",
    swithcOnAnimation: false,
    backgroundColor: "#ccc",
    circleText: "Off"
}

export default Switch = ({
    containderStyle,
    circleStyle,
    textStyle,
    activeOpacity,
    enabledCircleColor,
    disabledCircleColor,
    enabledBackgroundColor,
    disabledBackgroundColor,
    enabledText,
    disabledText,
    onChangeState,
    initPosition
}) => {

    const [state, setState] = useState(initSate)

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        if (initPosition) {
            setState({
                active: true,
                switchContainerAlign: "flex-end",
                switchCircleColor: enabledCircleColor ? enabledCircleColor : "#4DC861",
                backgroundColor: enabledBackgroundColor ? enabledBackgroundColor : "#ccc",
                circleText: enabledText ? enabledText : "On"
            })
        } else {
            setState({
                active: false,
                switchContainerAlign: "flex-start",
                switchCircleColor: disabledCircleColor ? disabledCircleColor : "red",
                backgroundColor: disabledBackgroundColor ? disabledBackgroundColor : "#ccc",
                circleText: disabledText ? disabledText : "Off"
            })
        }
    }, [])

    const toggleSwitch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (state.active) {
            setState({
                active: false,
                switchContainerAlign: "flex-start",
                switchCircleColor: disabledCircleColor ? disabledCircleColor : "red",
                swithcOnAnimation: true,
                backgroundColor: disabledBackgroundColor ? disabledBackgroundColor : "#ccc",
                circleText: disabledText ? disabledText : "Off"
            })
        } else {
            setState({
                active: true,
                switchContainerAlign: "flex-end",
                switchCircleColor: enabledCircleColor ? enabledCircleColor : "#4DC861",
                swithcOnAnimation: true,
                backgroundColor: enabledBackgroundColor ? enabledBackgroundColor : "#ccc",
                circleText: enabledText ? enabledText : "On"
            })
        }
        if (onChangeState) {
            onChangeState(state.active)
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity ? activeOpacity : 0.9}
            onPress={toggleSwitch}
            style={[
                styles.switchContainerStyle,
                {
                    alignItems: state.switchContainerAlign,
                    backgroundColor: state.backgroundColor
                },
                containderStyle
            ]}
        >
            <View
                style={[
                    styles.switchCircleStyle,
                    {
                        backgroundColor: state.switchCircleColor
                    },
                    circleStyle
                ]}
            >
                <Text style={[styles.switchTextStyle, textStyle]}>{state.circleText}</Text>
            </View>
        </TouchableOpacity>
    )
}