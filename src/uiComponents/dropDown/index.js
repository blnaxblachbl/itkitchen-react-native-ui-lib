import React, { useState, useRef } from 'react'
import {
    Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Platform
} from 'react-native'

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    text: {
        color: "#959595",
    },
    container: {
        zIndex: 997,
        width: "100%",
        maxWidth: width * 0.9,
        borderRadius: 5,
        borderColor: "grey",
        borderWidth: 1,
        padding: 5
    },
    itemContainer: {
        zIndex: 999,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    itemText: {
        paddingVertical: 15,
        color: "#2c2a29",
        fontSize: Platform.OS === 'ios' ? 16 : 14,
    },
    itemsList: {
        position: "absolute",
        zIndex: 998,
        borderRadius: 5,
        borderColor: "#959595",
        backgroundColor: "#ffffff",
        maxHeight: (height / 2) - 50,
        minHeight: 40,
    },
    view: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0)",
        ...Platform.select({
            android: {
                elevation: 7,
            },
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
            }
        }),
    }
})

const initState = {
    menuVisible: false,
    menuWidth: 0,
    menuHeight: 0,
    inverted: false,
    position: { x: 0, y: 0, height: 0, width: 0 }
}

export default DropDown = ({
    data = [],
    children,
    onDataChange = () => { },
    value = "",
    placeholder = "select",
    style,
    menuStyle = {},
    menuContentStyle = {},
    itemStyle = {},
    itemTextStyle = {},
    textStyle = {},
    placeholderTextStyle = {}
}) => {
    const menuContioner = useRef(null);
    const [state, setState] = useState(initState)

    const measure = () => new Promise(
        resolve => menuContioner.current.measureInWindow((x, y, width, height) => resolve({
            x, y, width, height
        })),
    )

    const openMenu = async () => {
        let position = await measure()
        let inverted = position.y - (position.height / 2) > height / 2 ? true : false
        setState(prev => {
            return {
                ...prev,
                menuVisible: true,
                menuWidth: children ? width : position.width,
                inverted,
                position
            }
        })
    }

    const closeMenu = (item) => {
        setTimeout(() => { onDataChange(item) }, 0)
        setState(prev => {
            return {
                ...prev,
                menuVisible: false,
                menuWidth: 0,
                position: { x: 0, y: 0, height: 0, width: 0 },
                inverted: false
            }
        })
    }

    const offsetFunc = () => {
        if (!state.inverted) {
            return {
                top: state.position.y + state.position.height
            }
        } else {
            return {
                bottom: height - state.position.y + 2,
            }
        }
    }

    const renderMenu = () => {
        if (state.menuVisible) {
            return (
                <Modal
                    visible={state.menuVisible}
                    transparent={true}
                    onRequestClose={() => { }}
                    animationType="fade"
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        style={styles.view}
                        onPress={() => {
                            setState(prev => {
                                return {
                                    ...prev,
                                    menuVisible: false,
                                    menuWidth: 0,
                                    position: { x: 0, y: 0, height: 0, width: 0 },
                                    inverted: false
                                }
                            })
                        }}
                    >
                        <ScrollView
                            style={[
                                styles.itemsList,
                                menuStyle,
                                {
                                    width: state.menuWidth - (children ? 30 : 0),
                                    left: children ? 15 : state.position.x
                                },
                                offsetFunc()
                            ]}
                            contentContainerStyle={[
                                menuContentStyle,
                                {
                                    alignItems: "flex-start"
                                }
                            ]}
                        >
                            {
                                data.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.6}
                                        onPress={() => closeMenu(item)}
                                        style={[styles.itemContainer, itemStyle]}
                                    >
                                        <Text numberOfLines={2} style={[styles.itemText, itemTextStyle]}>{typeof (item) == "string" ? item : item.label}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </ScrollView>
                    </TouchableOpacity>
                </Modal>
            )
        } else {
            return null
        }
    }

    const renderContent = () => {
        if (children) {
            return (
                <TouchableOpacity
                    activeOpacity={0.6}
                    ref={menuContioner}
                    style={[styles.container, style]}
                    onPress={openMenu}
                >
                    {children}
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                    activeOpacity={0.6}
                    ref={menuContioner}
                    style={[styles.container, style]}
                    onPress={openMenu}
                >
                    {value ? (
                        <Text numberOfLines={1} style={[styles.text, textStyle, { color: "#2c2a29" }]}>{typeof (value) === "string" ? value : value.label}</Text>
                    ) : (
                        <Text numberOfLines={1} style={[styles.text, placeholderTextStyle]}>{placeholder}</Text>
                    )}
                </TouchableOpacity>
            )
        }
    }

    return (
        <>
            {renderContent()}
            {renderMenu()}
        </>
    )
}