import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    ActivityIndicator
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c260b5",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        paddingVertical: 13,
    },
    text: {
        color: '#FFFFFF',
    },
})

export default ({
    style,
    onPress,
    activeOpacity,
    text,
    loading,
    textStyle,
    loadingColor,
}) => {

    const hundlePress = () => {
        if (!loading && onPress) {
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
                ) : <Text numberOfLines={1} style={[styles.text, textStyle]}>{text ? text : "ItKitchenButton"}</Text>
            }
        </TouchableOpacity>
    )
}