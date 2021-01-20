import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Dimensions,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Modal,
    Platform
} from 'react-native'
// import DeviceInfo from 'react-native-device-info'

const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
    text: {
        color: "#959595",
        marginVertical: Platform.OS === 'ios' ? 0 : 4,
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
        width: "95%",
        justifyContent: "center",
        zIndex: 999,
        width: "100%"
    },
    itemText: {
        paddingVertical: 15,
        paddingHorizontal: 5,
        color: "#2c2a29",
        fontSize: Platform.OS === 'ios' ? 16 : 14,
    },
    itemsList: {
        position: "absolute",
        zIndex: 998,
        elevation: 7,
        borderRadius: 5,
        borderColor: "#959595",
        backgroundColor: "#ffffff",
        maxHeight: (height / 2) - 50,
        minHeight: 40,
    }
})

const initState = {
    menuVisible: false,
    menuWidth: 0,
    menuHeight: 0,
    inverted: false,
    position: { x: 0, y: 0, height: 0, width: 0 }
}

export default DropDown = ({ data = [], children, onDataChange = () => { }, value = "", style, placeholder = "select" }) => {
    const menuContioner = useRef(null);
    const [state, setState] = useState(initState)

    // useEffect(() => {
    //     setState(prev => {
    //         return {
    //             ...prev,
    //             menuData: data
    //         }
    //     })
    // }, [data])

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
        // let data = typeof (item) == "string" ? item : item.value
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
                        style={Platform.select({
                            android: {
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0)",
                            },
                            ios: {
                                flex: 1,
                                backgroundColor: "rgba(0,0,0,0)",
                                shadowOffset: { width: 2, height: 2 },
                                shadowColor: 'black',
                                shadowOpacity: 0.5,
                            }
                        })}
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
                                {
                                    width: state.menuWidth - (children ? 30 : 0),
                                    left: children ? 15 : state.position.x
                                },
                                offsetFunc()
                            ]}
                            contentContainerStyle={{
                                alignItems: "center"
                            }}
                        >
                            {
                                data.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.6}
                                        onPress={() => closeMenu(item)}
                                        style={styles.itemContainer}
                                    >
                                        <Text style={styles.itemText}>{typeof (item) == "string" ? item : item.label}</Text>
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
                        <Text style={[styles.text, { color: "#2c2a29" }]}>{typeof (value) === "string" ? value : value.label}</Text>
                    ) : (
                            <Text style={styles.text}>{placeholder}</Text>
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