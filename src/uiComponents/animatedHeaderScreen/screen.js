import React, { Component } from 'react'
import {
    View,
    Dimensions,
    Animated,
    StyleSheet,
    FlatList
} from 'react-native'

const { width, height } = Dimensions.get("window")

export default class Screen extends Component {

    state = {
        scrollOffset: new Animated.Value(0)
    }

    renderListFooter = () => {
        const {
            children,
            ListFooterComponent,
            childrenFirst
        } = this.props

        return (
            <View style={{ width: width, alignItems: "center", justifyContent: "center" }}>
                {!childrenFirst && children}
                {ListFooterComponent && (<ListFooterComponent />)}
            </View>
        )
    }

    renderListHeader = () => {
        const {
            children,
            ListHeaderComponent,
            childrenFirst
        } = this.props

        return (
            <View style={{ width: width, alignItems: "center", justifyContent: "center" }}>
                {ListHeaderComponent && (<ListHeaderComponent />)}
                {childrenFirst && children}
            </View>
        )
    }

    render() {

        const {
            data,
            renderHeader,
            renderItem,

            headerMaxHeight,
            headerMinHeight,
            headerComponentsMinOpacity,

            listStyle,
            listContainerStyle,
            numColumns,
            onRefresh,
            refreshing,
            onEndReachedThreshold,
            onEndReached,
            ListEmptyComponent,
            initialScrollIndex,
            initialNumToRender,
            inverted,
            viewabilityConfigCallbackPairs,
            viewabilityConfig,
            removeClippedSubviews,
            legacyImplementation,
            progressViewOffset,
            onViewableItemsChanged,
            ItemSeparatorComponent,
            getItemLayout,

            headerContainertStyle,
            headerBackgroundColor
        } = this.props

        const maxHeight = headerMaxHeight ? headerMaxHeight : 200
        const minHeight = headerMinHeight ? headerMinHeight : 55
        const minOpacity = headerComponentsMinOpacity ? headerComponentsMinOpacity : 0

        const headerHeight = this.state.scrollOffset.interpolate({
            inputRange: [0, maxHeight - minHeight],
            outputRange: [maxHeight, minHeight],
            extrapolate: 'clamp'
        })

        const opacity = this.state.scrollOffset.interpolate({
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
                        {renderHeader && renderHeader(this.state.scrollOffset)}
                    </Animated.View>
                </Animated.View>
                <FlatList
                    data={data ? data : []}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem ? renderItem : () => { return null }}
                    style={[styles.listDefaultStyle, listStyle]}
                    contentContainerStyle={[styles.listDefaultContainerStyle, listContainerStyle, { paddingTop: maxHeight }]}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollOffset } } }])}
                    ListFooterComponent={this.renderListFooter}
                    ListHeaderComponent={this.renderListHeader}
                    numColumns={numColumns}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    horizontal={false}
                    ListEmptyComponent={ListEmptyComponent}
                    onEndReachedThreshold={onEndReachedThreshold}
                    initialScrollIndex={initialScrollIndex}
                    initialNumToRender={initialNumToRender}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
                    viewabilityConfig={viewabilityConfig}
                    removeClippedSubviews={removeClippedSubviews}
                    legacyImplementation={legacyImplementation}
                    progressViewOffset={progressViewOffset}
                    onViewableItemsChanged={onViewableItemsChanged}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    getItemLayout={getItemLayout}
                    inverted={inverted}
                    onEndReached={onEndReached}
                />
            </View>
        )
    }
}

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