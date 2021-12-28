import React from 'react'
import Default from './default'
import Background from './backgroud'

const CardPicker = ({ cardType, ...props }) => {
    switch (cardType) {
        case "background":
            return <Background {...props} />
        default:
            return <Default {...props} />
    }
}

export default CardPicker