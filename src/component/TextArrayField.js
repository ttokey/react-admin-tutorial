import React from "react"
import {TextInput,} from 'react-admin';


export const TextArrayField = ({data}) => {

    const arrayValues = Object.values(data)
    return (
        <>
            {arrayValues.map((value, index) => <li key={value + index}>{value}</li>)}
        </>
    )
}


export const TextArrayFieldInput = ({source}) => {
    const arrayValues = Object.values(source)
    return (
        <>
            {arrayValues.map((value, index) => <TextInput key={value + index}>{value}</TextInput>)}
        </>
    )
}