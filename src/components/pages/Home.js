import React from 'react';
import Header from '../Header.js';
import Search from '../Search.js';
import Data from '../Data'
import '../../App.css';
function Home() { // rota raiz '/'

  return (
    <div className="App">
          <Header></Header>
          <Search></Search>
          <Data></Data>
    </div>
  );
}

export default Home;
