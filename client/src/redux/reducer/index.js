import { CLEAN_POKEMONS, FILTER_BY_ORIGIN, FILTER_BY_TYPES, GET_ALL_POKEMON, GET_DETAILS, GET_POKE_BY_NAME, GET_TYPES, ORDEN_ALFABETICO, ORDEN_POR_ATAQUE, POST_POKEMON, REMOVE_DETAILS, } from '../actions';

const initialState = {
    allPokemons: [],
    filteredPokemons: [],
    types: [],
    addedPokemons: [],
    details: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMON:
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,

            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload,
            };
        case POST_POKEMON:
            return {
                ...state,
            };
        case GET_POKE_BY_NAME:
            //traemos el estado actual de los pokemones filtrados
            const pokeByName = state.filteredPokemons;
            // Si entramos a cada uno de estos buscando el nombre solicitado  que coincida y que exista, que devuelva que ya existe
            if (pokeByName.filter((p) => p.name === action.payload[0].name).length > 0) {
                console.log('El pokemon ya está en la App')
            }
            // caso contrario que lo meta en el array y siga que ya lo creo
            else {
                pokeByName.push(action.payload[0]);
                console.log('El pokemon se cargó a la App');
            }
            return {
                ...state,
                addedPokemons: action.payload,
            };
        // case GET_POKE_BY_ID:
        //     const pokeById = state.filteredPokemons;
        //     if (pokeById.filter(p => p.name === action.payload[0]).length > 0) {
        //         console.log('El pokemon esta en la App')
        //     }
        //     else {
        //         pokeById.push(action.payload[0]);
        //         console.log('El pokemon se cargó a la App');
        //     }
        //     return {
        //         ...state,
        //         addedPokemons: action.payload,
        //     };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload,
            };
        case REMOVE_DETAILS:
            return {
                ...state,
                details: []
            };
        // case RESTAURAR:
        //     return {
        //         ...state,
        //         allPokemons: state.filteredPokemons,
        //         addedPokemons: [],
        // //     };
        // case REMOVE_CARD:
        //     const estadoPoke = state.filteredPokemons.filter(poke => poke.id !== action.payload)
        //     estadoPoke.length === state.filteredPokemons.length ? alert("Pokemon already deleted") : alert("Pokemon eliminado");
        //     return {
        //         ...state,
        //         filteredPokemons: estadoPoke,
        //         allPokemons: estadoPoke,
        //     };
        case FILTER_BY_ORIGIN:
            const pokesPorOrigen = state.filteredPokemons;
            const filtradosPorOrigen = action.payload === 'created by user' ? pokesPorOrigen.filter(p => p.createdInDB) : pokesPorOrigen.filter(p => !p.createdInDB)

            return {
                ...state,
                allPokemons: action.payload === 'all' ? pokesPorOrigen : filtradosPorOrigen.length ? filtradosPorOrigen : filtradosPorOrigen
            };
        case FILTER_BY_TYPES:
            const pokesPorType = state.filteredPokemons;
            const filtradosPorType = action.payload === 'all' ? pokesPorType : pokesPorType.filter(p => p.types.map(t => t.name).includes(action.payload))

            return {
                ...state,
                allPokemons: filtradosPorType
            };
        case ORDEN_ALFABETICO:
            const pokesPorAlfabeto = state.filteredPokemons;
            const ordenporAlfabeto = action.payload === "ascendente" ? pokesPorAlfabeto.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : pokesPorAlfabeto.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                allPokemons: ordenporAlfabeto,
            };
        case ORDEN_POR_ATAQUE:
            const pokesPorAtaque = state.filteredPokemons;
            const ordenPorAtaque = action.payload === 'powerful' ? pokesPorAtaque.sort((a, z) => {
                if (a.attack > z.attack) {
                    return -1;
                }
                if (z.attack > a.attack) {
                    return 1;
                }
                return 0;
            }) : pokesPorAtaque.sort((a, z) => {
                if (a.attack > z.attack) {
                    return 1;
                }
                if (z.attack > a.attack) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                allPokemons: ordenPorAtaque,
            };
        case CLEAN_POKEMONS:
            return {
                ...state,
                allPokemons: action.payload,
                filteredPokemons: action.payload,
            };
        default:
            return state;
    };
};

export default rootReducer;

