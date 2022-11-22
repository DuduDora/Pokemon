// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getAllPokemon, getTypes, restaurar } from '../../redux/actions';

// export default function Landing() {
//     const dispatch = useDispatch();
//     const allPokemons = useSelector(state => state.allPokemons);
//     // const [loadedPokemons, setLoadedPokemons] = useState(allPokemons.length ? true : false);
//     const [loadedPokemons] = useState(allPokemons.length ? true : false);

//     useEffect(() => {
//         dispatch(restaurar())
//         if (!loadedPokemons) {
//             dispatch(getTypes());
//             dispatch(getAllPokemon());
//         }
//     }, [loadedPokemons, dispatch])

//     return (
//         <div>
//             {
//                 allPokemons.length ?
//                     <div>
//                         <Link to='/pokemons'>
//                             <button>Let's go!</button>
//                         </Link>
//                     </div>
//                     : <h2>Loading ...</h2>
//             }
//         </div>
//     )
// }

import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'C:/Users/brend/GIT/Henry/CursoHenry/PI/PI 2 2/PI-Pokemon-main/client/src/images/logo.png'

// /images/logo.png
export default function Landing() {
    return (
        <div>
            <div>
                <img src={logo} alt='poke logo' />
            </div>
            <div>
                <Link
                    to={'/home'}>
                    <button>Catch them all!</button>
                </Link>
            </div>
        </div>
    )
}