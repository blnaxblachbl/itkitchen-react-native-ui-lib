import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Ioncicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        backgroundColor: "#ffffff",
        marginTop: "2.5%",
        borderWidth: 0.4,
        borderColor: "#cfcfcf",
        alignItems: "center",
        borderRadius: 2
    },
    infoContainer: {
        width: "93%",
        justifyContent: "center",
        paddingVertical: 5
    },
    actionContainer: {
        width: "93%",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingVertical: 7,
        flexDirection: "row"
    },
    image: {
        width: "100%",
        maxHeight: 350
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1f1f1f",
        marginBottom: 7
    },
    subTitle: {
        fontSize: 14,
        color: "#1f1f1f",
    },
    spinner: {
        paddingTop: 35,
        paddingBottom: 15
    }
})

const Default = ({
    title = "",
    imageUrl = "",
    subTitle = "",

    like,
    comment,
    favorite,
    share,

    liked,
    commented,
    favorited,
    shared,

    iconsSize = 22,

    onPress,
    onLikePress,
    onCommentPress,
    onFavoritePress,
    onSharePress,

    CustomFooter,

    actionsColor = "#000000",
    altActionsColor = "#ff0000",

    containerStyle,
    imageStyle,
    infoContainerStyle,
    titleStyle,
    subTitleStyle,
    footerContainerStyle
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

    const onLoadSuccess = (iWidth, iHeight) => {
        const delta = (containerWidth / iWidth) * iHeight
        setImageHeight(delta)
        setLoading(false)
    }

    const onLoadFail = (error) => {
        setLoading(false)
        setFail(true)
    }

    const onCaontainerLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout
        setContainerWidth(width)
    }

    const renderImage = () => {
        if (loading) {
            return <ActivityIndicator animating={true} size='small' color='#000000' style={styles.spinner} />
        }
        if (fail || !imageUrl) {
            return (
                <Image
                    source={require("../images/noimage.jpg")}
                    style={[styles.image, { height: 150 }, imageStyle]}
                    resizeMode="cover"
                />
            )
        }
        return (
            <Image
                source={{ uri: imageUrl }}
                style={[styles.image, { height: imageHeight }, imageStyle]}
                resizeMode="cover"
            />
        )
    }

    const renderFooter = () => {
        if (!CustomFooter && (like || share || favorite || comment)) {
            return (
                <TouchableOpacity activeOpacity={1} style={[styles.actionContainer, footerContainerStyle]}>
                    <View style={[styles.actionContainer, { width: "auto", paddingVertical: 0 }]}>
                        {
                            like ? (
                                <TouchableOpacity onPress={onLikePress} activeOpacity={0.2}>
                                    <Ioncicons
                                        name={liked ? "ios-heart" : "ios-heart-empty"}
                                        size={iconsSize}
                                        style={{ marginRight: 15 }}
                                        color={!liked ? actionsColor : altActionsColor}
                                    />
                                </TouchableOpacity>
                            ) : null
                        }
                        {
                            comment ? (
                                <TouchableOpacity onPress={onCommentPress} activeOpacity={0.2}>
                                    <FontAwesome
                                        name={commented ? "comment" : "comment-o"}
                                        size={iconsSize - 2 > 0 ? iconsSize - 2 : 0}
                                        style={{ marginRight: 15, marginBottom: 3 }}
                                        color={!commented ? actionsColor : altActionsColor}
                                    />
                                </TouchableOpacity>
                            ) : null
                        }
                        {
                            share ? (
                                <TouchableOpacity onPress={onSharePress} activeOpacity={0.2}>
                                    <Ioncicons
                                        name="md-share-alt"
                                        size={iconsSize}
                                        style={{ marginRight: 15 }}
                                        color={!shared ? actionsColor : altActionsColor}
                                    />
                                </TouchableOpacity>
                            ) : null
                        }
                    </View>
                    {
                        favorite ? (
                            <TouchableOpacity onPress={onFavoritePress} activeOpacity={0.2}>
                                <FontAwesome
                                    name={favorited ? "bookmark" : "bookmark-o"}
                                    size={iconsSize - 2 > 0 ? iconsSize - 2 : 0}
                                    color={!favorited ? actionsColor : altActionsColor}
                                />
                            </TouchableOpacity>
                        ) : null
                    }
                </TouchableOpacity>
            )
        } else if (CustomFooter) {
            return CustomFooter
        } else {
            return null
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            onLayout={onCaontainerLayout}
            style={[styles.container, containerStyle]}
        >
            {renderImage()}
            <View style={[styles.infoContainer, infoContainerStyle]}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                <Text numberOfLines={3} style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
            </View>
            {renderFooter()}
        </TouchableOpacity>
    )
}

export default Default