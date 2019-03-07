import React, { Component, PureComponent } from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    LayoutAnimation,
    Platform,
    UIManager
} from 'react-native'

const { wWidth, wHeight } = Dimensions.get("window")

const CustomLayoutSpring = {
    duration: 300,
    create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 7,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 7,
    },
};

export default class ItemModal extends PureComponent {

    spring = new Animated.Value(0)

    state = {
        width: 0,
        height: 0,
        top: 0,
        left: 0,

        status: false
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
        const { width, height, x, y } = this.props.position
        this.setState({
            width,
            height,
            top: y,
            left: x
        })
    }

    componentDidMount() {
        setTimeout(() => { this.animationStart() }, 200)
        setTimeout(() => { this.setState({ status: true }) }, 500)
    }

    animationStart = () => {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        this.setState({
            width: wWidth,
            height: wHeight,
            left: 0,
            top: 0,
        })
    }

    out = () => {
        LayoutAnimation.configureNext(CustomLayoutSpring);
        const { width, height, x, y } = this.props.position
        this.setState({
            width,
            height,
            top: y,
            left: x,
            status: false
        })
        setTimeout(() => { this.props.modalOut() }, 300)
    }

    modal = React.createRef()

    render() {
        const { item, index } = this.props
        const style = {
            ...StyleSheet.absoluteFillObject,
            width: this.state.width,
            height: this.state.height,
            top: this.state.top,
            left: this.state.left,
        }
        return (
            <View ref={this.modal} style={styles.container}>
                <Animated.View style={[style]}>
                    {this.props.renderItem({ item, index }, this.state.status)}
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
        alignItems: "center",
        justifyContent: "center"
    },
    close: {
        color: "#ffffff",
        fontSize: 20,
        top: 5,
        right: 0,
        zIndex: 999,
        position: "absolute",
        padding: 10
    }
})