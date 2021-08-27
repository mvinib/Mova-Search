import React from 'react';
import './App.css';
import { Switch, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import CountrySelected from './components/pages/CountrySelected'
import { Provider } from '../src/components/Provider'

function App() {// definição de rotas

  return (
    <Provider>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/country" component={CountrySelected}></Route>
        <Route path='*'><h1>not found</h1></Route> {/* "tratamento" de rotas erradas*/}
      </Switch>
    </Provider>
  );
}

export default App;
