const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { Sequelize } = require('sequelize');

// Obtener los pokemones de la api
const getPokemonsDeApi = async () => {
    try {
        // creamos un arreglo donde almacenaremos datos
        const arrDeDatos = [];
        // llamamos a los pokemons del api por axios ( con limite de 40)
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon?&limit=40`);
        // console.log(api.data.results);
        //{
        //   "name": "bulbasaur",
        //   "url": "https://pokeapi.co/api/v2/pokemon/1/"
        // }, (...)
        // res.status(202).send(api.data.results);

        // creamos un nuevo llamado al api(me devuelve urls osea data de cada pokemon en un array)
        const apiPokeUrl = api.data.results.map((pokemon) => pokemon.url);
        // console.log(apiPokeUrl);
        // [
        //     'https://pokeapi.co/api/v2/pokemon/1/',
        //     'https://pokeapi.co/api/v2/pokemon/2/', (...) ]
        // res.status(202).send(apiPokeUrl);
        //llamamos atodas las urls guardadas en apiPokeUrl y llamamos data de cada una de estas
        // ejemplo:
        //await axios.all([axiosrequest1, axiosrequest2, axiosrequest3]).then(axios.spread(function(res1, res2, res3) {
        //   console.log(res1);
        //   console.log(res2);
        //   console.log(res3);
        // }));
        await axios.all(apiPokeUrl.map((poke) => axios.get(poke))).then((pokemones) => {
            pokemones.map((p) => arrDeDatos.push({
                id: p.data.id,
                name: p.data.name,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                image: p.data.sprites.other["official-artwork"].front_default,
                // los types aqui abajo pertenecen al mismo pokemon, no esta detallado en el models Pokemon.js
                types: p.data.types.map(t => t.type.name)
            }));
        }
        );
        // console.log(arrDeDatos);
        return arrDeDatos;
    } catch (error) {
        console.log(error);
    }
};
// console.log(getAllPokemons());

// obtener los pokemones de nuestra base de datos
// hago un llamado al modelo y me traiga todos los pokemones incluyendo su tipo des dela base de datos creada
//estos datos los pasamos a json y entramos a cada uno de los pokemones
// a cada pokemon los volvemos json
// retornamos los pokemones solicitados en json y con su tipo

// async function getPokemonesDeBD() {
//     try {
//         const pokesDB = await Pokemon.findAll({
//             include: {
//                 attributes: ["name"],
//                 model: Type,
//                 through: {
//                     attributes: [],
//                 },
//             }
//         });
//         return pokesDB
//     } catch (error) {
//         console.log(error);
//     }
// };


const getPokemonesDeBD = async () => {
    const bd = await Pokemon.findAll({
        include: {
            model: Type
        },
    });
    const bdAJson = bd.map((p) => {
        const pokemonAJson = p.toJSON();
        return {
            ...pokemonAJson,
            types: pokemonAJson.types.map((type) =>
                type.name
            ),
        };
    });
    return bdAJson;
};
// console.log(getPokemonesDeBD());

//Obtenerlos en conjunto
// primero busca en la base api 
// Luego en nuestra base de datos por si creamos alguno
// concatenamos ambos resultados 
const getAllPokemons = async () => {
    try {
        const apiPokemon = await getPokemonsDeApi();
        const BDPokemon = await getPokemonesDeBD();
        const suma = [...apiPokemon, ...BDPokemon];
        return suma;
    } catch (error) {
        console.log(error);
    }
};
// console.log(getAllPokemons());

const getPokemonById = async (idSearch) => {
    try {
        // hago llamado en la api para que me traiga el pokemon de acuerdo a su id
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idSearch}`)
        // entro a la data
        const pokeFound = api.data;
        // le digo que es lo que quiero que me traiga de un poke por su id
        const pokemonPorId = {
            id: pokeFound.id,
            name: pokeFound.name,
            hp: pokeFound.stats[0].base_stat,
            attack: pokeFound.stats[1].base_stat,
            defense: pokeFound.stats[2].base_stat,
            speed: pokeFound.stats[5].base_stat,
            height: pokeFound.height,
            weight: pokeFound.weight,
            image: pokeFound.sprites.other["official-artwork"].front_default,
            types: pokeFound.types.map(t => t.type.name)
        }
        return pokemonPorId;
    } catch (error) {
        console.log(error);
    }
};
// console.log(getPokemonById(1));

const getPokemonByNameApi = async (name) => {
    try {
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (api) {
            return {
                id: api.data.id,
                name: api.data.name,
                hp: api.data.stats[0].base_stat,
                attack: api.data.stats[1].base_stat,
                defense: api.data.stats[2].base_stat,
                speed: api.data.stats[5].base_stat,
                height: api.data.height,
                weight: api.data.weight,
                image: api.data.sprites.other["official-artwork"].front_default,
                types: api.data.types.map(t => t.type.name)
            }
        }
    } catch (error) {
        console.log("not found");
    }
};

const getPokemonByNameBD = async (nameSearch) => {
    try {
        const pokemonSearch = await Pokemon.findOne({
            where: Sequelize.where(
                Sequelize.fn('lower', Sequelize.col('pokemons.name'),
                    Sequelize.fn('lower', nameSearch))
            ),
            include: {
                attributes: ["name"],
                model: Type,
            }
        });
        return pokemonSearch;
    } catch (error) {
        console.log(error);
    }
};
const getPokeTypesApi = async () => {
    // try {
    const api = await axios.get(`https://pokeapi.co/api/v2/type`)
    api.data.results.forEach((t) => {
        Type.findOrCreate({
            where: { name: t.name }
        })
    })
    return await Type.findAll();
    // } catch (error) {
    //     console.log(error);
    // }
};

module.exports = {
    getPokemonsDeApi,
    getPokemonesDeBD,
    getAllPokemons,
    getPokemonById,
    getPokemonByNameApi,
    getPokemonByNameBD,
    getPokeTypesApi,
}