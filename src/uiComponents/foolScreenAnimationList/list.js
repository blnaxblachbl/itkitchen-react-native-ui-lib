import React, { Component } from 'react'
import {
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
    SafeAreaView,
    StyleSheet
} from 'react-native'
import Item from './Item'
import ItemModal from './ItemModal'

const { width, height } = Dimensions.get("window")

export default class List extends Component {

    thumbnails = this.props.data.map(() => React.createRef())
    modal = React.createRef()

    state = {
        selectedItem: null,
        position: null,
        index: null
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    onChangeState = (state) => {
        // alert(state)
    }

    setlectItem = async (item, index) => {
        const {
            onSelectItem
        } = this.props
        if (onSelectItem) {
            onSelectItem({ item, index })
        }
        const position = await this.thumbnails[index].current.measure()
        this.setState({
            selectedItem: item,
            position,
            index
        })
    }

    modalOut = () => {
        const {
            onDismissItem
        } = this.props
        const data = {
            item: this.state.selectedItem,
            index: this.state.index
        }
        if (onDismissItem) {
            onDismissItem(data)
        }
        this.setState({
            selectedItem: null,
            position: null,
            index: null
        })
    }

    modalClose = () => {
        if (this.state.selectedItem) {
            this.modal.current.out()
        }
    }

    renderItem = ({ item, index }) => {
        const {
            itemContainerStyle
        } = this.props
        let status = false
        if (this.state.selectedItem && this.state.index == index) {
            status = true
        }
        return (
            <Item
                ref={this.thumbnails[index]}
                onPress={this.setlectItem}
                item={item}
                index={index}
                itemContainerStyle={itemContainerStyle}
            >
                {this.props.renderItem({ item, index }, status)}
            </Item>
        )
    }

    render() {
        const {
            horizontal,
            listStyle,
            listContainerStyle,
            numColumns,
            onRefresh,
            refreshing,
            onEndReachedThreshold,
            onEndReached,
            ListEmptyComponent,
            ListFooterComponent,
            ListHeaderComponent,
            initialScrollIndex,
            initialNumToRender,
            inverted,
            itemContainerStyle,
            viewabilityConfigCallbackPairs,
            viewabilityConfig,
            removeClippedSubviews,
            legacyImplementation,
            progressViewOffset,
            onViewableItemsChanged,
            ItemSeparatorComponent,
            getItemLayout,
            onScroll
        } = this.props
        return (
            <View style={styles.container}>
                <FlatList
                    ref={ref => this.listView = ref}
                    keyExtractor={(item, index) => index.toString()}
                    data={this.props.data}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    horizontal={horizontal}
                    onScroll={onScroll}
                    ListEmptyComponent={ListEmptyComponent}
                    ListFooterComponent={ListFooterComponent}
                    ListHeaderComponent={ListHeaderComponent}
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
                    style={[styles.listDefaultStyle, listStyle]}
                    contentContainerStyle={[styles.listDefaultContainerStyle, listContainerStyle]}
                />
                {
                    this.state.selectedItem && (
                        <ItemModal
                            ref={this.modal}
                            item={this.state.selectedItem}
                            index={this.state.index}
                            renderItem={this.props.renderItem}
                            position={this.state.position}
                            modalOut={this.modalOut}
                            itemContainerStyle={itemContainerStyle}
                            modalClose={this.modalClose}
                        />
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listDefaultStyle: {
        flex: 1, width: width
    },
    listDefaultContainerStyle: {
        alignItems: "center"
    }
})