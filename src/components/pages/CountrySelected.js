import React from 'react';
import Header from '../Header'
import { API_BASE } from '../api'
import './Country.css'
import { Link, Redirect } from 'react-router-dom'

import { Context } from '../Provider'

export default function CountrySelected() { // pagina de exibição do país selecionado
    const { selected, setData, setError} = React.useContext(Context)

    async function region(prop) { // função para fazer uma busca pela região do país selecionado
        await fetch(`${API_BASE}${"region/" + prop}`).then(item => {
            item.json().then((r) => {
                return (
                    setData(r), setError('')
                )
            })
        }).catch((error) => {
            return (
                console.log(error), setError(error)
            )
        })

    }

    return (
        selected ? <div>  {/* verificação para saber se existe um país selecionado para exibir. Se existir mostra os dados do país */}
            <Header />
            <div className="country">
                <div className="First-container">
                    <div className="container-img">
                        <img className="img-first-container" src={selected.flag}></img>
                    </div>

                    <div className="container-p">  {/* dados do país selecionado */}
                        <p>Nome: {selected.name}</p>
                        <p>Capital: {selected.capital}</p>
                        <p>Região: <Link to='/' onClick={() => { region(selected.region) }}>{selected.region}</Link></p>
                        <p>Sub-região: {selected.subregion}</p>
                        <p>População: {selected.population}</p>
                        <p>Linguas: {selected.languages[0].nativeName} </p>
                    </div>
                </div>
            </div>
        </div> : <Redirect to="/"></Redirect> /* se o usuario tentar acessar essa pagina sem selecionar um país antes ele será direcionado para a rota raiz */
    )
}