import axios from 'axios';


export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_POKE_BY_NAME = 'GET_POKE_BY_NAME';
// export const GET_POKE_BY_ID = 'GET_POKE_BY_ID';
export const GET_DETAILS = 'GET_DETAILS'
export const REMOVE_DETAILS = 'REMOVE_DETAILS';
// // export const RESTAURAR = 'RESTAURAR';
// export const REMOVE_CARD = 'REMOVE_CARD';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const ORDEN_ALFABETICO = 'ORDEN_ALFABETICO';
export const ORDEN_POR_ATAQUE = 'ORDEN_POR_ATAQUE';
export const CLEAN_POKEMONS = 'CLEAN_POKEMONS';

// get all pokemons del pokemon router
export const getAllPokemon = () => {
    // return async function (dispatch) {
    //     const pokemons = await axios.get('http://localhost:3001/pokemons');
    //     console.log('Action getPokemons (API + DB)--->', pokemons.data)
    //     return dispatch({
    //         type: 'GET_ALL_POKEMON',
    //         payload: pokemons.data
    //     })
    // }
    return async function (dispatch) {
        await axios
            .get('http://localhost:3001/pokemons')
            .then((response) => {
                dispatch({
                    type: GET_ALL_POKEMON,
                    payload: response.data
                })
            });
        console.log('get all pokemons', (await axios.get('http://localhost:3001/pokemons')).data);
    }
};

// get types del type router
export const getTypes = () => {
    return async function (dispatch) {
        const types = await axios.get('http://localhost:3001/types');
        console.log('get types', types.data);
        return dispatch({
            type: GET_TYPES,
            payload: types.data
        })
    }
};

export const postPokemons = (payload) => {
    return async function (dispatch) {
        await axios
            .post('http://localhost:3001/pokemons', payload)
            .then(() => {
                dispatch({
                    type: POST_POKEMON,
                })
            })
            .catch(err => console.log(err));
    }
};

export const getPokeByName = (name) => {
    return async function (dispatch) {
        await axios
            .get(`http://localhost:3001/pokemons?name=${name}`)
            .then((response) => {
                dispatch({
                    type: GET_POKE_BY_NAME,
                    payload: response.data,
                })
            })
            .catch(err => console.log(err))
    }
};

// export const getPokeById = (searchId) => {
//     return async function (dispatch) {
//         const pokeId = await axios.get(`http://localhost:3001/pokemons/${searchId}`);
//         console.log('get poke id', pokeId.data);
//         return dispatch({
//             type: GET_POKE_BY_ID,
//             payload: pokeId.data
//         })
//     }
// };

export const getDetails = (id) => {
    return async function (dispatch) {
        const details = await axios.get(`http://localhost:3001/pokemons/${id}`)
        console.log('get details', details.data);
        return dispatch({
            type: GET_DETAILS,
            payload: details.data
        })
    }
};

export const removeDetails = () => {
    return {
        type: REMOVE_DETAILS,
        payload: null
    }
};

// export const restaurar = () => {
//     return {
//         type: RESTAURAR,
//     }
// };

// export const removeCard = (payload) => {
//     return {
//         type: REMOVE_CARD,
//         payload,
//     }
// };

export const filterByOrigin = (payload) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
};
export const filterByType = (payload) => {
    return {
        type: FILTER_BY_TYPES,
        payload,
    }
};
export const ordenAlfabetico = (payload) => {
    return {
        type: ORDEN_ALFABETICO,
        payload
    }
};
export const ordenPorAtaque = (payload) => {
    return {
        type: ORDEN_ALFABETICO,
        payload
    }
};
export const cleanPokemons = () => {
    return {
        type: CLEAN_POKEMONS,
        payload: []
    }
}











