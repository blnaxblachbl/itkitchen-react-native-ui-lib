import React from 'react'
import {
    View,
    Dimensions,
    Animated,
    StyleSheet,
    FlatList,
    FlatListProps
} from 'react-native'
import propsParser from './propsParser'

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0
    },
    headerDefaultStyle: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        backgroundColor: "#ffffff",
        top: 0,
        left: 0,
        zIndex: 999
    },
    headerContainerDefaultStyle: {
        width: "100%",
        height: "100%",
        backgroundColor: "transparent"
    },
    listDeafaultStyle: {
        flex: 1,
        width: width
    },
    listDefaultContainerStyle: {
        alignItems: "center",
        zIndex: 1
    },
})

export default AnimatedHeaderScreen = (props: FlatListProps) => {

    const {
        onScroll,
        headerMaxHeight,
        headerMinHeight,
        headerComponentsMinOpacity,
        style,
        contentContainerStyle,
        headerContainertStyle,
        headerBackgroundColor,
        renderHeader
    } = props

    const parsedProps = propsParser(props)

    const scrollOffset = new Animated.Value(0)

    const maxHeight = headerMaxHeight ? headerMaxHeight : 200
    const minHeight = headerMinHeight ? headerMinHeight : 55
    const minOpacity = headerComponentsMinOpacity ? headerComponentsMinOpacity : 0

    const headerHeight = scrollOffset.interpolate({
        inputRange: [0, maxHeight - minHeight],
        outputRange: [maxHeight, minHeight],
        extrapolate: 'clamp'
    })

    const opacity = scrollOffset.interpolate({
        inputRange: [0, maxHeight - minHeight * 2],
        outputRange: [1, minOpacity],
        extrapolate: 'clamp'
    })

    headerContainertStyle["width"] = "100%"
    headerContainertStyle["height"] = "100%"

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.headerDefaultStyle, { height: headerHeight, backgroundColor: headerBackgroundColor ? headerBackgroundColor : "#ffffff" }]}>
                <Animated.View style={[styles.headerContainerDefaultStyle, headerContainertStyle, { opacity }]}>
                    {renderHeader && renderHeader(scrollOffset)}
                </Animated.View>
            </Animated.View>
            <FlatList
                style={[styles.listDefaultStyle, style]}
                contentContainerStyle={[styles.listDefaultContainerStyle, contentContainerStyle, { paddingTop: maxHeight }]}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollOffset } } }])}
                {...parsedProps}
            />
        </View>
    )
}