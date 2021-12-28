import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native'

import { normalize } from '../../../functions/normalize'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        borderRadius: 10,
        overflow: "hidden"
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    title: {
        fontSize: normalize(17),
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 2
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    description: {
        fontSize: normalize(12),
        color: "#ffffff",
    },
    infoContainer: {
        width: "100%",
        justifyContent: "center",
        padding: 10,
    },
})

const Background = ({
    title = "",
    imageUrl = "",
    description = "",
    descriptionNumberOfLines = 3,
    titleNumberOfLines = 1,
    activeOpacity = 0.8,

    onPress = () => { },

    Footer,

    containerStyle,
    infoContainerStyle,
    titleStyle,
    descriptionStyle,
    maskStyle,
    imageBackgroundProps
}) => {

    const [imageHeight, setImageHeight] = useState(150)
    const [containerWidth, setContainerWidth] = useState(0)

    useEffect(() => {
        Image.getSize(imageUrl, onLoadSuccess)
    }, [containerWidth, imageUrl])

    const onLoadSuccess = useCallback((iWidth, iHeight) => {
        const delta = (containerWidth / iWidth) * iHeight
        setImageHeight(delta)
    }, [containerWidth])

    const onCaontainerLayout = useCallback((event) => {
        const { width } = event.nativeEvent.layout
        setContainerWidth(width)
    }, [])

    const renderFooter = useCallback(() => {
        return Footer ? Footer : null
    }, [Footer])

    return (
        <ImageBackground
            onLayout={onCaontainerLayout}
            source={{ uri: imageUrl }}
            style={[styles.container, { height: imageHeight }, containerStyle]}
            resizeMode="cover"
            {...imageBackgroundProps}
        >
            <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} style={[styles.blur, maskStyle]}>
                <View style={[styles.infoContainer, infoContainerStyle]}>
                    <Text numberOfLines={titleNumberOfLines} style={[styles.title, titleStyle]}>{title}</Text>
                    <Text numberOfLines={descriptionNumberOfLines} style={[styles.description, descriptionStyle]}>{description}</Text>
                </View>
                {renderFooter()}
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Background