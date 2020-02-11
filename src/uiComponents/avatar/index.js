import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import Badge from '../badge'

const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#bdbdbd"
    },
    letter: {
        fontSize: 33,
        fontWeight: 'bold',
        color: "#ffffff"
    },
    badge: {
        position: "absolute",
        bottom: 2,
        right: -2,
    }
})

const Avatar = ({
    imageUrl,
    nameString,
    onPress,
    badge,

    style,
    imageStyle,
    badgeStyle,
    badgeTextStyle
}) => {

    const renderImage = () => {
        if (imageUrl) {
            return (
                <Image
                    source={{ uri: imageUrl }}
                    resizeMode="cover"
                    style={[styles.image, imageStyle]}
                />
            )
        }
        if (nameString) {
            let array = nameString.split(" ")
            if (array.length > 0) {
                return (
                    <View style={[styles.image, imageStyle]}>
                        {
                            array.map((item, index) => {
                                if (index < 2) {
                                    return (
                                        <Text key={index} style={styles.letter}>
                                            {item.charAt(0).toUpperCase()}
                                        </Text>
                                    )
                                }
                            })
                        }
                    </View>
                )
            }
        }
        return (
            <View style={[styles.image, imageStyle]}>
                <Text style={styles.letter}>N</Text>
                <Text style={styles.letter}>A</Text>
            </View>
        )
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={[styles.container, style]}
        >
            {renderImage()}
            <Badge
                style={[styles.badge, badgeStyle]}
                textStyle={badgeTextStyle}
                badge={badge}
            />
        </TouchableOpacity>
    )
}

export default Avatar