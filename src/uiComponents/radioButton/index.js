import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        marginTop: 15
    },
    radioButton: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#494043',
        marginRight: 10
    },
    radioText: {
        fontSize: 18,
        color: "#494043",
    },
    radioCircle: {
        width: 12,
        height: 12,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: '#FF004A'
    },
})

export default RidioButton = ({
    containerStyle,
    radioButtonStyle,
    circleStyle,
    titleStyle,
    value,
    onPress,
    title,
    activeOpacity,
    activeTintColor = "#494043",
    inactiveTontColor = "#494043",
}) => {
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity ? activeOpacity : 0.6}
            onPress={onPress}
            style={[styles.container, containerStyle]}
        >
            <View
                style={[
                    styles.radioButton,
                    radioButtonStyle,
                    {
                        borderColor: value ? activeTintColor : inactiveTontColor
                    }
                ]}
            >
                {
                    value ? (
                        <View style={[styles.radioCircle, circleStyle, { backgroundColor: value ? activeTintColor : inactiveTontColor }]} />
                    ) : null
                }
            </View>
            {
                title ? (
                    <Text style={[styles.radioText, titleStyle, { color: value ? activeTintColor : inactiveTontColor }]}>{title}</Text>
                ) : null
            }
        </TouchableOpacity>
    )
}