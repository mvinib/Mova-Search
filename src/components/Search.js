import React, { useState, useEffect } from 'react';
import './Search.css'
import { API_BASE } from './api';
import { Context } from '../components/Provider'



export default () => { // compontente responsável pela pesquisa

    //definição das variaveis
    const data = React.useContext(Context)
    const [filter, setFilter] = useState([])
    const [capital, setCapital] = useState([])
    const [languages, setLanguage] = useState([])
    const [country, setCountry] = useState([])
    const [code, setCode] = useState([])
    const [region, setRegion] = useState(['Asia', 'Europe', 'Africa', 'Oceania', 'Americas', 'Polar'])
    const [secondSelect, setSecondSelect] = useState('')
    const [filterName, setFilterName] = useState("Selecione um filtro antes")



    useEffect(() => {

        //Ao iniciar a aplicação é feita uma busca na api para pegar todos os dados que serão necessários para o usuário realizar uma busca
        async function getCapital() {
            const capital = []
            const lang = []
            const country = []
            const code = []
            const req = await fetch(`https://restcountries.eu/rest/v2/`)
            const json = await req.json()
            json.map(item => {
                capital.unshift(item.capital)
                lang.unshift({name: item.languages[0].name, codeIso: item.languages[0].iso639_1 })
                country.unshift(item.name)
                code.unshift(item.callingCodes[0])
            })

            setCountry(country)

            function limparValoresVazios(array) {// função para limpar os valores vazios retornados da api e ordenar os valores
                var newarray = array.filter((el) => {
                    return el != ""
                })
                var order = newarray.sort()
                return order
            }


            setCapital(limparValoresVazios(capital))
            setCode(limparValoresVazios(code))


            function limpaValoresRepetidos(array) {// função para limpar valores repetidos
                for (let i in array) {
                    let valorComparado = array[i]
                    let cont = 0         
                    for (let i in array) {
                        if (valorComparado === array[i]) {
                            cont += 1
                            if (cont > 1) {
                                cont--
                                delete array[i]
                            }
                        }
                    }
                }
                return array.sort()
            }
            const languages = limpaValoresRepetidos(lang)
            setLanguage(languages)

        }
        getCapital()


    }, [])




    function update() { // função para capitar qualquer alteração no select de filtro
        var select = document.getElementById('filter')
        var value = select.options[select.selectedIndex].value;
        var name = select.options[select.selectedIndex].text;
        setFilterName(name)
        setFilter(value)
    }

    function SecondSelect() { //função para capitar qualquer alteração no select de filtro
        var select = document.getElementById('second-select')
        var value = select.options[select.selectedIndex].value;
        setSecondSelect(value)

    }

    async function Search() {// função que faz a busca na api e guarda dos valores na variável global 'data'
        const req = await fetch(`${API_BASE}${filter + "/" + secondSelect}`).then(item=>{
            item.json().then((r)=>{return(
                data.setData(r), data.setError('')
            )
                
                
            })
        }).catch((error)=>{return(
            console.log(error), data.setError(error)
        )})
        
        

    }

    function Option(params) { //função responsável pela exibição dinamica do segundo select
        const array = []
        // variaveis para setar um valor no segundo select caso não haja nenhum. Assim o usuario não precisa necessariamente inserir valores nos dois selects para fazer uma busca. por padrão irá ser definido o primeiro valor de cada filtro
        const cap = capital.find(e=> e === secondSelect)
        const reg = region.find(e=> e === secondSelect)
        const lan = languages.find(e=> e.codeIso === secondSelect)
        const call = code.find(e=> e === secondSelect)
        const name = country.find(e=> e === secondSelect)

        switch (params) { // switch para saber qual o valor do filtro e definir o que deve ser exibido no segundo select
            case "capital":
                capital.map(item => {    
                    if (!secondSelect || !cap){// caso o filtro seja capital, será feita a verificação se o segundo select está vazio. caso ele tenha algum valor será verificado se o valor é de alguma capital. caso não seja, o primeiro valor do filtro capital será atribuido ao segundo select
                        setSecondSelect(item)
                    }

                    return (
                        array.unshift(<option  value={item}>{item}</option>)
                    )
                })

                break;
            case "region":
                region.map(item => {
                    if (!secondSelect || !reg){
                        setSecondSelect(item)
                    }

                    return (
                        array.unshift(<option value={item}>{item}</option>)
                    )
                })

                break;
            case "lang":
                languages.map(item => {                    
                    if (!secondSelect || !lan){
                        setSecondSelect(item.codeIso)
                    }

                    return (
                        array.unshift(<option value={item.codeIso}>{item.name}</option>)
                    )
                })

                break;

            case "callingcode":
                code.map(item => {
                    if (!secondSelect|| !call){
                        setSecondSelect(item)
                    }

                    return (
                        array.unshift(<option value={item}>{item}</option>)
                    )
                })

                break;
            case "name":

                country.map(item => {
                    if (!secondSelect|| !name){
                        setSecondSelect(item)
                    }
                    return (
                        array.unshift(<option value={item}>{item}</option>)
                    )
                })

                break;

            default:
                break;
        }
        return array // retorna as options comm base no filtro
    }

    return (
        <div className="Search">
            <div>
                <p>Filtrar por</p> {/* select de filtros */}
                <select id='filter' className="select" onChange={update}>
                    <option value="any" defaultValue >Escolha uma opção</option>
                    <option value="region" defaultValue>Região</option>
                    <option value="name" >País</option>
                    <option value="capital">Capital</option>
                    <option value="lang">Lingua</option>
                    <option value="callingcode">Código de ligação</option>
                </select>
            </div>
            <div>
                <p>{filterName}</p>
                <select className="select" id='second-select' onChange={SecondSelect}>
                    {Option(filter)} {/* chamada da função que irá retornar os options */}
                </select>
            </div>
            <div className="div-button">
                <button value='Pesquisar' style={filter && secondSelect ? null: {cursor:'not-allowed'}} // verificação para mudar o cursor caso alguns dos selects ainda esteja vazio
                disabled= {filter && secondSelect ? false: true} // bloqueio do botão caso algum dos selects ainda esteja vazio
                type="button"
                className="button-search" 
                onClick={Search}>
                    PESQUISAR
                </button>
            </div>
        </div>
    )
}