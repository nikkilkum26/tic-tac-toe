import React from 'react'

export default function Mysquare(props) {
    return (
        <button className="squares" onClick={props.onClick}>
            {props.value}
        </button>
    )
}