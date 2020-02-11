import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        height: 150,
        backgroundColor: "transparent",
        justifyContent: 'center',
        marginTop: 25,
    },
    imageContainer: {
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderColor: "#f1f1f1",
        position: "absolute",
        left: 0,
        zIndex: 2
    },
    image: {
        width: "100%",
        height: 150,
    },
    infoContainer: {
        height: "85%",
        width: "65%",
        marginLeft: "30%",
        backgroundColor: "#ffffff",
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderColor: "#f1f1f1",
        zIndex: 1
    },
    actionsContainer: {
        width: 45,
        height: 45,
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#dfbb7f",
        elevation: 4,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderColor: "#f1f1f1",
        zIndex: 3,
        alignItems: 'center',
        justifyContent: "center",
        overflow: "hidden"
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 5
    },
    subTitle: {
        fontSize: 12,
        color: "#000000",
    },
})

const AnimaedImage = ({
    title = "",
    imageUrl = "",
    subTitle = "",

    onPress,

    InfoComponent,

    containerStyle,
    titleStyle,
    subTitleStyle,
}) => {

    const [imageWigth, setImageWigth] = useState("30%")
    const [infoWigth, setInfoWigth] = useState(45)

    useEffect(() => {
        if (Platform.OS == "android") {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [])

    const toggleImage = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (imageWigth == "30%") {
            setImageWigth("100%")
        } else {
            setImageWigth("30%")
        }
    }

    const toggleInfo = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (infoWigth == 45) {
            setInfoWigth("70%")
        } else {
            setInfoWigth(45)
        }
    }

    const renderInfo = () => {
        if (infoWigth == 45 || !InfoComponent) {
            return (
                <>
                    <Ionicons name="ios-information-circle-outline" size={22} color="#000000" />
                    <Text style={{ color: "#000000", fontSize: 10 }}>Инфо</Text>
                </>
            )
        } else {
            return InfoComponent
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.container, containerStyle]}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={toggleImage}
                style={[styles.imageContainer, { width: imageWigth }]}
            >
                <Image
                    source={imageUrl ? { uri: imageUrl } : require("../images/noimage.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
                <Text numberOfLines={2} style={[styles.subTitle, subTitleStyle]}>{subTitle}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={1}
                style={[styles.actionsContainer, { width: infoWigth }]}
                onPress={toggleInfo}
            >
                {renderInfo()}
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default AnimaedImage