import React, { useCallback, useMemo, useRef, useState } from "react"
import {
    Image as RNImage,
    View,
    ActivityIndicator,
    Animated,
    PanResponder,
    Dimensions,
    StyleSheet
} from 'react-native'

const { width } = Dimensions.get("window")

const pointsDistance = ([xA, yA], [xB, yB]) => {
    return Math.sqrt(
        Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2)
    )
}

const Image = ({
    source = { uri: '' },
    canScale = false,
    containerStyle,
    style,

    onLoadStart = () => { },
    onLoadEnd = () => { },
    onError = () => { },
    ...props
}) => {
    const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current
    const scale = useRef(new Animated.Value(1)).current
    let offsetDistance = 0

    const [_source, setSource] = useState(source)
    const [loading, setLoading] = useState(false)

    const panResponder = useMemo(() => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, { dx, dy, numberActiveTouches }) => {
            if (numberActiveTouches === 2 && canScale) {
                const touches = e.nativeEvent.changedTouches

                const touchA = touches[0]
                const touchB = touches[1]

                const distance = pointsDistance(
                    [touchA.pageX, touchA.pageY],
                    [touchB.pageX, touchB.pageY]
                )

                if (offsetDistance === 0) {
                    offsetDistance = distance
                } else {
                    const screenMovedPercents = (distance - offsetDistance) / width
                    scale.setValue(1 + screenMovedPercents * 3)
                    pan.setValue({
                        x: dx,
                        y: dy,
                    })
                }
            }
        },
        onPanResponderRelease: () => {
            offsetDistance = 0
            Animated.parallel([
                Animated.spring(pan, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                }),
            ]).start()
        },
    }), [canScale, offsetDistance])

    const _onLoadStart = useCallback((e) => {
        onLoadStart(e)
        setLoading(true)
    }, [onLoadStart])

    const _onLoadEnd = useCallback((e) => {
        onLoadEnd(e)
        setLoading(false)
    }, [onLoadEnd])

    const _onError = useCallback((e) => {
        onLoadEnd(e)
        setLoading(false)
        setSource({ uri: '' })
    }, [onError])

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                {
                    transform: [
                        { translateX: pan.x },
                        { translateY: pan.y },
                        { scale },
                    ],
                },
                containerStyle
            ]}
        >
            <RNImage
                source={_source}
                onLoadStart={_onLoadStart}
                onLoadEnd={_onLoadEnd}
                onError={_onError}
                style={[
                    {
                        opacity: loading ? 0 : 1
                    },
                    style,
                ]}
                {...props}
            />
            {
                loading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator
                            animating
                            size="large"
                            color={"#000"}
                        />
                    </View>
                ) : null
            }
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
})

export default Image