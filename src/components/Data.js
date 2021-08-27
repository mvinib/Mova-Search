import React, { useEffect, useState } from 'react'
import './Data.css'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FiAlertTriangle } from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {API_BASE} from '../components/api'
import { Context } from '../components/Provider'

export default () => { // pagina que exibe o resultado da busca

    const data = React.useContext(Context)
    const [message, setMessage] = useState()
     
    //definição das variaveis utilizadas para fazer a paginação dos países
    const itensPerPage = 12
    const [currentPage, setCurrentPage] = useState(0)
    const [pages, setPages] = useState()
    const [startIndex, setStartIndex] = useState(currentPage * itensPerPage)
    const [endIndex, setEndIndex] = useState(startIndex + itensPerPage)
    const [currentItens, setCurrentItens] = useState()
    

    useEffect(() => {
        if (data.data) {
            setPages(Math.ceil(data.data.length / itensPerPage)) // definindo a quantidade de paginas necessárias
            setCurrentItens(data.data.slice(startIndex, endIndex))
        }

    }, [data])

    useEffect(() => {
        setStartIndex(currentPage * itensPerPage)
    }, [currentPage])

    useEffect(() => {
        setEndIndex(startIndex + itensPerPage)
    }, [startIndex])

    useEffect(() => {
        if (data.data) {
            setCurrentItens(data.data.slice(startIndex, endIndex))
        }
    }, [endIndex])

    async function Save(item) { //funcção para setar o país selecionado e os países vizinhos
        data.setSelected(item)
        const allBorders = item.borders
        const a = []
        await allBorders.map(itemm=>{
            fetch(`${API_BASE}name/${itemm}`).then(json => {
                json.json().then((i) => {
                    return (
                        i.status ? null : Array.isArray(i) ? i.map(e => { a.unshift(e) }) : a.unshift(i)
                    )
                })
            })
        })
        data.setBorder(a)
        
        
    }
    return (
        <div>

            {data.error ? /* verificação para o caso de ocorrer algum erro na busca */
                <div className="error">
                    <div>
                        <FiAlertTriangle></FiAlertTriangle>
                        <p> &nbsp; {data.error}</p>
                    </div>
                </div> : null}

            <section className="flex" style={currentItens ? null : {
                alignItems: 'center', justifyContent: 'center'
            }}>
                {currentItens ? currentItens.map(item => { /* exibição dos itens da busca */
                    return (
                        <div className="flex-img">
                            <Link to='/country' onClick={()=>{Save(item)}}> 
                                <img src={item.flag} alt={item.name}></img>
                            </Link>
                        </div>

                    )
                }) :
                    <div className="noData" >
                        <p className="text-noData">{message}</p>
                    </div>}
            </section>
            <div className="pagination">
                <div className="container-button"> {/* exibição condicional dos botôes de paginação. só será exibido se a quantidade de páginas for maior que 1, ou seja, se a quantidade total de itens for maior que 12 */} 
                    {pages > 1 ?
                        <button className="button" onClick={() => currentPage > 0 ? setCurrentPage(currentPage - 1) : setCurrentPage(currentPage)}>
                            <IoIosArrowBack></IoIosArrowBack>
                        </button> : null}

                    {pages > 1 ? Array.from(Array(pages), (item, index) => {
                        return (

                            <button style={index === currentPage ? {
                                backgroundColor: '#6D2080', color: 'white'
                            } : null} className="button" onClick={(e) => setCurrentPage(Number(e.target.value))} value={index}>{index + 1}</button>
                        )
                    }) : <></>}
                    {pages > 1 ?
                        <button className="button" onClick={() => currentPage < pages - 1 ? setCurrentPage(currentPage + 1) : setCurrentPage(currentPage)}>
                            <IoIosArrowForward></IoIosArrowForward>
                        </button> : null}
                </div>
            </div>


        </div>




    )
}