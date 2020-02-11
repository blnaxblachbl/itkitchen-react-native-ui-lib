import React from 'react'
import Default from './default'
import Background from './backgroud'
import AnimatedImage from './animedImage'

const CardPicker = props => {

    const { cardType } = props

    switch (cardType) {
        case 'animated':
            return <AnimatedImage {...props} />
        case "background":
            return <Background {...props} />
        default:
            return <Default {...props} />
    }
}

export default CardPicker