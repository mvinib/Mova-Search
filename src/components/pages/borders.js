import React from 'react';
import {Context} from '../Provider'

export default ()=>{
    const {border, selected} = React.useContext(Context)
    console.log(border)

    while(border.length !==0){
        return <p>cu</p>
    }
    return(
        <>
        <p>{selected.name}</p>
        {border.map(item=>{
            <p>{item.name}</p>
        })}
        </>
    )
}