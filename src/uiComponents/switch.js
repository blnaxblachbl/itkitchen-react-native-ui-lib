import React, { Component } from 'react'
import {
    TouchableOpacity,
    LayoutAnimation,
    Platform,
    UIManager,
    StyleSheet,
    View,
    Text
} from 'react-native'

export default class Switch extends Component {

    state = {
        active: false,
        switchContainerAlign: "flex-start",
        switchCircleColor: "red",
        swithcOnAnimation: false,
        backgroundColor: "#ccc",
        circleText: "Off"
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        const {
            enabledCircleColor,
            disabledCircleColor,
            enabledBackgroundColor,
            disabledBackgroundColor,
            enabledText,
            disabledText,
            initPosition
        } = this.props
        if (initPosition) {
            this.setState({
                active: true,
                switchContainerAlign: "flex-end",
                switchCircleColor: enabledCircleColor ? enabledCircleColor : "#4DC861",
                backgroundColor: enabledBackgroundColor ? enabledBackgroundColor : "#ccc",
                circleText: enabledText ? enabledText : "On"
            })
        } else {
            this.setState({
                active: false,
                switchContainerAlign: "flex-start",
                switchCircleColor: disabledCircleColor ? disabledCircleColor : "red",
                backgroundColor: disabledBackgroundColor ? disabledBackgroundColor : "#ccc",
                circleText: disabledText ? disabledText : "Off"
            })
        }

    }

    toggleSwitch = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const {
            enabledCircleColor,
            disabledCircleColor,
            enabledBackgroundColor,
            disabledBackgroundColor,
            enabledText,
            disabledText,
            onChangeState
        } = this.props
        if (!this.state.swithcOnAnimation) {
            if (this.state.active) {
                this.setState({
                    active: false,
                    switchContainerAlign: "flex-start",
                    switchCircleColor: disabledCircleColor ? disabledCircleColor : "red",
                    swithcOnAnimation: true,
                    backgroundColor: disabledBackgroundColor ? disabledBackgroundColor : "#ccc",
                    circleText: disabledText ? disabledText : "Off"
                })
            } else {
                this.setState({
                    active: true,
                    switchContainerAlign: "flex-end",
                    switchCircleColor: enabledCircleColor ? enabledCircleColor : "#4DC861",
                    swithcOnAnimation: true,
                    backgroundColor: enabledBackgroundColor ? enabledBackgroundColor : "#ccc",
                    circleText: enabledText ? enabledText : "On"
                })
            }
            if (onChangeState) {
                onChangeState(this.state.active)
            }
            setTimeout(() => { this.setState({ swithcOnAnimation: false }) }, 300)
        }
    }

    render() {
        const {
            containderStyle,
            circleStyle,
            textStyle,
            activeOpacity
        } = this.props
        return (
            <TouchableOpacity
                activeOpacity={activeOpacity ? activeOpacity : 0.6}
                onPress={this.toggleSwitch}
                style={[
                    styles.switchContainerStyle,
                    {
                        alignItems: this.state.switchContainerAlign,
                        backgroundColor: this.state.backgroundColor
                    },
                    containderStyle
                ]}
            >
                <View
                    style={[
                        styles.switchCircleStyle,
                        {
                            backgroundColor: this.state.switchCircleColor
                        },
                        circleStyle
                    ]}
                >
                    <Text style={[styles.switchTextStyle, textStyle]}>{this.state.circleText}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

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