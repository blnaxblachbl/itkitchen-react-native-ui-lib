import React, { Component } from 'react'
import {
    TouchableOpacity,
} from 'react-native'

export default class Item extends Component {

    thumbnail = React.createRef()

    measure = () => new Promise(
        resolve => this.thumbnail.current.measureInWindow((x, y, width, height) => resolve({
            x, y, width, height
        })),
    )

    render() {
        const { 
            onPress, 
            item, 
            index,
            itemContainerStyle
        } = this.props
        return (
            <TouchableOpacity
                ref={this.thumbnail}
                onPress={() => onPress(item, index)}
                activeOpacity={1}
                style={itemContainerStyle}
            >
                {this.props.children}
            </TouchableOpacity>
        )
    }
}