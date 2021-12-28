import React, { useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native'
import { normalize } from '../../functions/normalize'
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
        fontSize: normalize(30),
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
    imageUrl = "",
    nameString = "",
    onPress = () => { },
    badge = 0,

    style,
    imageStyle,
    badgeStyle,
    badgeTextStyle,
    imageProps,
    letterStyle
}) => {

    const renderImage = useCallback(() => {
        let letters = ['N', 'A']
        if (imageUrl) {
            return (
                <Image
                    source={{ uri: imageUrl }}
                    resizeMode="cover"
                    style={[styles.image, imageStyle]}
                    {...imageProps}
                />
            )
        }
        if (nameString) {
            letters = nameString.split(" ").map(item => item.slice(0, 1).toUpperCase())
        }
        return (
            <View style={[styles.image, imageStyle]}>
                {
                    letters.map((item, index) => index < 2 ? (
                        <Text key={item + index} style={[styles.letter, letterStyle]}>{item}</Text>
                    ) : null)
                }
            </View>
        )
    }, [nameString, imageUrl, imageStyle, letterStyle])

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