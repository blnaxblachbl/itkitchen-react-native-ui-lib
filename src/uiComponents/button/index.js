import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator,
    Dimensions
} from 'react-native'

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c260b5",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 13,
        maxWidth: width * 0.9
    },
    text: {
        color: '#FFFFFF',
    },
})

export default ({
    style,
    onPress = () => { },
    activeOpacity,
    text = "Button",
    loading,
    textStyle,
    loadingColor = "#ffffff",
    children
}) => {

    const hundlePress = () => {
        if (!loading) {
            onPress()
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity ? activeOpacity : 0.6}
            onPress={hundlePress}
            style={[styles.container, style]}
        >
            {
                loading ? (
                    <ActivityIndicator
                        animating={true}
                        size='small'
                        color={loadingColor ? loadingColor : "#ffffff"}
                    />
                ) : children ? children : <Text numberOfLines={1} style={[styles.text, textStyle]}>{text}</Text>
            }
        </TouchableOpacity>
    )
}