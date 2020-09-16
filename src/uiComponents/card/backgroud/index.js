import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        alignItems: "center",
        borderRadius: 10,
        marginTop: "2.5%",
        overflow: "hidden"
    },
    blur: {
        flex: 1,
        position: "absolute",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "rgba(0,0,0,0.4)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 2
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    subTitle: {
        fontSize: 14,
        color: "#ffffff",
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
    cursor: {
        backgroundColor: "#3b91f8",
        width: 2,
        height: "60%",
        marginRight: 5
    }
})

const Background = ({
    title = "",
    imageUrl = "",
    subTitle = "",

    like = false,
    comment = false,
    favorite = false,
    share = false,

    liked = false,
    commented = false,
    favorited = false,
    shared = false,

    iconsSize = 22,

    onPress = () => { },
    onLikePress = () => { },
    onCommentPress = () => { },
    onFavoritePress = () => { },
    onSharePress = () => { },

    CustomFooter,

    actionsColor = "#ffffff",
    altActionsColor = "#3b91f8",

    containerStyle,
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
        setLoading(true)
        setFail(false)
        Image.getSize(imageUrl, onLoadSuccess, onLoadFail)
    }, [containerWidth, imageUrl])

    const onLoadSuccess = (iWidth, iHeight) => {
        const delta = (containerWidth / iWidth) * iHeight
        setImageHeight(delta)
        setLoading(false)
    }

    const onLoadFail = (error) => {
        setLoading(false)
        setImageHeight(150)
        setFail(true)
    }

    const onCaontainerLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout
        setContainerWidth(width)
    }

    const renderFooter = () => {
        if (!CustomFooter && (like || share || favorite || comment)) {
            return (
                <TouchableOpacity activeOpacity={1} style={[styles.actionContainer, footerContainerStyle]}>
                    <View style={[styles.actionContainer, { width: "auto", paddingVertical: 0 }]}>
                        {
                            like ? (
                                <TouchableOpacity onPress={onLikePress} activeOpacity={0.2}>
                                    <Ionicons
                                        name={liked ? "ios-heart" : "ios-heart-outline"}
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
                                    <Ionicons
                                        name="md-share-social-outline"
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
                                <Ionicons
                                    name={favorited ? "bookmark" : "bookmark-outline"}
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
        <ImageBackground
            onLayout={onCaontainerLayout}
            source={fail || !imageUrl ? require("../images/noimage.jpg") : { uri: imageUrl }}
            style={[styles.container, { height: imageHeight }, containerStyle]}
            resizeMode="cover"
        >
            {
                loading ? (
                    <View style={[styles.blur, { justifyContent: "center" }]}>
                        <ActivityIndicator animating={true} size='small' color='#ffffff' style={styles.spinner} />
                    </View>
                ) : (
                        <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.blur}>
                            <View style={[styles.infoContainer, infoContainerStyle]}>
                                <View style={styles.titleContainer}>
                                    <View style={styles.cursor} />
                                    <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>
                                </View>
                                <Text numberOfLines={3} style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
                            </View>
                            {renderFooter()}
                        </TouchableOpacity>
                    )
            }
        </ImageBackground>
    )
}

export default Background