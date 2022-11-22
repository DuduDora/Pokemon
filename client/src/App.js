import './App.css';
import React from 'react';
import Landing from './vistas/Landing/Landing';
import { Route } from 'react-router-dom';
import Home from './vistas/Home/Home';
// import Details from './vistas/Details';

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Pokemon</h1> */}
      <Route exact path={'/'} component={Landing} />
      <Route exact path={'/home'} component={Home} />
      {/* <Route exact path={'pokemons/:id'} component={Details} */}


    </div>
  );
}

export default App;
