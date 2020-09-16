import React from 'react'
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

const styles = StyleSheet.create({
    badge: {
        minWidth: 25,
        height: 25,
        backgroundColor: "#fd1a0b",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 5
    },
    badgeText: {
        color: "#ffffff",
        fontSize: 12,
        fontWeight: "bold"
    }
})

const Badge = ({
    style,
    textStyle,
    badge = 0
}) => {
    if (badge && typeof (badge) == "number") {
        return (
            <View style={[styles.badge, style]}>
                <Text style={[styles.badgeText, textStyle]}>{badge > 99 ? "99+" : badge}</Text>
            </View>
        )
    }
    return null
}

export default Badge