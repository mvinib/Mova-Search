import React, {useState} from "react"

export const Context = React.createContext()

export const Provider = (props)=> { //componente para definição das variaveis globais
    const [data, setData] = useState()
    const [error, setError] = useState()
    const [selected, setSelected] = useState()
    const [border, setBorder] = useState([])

    return (
        <Context.Provider value={{data, setData, error, setError, selected, setSelected, border, setBorder}}>{props.children}</Context.Provider>
    )
}