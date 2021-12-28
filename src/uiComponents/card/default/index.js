import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { normalize } from '../../../functions/normalize'

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#ffffff",
        borderWidth: 0.4,
        borderColor: "#cfcfcf",
        alignItems: "center",
        borderRadius: 2
    },
    infoContainer: {
        width: "100%",
        justifyContent: "center",
        padding: 10
    },
    imageContainer: {
        width: "100%",
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: "100%",
    },
    title: {
        fontSize: normalize(17),
        fontWeight: "bold",
        color: "#1f1f1f"
    },
    subTitle: {
        fontSize: normalize(12),
        color: "#1f1f1f",
    }
})

const Default = ({
    title = "",
    imageUrl = "",
    description = "",
    onPress = () => { },
    descriptionNumberOfLines = 3,
    titleNumberOfLines = 1,

    Footer,

    containerStyle,
    imageStyle,
    imageContainerStyle,
    infoContainerStyle,
    titleStyle,
    descriptionStyle,
    loadingColor = "#000",
    loadingSize = 'small',
    imageProps
}) => {

    const [imageHeight, setImageHeight] = useState(0)
    const [containerWidth, setContainerWidth] = useState(0)
    const [loading, setLoading] = useState(true)
    const [fail, setFail] = useState(false)

    useEffect(() => {
        if (imageUrl) {
            setLoading(true)
            setFail(false)
            Image.getSize(imageUrl, onLoadSuccess, onLoadFail)
        }
    }, [containerWidth, imageUrl])

    const onLoadSuccess = useCallback((iWidth, iHeight) => {
        const delta = (containerWidth / iWidth) * iHeight
        setImageHeight(delta)
        setLoading(false)
    }, [containerWidth])

    const onLoadFail = useCallback((error) => {
        setLoading(false)
        setFail(true)
    }, [])

    const onCaontainerLayout = useCallback((event) => {
        const { x, y, width, height } = event.nativeEvent.layout
        setContainerWidth(width)
    }, [])

    const renderImage = useCallback(() => {
        if (!imageUrl) {
            return null
        }
        if (loading) {
            return (
                <View style={[styles.imageContainer, imageContainerStyle]}>
                    <ActivityIndicator
                        animating
                        size={loadingSize}
                        color={loadingColor}
                    />
                </View>
            )
        }
        if (fail) {
            return (
                <View style={[styles.imageContainer, imageContainerStyle]}>
                    <Image
                        source={require("../images/noimage.jpg")}
                        style={[styles.image, { height: 150 }, imageStyle]}
                        resizeMode="cover"
                        {...imageProps}
                    />
                </View>
            )
        }
        return (
            <View style={[styles.imageContainer, { height: imageHeight }, imageContainerStyle]}>
                <Image
                    source={{ uri: imageUrl }}
                    style={[styles.image, { height: imageHeight }, imageStyle]}
                    resizeMode="cover"
                    {...imageProps}
                />
            </View>
        )
    }, [loading, fail, imageHeight, imageUrl])

    const renderFooter = useCallback(() => (
        Footer ? Footer : null
    ), [Footer])

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            onLayout={onCaontainerLayout}
            style={[styles.container, containerStyle]}
        >
            {renderImage()}
            <View style={[styles.infoContainer, infoContainerStyle]}>
                <Text numberOfLines={titleNumberOfLines} style={[styles.title, titleStyle]}>{title}</Text>
                <Text numberOfLines={descriptionNumberOfLines} style={[styles.subTitle, descriptionStyle]}>{description}</Text>
            </View>
            {renderFooter()}
        </TouchableOpacity>
    )
}

export default Default