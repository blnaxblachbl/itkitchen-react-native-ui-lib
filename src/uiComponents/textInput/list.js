import React, { useMemo } from "react"
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'

const List = ({ listProps = {}, value = "", data, offset = 0, selectItem = () => { } }) => {

    const filtred = useMemo(() => data.filter(obj => obj.label.toLowerCase().includes(value.toLowerCase())), [value, data])

    const {
        containerStyle,
        scrollViewProps,
        itemStyle,
        itemTextStyle,
        emptyContainerStyle,
        emptyTextStyle,
        emptyText
    } = listProps

    return (
        <View style={[styles.wrapper, containerStyle, { top: offset }]}>
            {
                filtred.length > 0 ? (
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                        keyboardDismissMode="none"
                        keyboardShouldPersistTaps="handled"
                        {...scrollViewProps}
                    >
                        {
                            filtred.map((item, index) => (
                                <TouchableWithoutFeedback
                                    onStartShouldSetResponder={() => true}
                                    key={item.value + index}
                                    onPress={() => selectItem(item)}
                                >
                                    <View style={[styles.item, itemStyle]}>
                                        <Text style={[styles.itemText, itemTextStyle]}>{item.label}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </ScrollView>
                ) : (
                    <View style={[styles.empty, emptyContainerStyle]}>
                        <Text style={[styles.emptyText, emptyTextStyle]}>{emptyText ? emptyText : "No matches"}</Text>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        elevation: 5,
        width: '100%',
        position: 'absolute',
        maxHeight: 200,
        backgroundColor: '#fff',
        zIndex: 2,
    },
    container: {
        flex: 1
    },
    contentContainer: {
        alignItems: 'flex-start',
    },
    item: {
        width: '100%',
        padding: 10,
    },
    itemText: {
        fontSize: 14
    },
    empty: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    emptyText: {
        fontSize: 14
    }
})

export default List