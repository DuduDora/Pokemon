const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const axios = require('axios');
// const { Pokemon, Type } = require('../db');
// const { Sequelize } = require('sequelize');


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const pokemonRouter = require('./pokemons');
const typeRouter = require('./types');


const router = Router();

router.use("/pokemons", pokemonRouter);
router.use("/types", typeRouter);


// // Obtener los pokemones de la api
// const getPokemonsDeApi = async () => {
//     try {
//         // llamamos a los pokemons del api por axios ( con limite de 40)
//         const api = await axios.get(`https://pokeapi.co/api/v2/pokemon?&limit=40`);
//         // console.log(api.data.results);
//         //{
//         //   "name": "bulbasaur",
//         //   "url": "https://pokeapi.co/api/v2/pokemon/1/"
//         // }, (...)
//         // res.status(202).send(api.data.results);
//         // creamos un arreglo donde almacenaremos datos
//         const arrDeDatos = [];
//         // creamos un nuevo llamado al api(me devuelve urls osea data de cada pokemon en un array)
//         const apiPokeUrl = api.data.results.map((pokemon) => pokemon.url);
//         // console.log(apiPokeUrl);
//         // [
//         //     'https://pokeapi.co/api/v2/pokemon/1/',
//         //     'https://pokeapi.co/api/v2/pokemon/2/', (...) ]
//         // res.status(202).send(apiPokeUrl);
//         //llamamos atodas las urls guardadas en apiPokeUrl y llamamos data de cada una de estas
//         // ejemplo:
//         //await axios.all([axiosrequest1, axiosrequest2, axiosrequest3]).then(axios.spread(function(res1, res2, res3) {
//         //   console.log(res1);
//         //   console.log(res2);
//         //   console.log(res3);
//         // }));
//         await axios.all(apiPokeUrl.map((poke) => axios.get(poke))).then((pokemones) => {
//             pokemones.map((p) => arrDeDatos.push({
//                 id: p.data.id,
//                 name: p.data.name,
//                 hp: p.data.stats[0].base_stat,
//                 attack: p.data.stats[1].base_stat,
//                 defense: p.data.stats[2].base_stat,
//                 speed: p.data.stats[5].base_stat,
//                 height: p.data.height,
//                 weight: p.data.weight,
//                 image: p.data.sprites.other["official-artwork"].front_default,
//                 // los types aqui abajo pertenecen al mismo pokemon, no esta detallado en el models Pokemon.js
//                 types: p.data.types.map(t => t.type.name)
//             }));
//         }
//         );
//         // console.log(arrDeDatos);
//         return arrDeDatos;
//     } catch (error) {
//         console.log(error);
//     }
// };
// // console.log(getAllPokemons());

// // obtener los pokemones de nuestra base de datos
// const getPokemonesDeBD = async () => {
//     // hago un llamado al modelo y me traiga todos los pokemones incluyendo su tipo des dela base de datos creada
//     const bd = await Pokemon.findAll({ include: [{ model: Type }] });
//     //estos datos los pasamos a json y entramos a cada uno de los pokemones
//     const bdAJson = bd.map((p) => {
//         // a cada pokemon los volvemos json
//         const pokemonAJson = p.toJSON();
//         // retornamos los pokemones solicitados en json y con su tipo
//         return {
//             ...pokemonAJson,
//             types: pokemonAJson.types.map((type) =>
//                 type.name
//             )
//         }
//     });
//     return bdAJson;
// };
// // console.log(getPokemonesDeBD());

// //Obtenerlos en conjunto
// const getAllPokemons = async () => {
//     try {
//         // primero busca en la base api 
//         const apiPokemon = await getPokemonsDeApi();
//         // Luego en nuestra base de datos por si creamos alguno
//         const BDPokemon = await getPokemonesDeBD();
//         // concatenamos ambos resultados 
//         const suma = [...apiPokemon, ...BDPokemon];
//         return suma;
//     } catch (error) {
//         console.log(error);
//     }

// };
// // console.log(getAllPokemons());

// const getPokemonById = async (idSearch) => {
//     try {
//         // hago llamado en la api para que me traiga el pokemon de acuerdo a su id
//         const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idSearch}`)
//         // entro a la data
//         const pokeFound = api.data;
//         // le digo que es lo que quiero que me traiga de un poke por su id
//         const pokemonPorId = {
//             id: pokeFound.id,
//             name: pokeFound.name,
//             hp: pokeFound.stats[0].base_stat,
//             attack: pokeFound.stats[1].base_stat,
//             defense: pokeFound.stats[2].base_stat,
//             speed: pokeFound.stats[5].base_stat,
//             height: pokeFound.height,
//             weight: pokeFound.weight,
//             image: pokeFound.sprites.other["official-artwork"].front_default,
//             types: pokeFound.types.map(t => t.type.name)
//         }
//         return pokemonPorId;
//     } catch (error) {
//         console.log(error);
//     }
// };
// // console.log(getPokemonById(1));

// const getPokemonByNameApi = async (name) => {
//     try {
//         const api = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
//         if (api) {
//             return {
//                 id: api.data.id,
//                 name: api.data.name,
//                 hp: api.data.stats[0].base_stat,
//                 attack: api.data.stats[1].base_stat,
//                 defense: api.data.stats[2].base_stat,
//                 speed: api.data.stats[5].base_stat,
//                 height: api.data.height,
//                 weight: api.data.weight,
//                 image: api.data.sprites.other["official-artwork"].front_default,
//                 types: api.data.types.map(t => t.type.name)
//             }
//         }
//     } catch (error) {
//         console.log("not found");
//     }
// };

// const getPokemonByNameBD = async (nameSearch) => {
//     try {
//         const pokemonSearch = await Pokemon.findOne({
//             where: Sequelize.where(
//                 Sequelize.fn('lower', Sequelize.col('pokemons.name'),
//                     Sequelize.fn('lower', nameSearch))
//             ),
//             include: {
//                 attributes: ["name"],
//                 model: Type,
//             }
//         });
//         return pokemonSearch;
//     } catch (error) {
//         console.log(error);
//     }
// };
// const getPokeTypesApi = async () => {
//     // try {
//     const api = await axios.get(`https://pokeapi.co/api/v2/type`)
//     api.data.results.forEach((t) => {
//         Type.findOrCreate({
//             where: { name: t.name }
//         })
//     })
//     return await Type.findAll();
//     // } catch (error) {
//     //     console.log(error);
//     // }
// };


// router.get("/pokemons", async (req, res, next) => {

//     try {
//         const { name } = req.query;
//         if (name) {
//             const pokemonName = await getPokemonByNameApi(name);
//             if (pokemonName.error) {
//                 pokemonName = await getPokemonByNameBD(name);

//                 if (!pokemonName) {
//                     return res.status(403).json({ "message": "Pokemon no encontrado" });
//                 }
//             }
//             return res.status(202).json(pokemonName);
//         }
//         const allPokemons = await getAllPokemons();
//         console.log(allPokemons);
//         return res.status(200).json(allPokemons);
//     } catch (error) {
//         console.log(error);
//     }


//     // const { name } = req.query;

//     // if (!name) {
//     //     const allPokemons = await getAllPokemons();
//     //     allPokemons ? res.status(202).json(allPokemons) : console.log(error);
//     // }
//     // else {
//     //     try {
//     //         const pokeByNameApi = await getPokemonByName(name.trim().startsWith(name.toLowerCase()));
//     //         if (pokeByNameApi) {
//     //             return res.status(204).send([pokeByNameApi]);
//     //         };
//     //         const pokeBD = await getPokemonesDeBD();
//     //         const pokeByNameDB = await pokeBD.filter((p) => p.name.trim().toLowerCase() === name.trim().toLowerCase());

//     //         return pokeByNameDB.length ? res.status(206).send(pokeFoundBD) : res.status(403).send("name no existente")
//     //     } catch (error) {
//     //         console.log(error);
//     //     }

//     // }

// });

// router.get("/pokemons/:id", async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         let pokeById = await getPokemonById(id);
//         if (id > 0 && id < 906 || id > 10000 && id < 10250) {

//             res.status(202).json(pokeById);
//         }
//         if (!pokeById && id) {
//             const pokeBD = await getPokemonesDeBD();
//             const pokeFoundBD = pokeBD.filter(p => p.id === id);
//             if (pokeFoundBD.length) return res.status(204).send(pokeFoundBD);
//             else {
//                 return res.status(403).send("id no existente")
//             }
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(401).send("We can not find the ID you are looking for")
//     }
// });



// router.get("/types", async (req, res, next) => {
//     try {
//         const pokeTypes = await getPokeTypesApi();
//         res.status(202).send(pokeTypes);
//     } catch (error) {
//         console.log(error);
//     }
// });


// // router.post("/pokemons", async (req, res, next) => {
// //     const {
// //         name, image, hp, attack, defense, speed, height, weight, types,
// //     } = req.body;
// //     const newPokemon = await Pokemon.create({
// //         name, image, hp, attack, defense, speed, height, weight,
// //     });
// //     let typeDB = await Type.findAll({
// //         where: { name: types },
// //     });
// //     if (!typeDB.length) { // agrego este if para verificar y cargar los types si no están el la DB
// //         await getPokeTypesApi();
// //         typeDB = await Type.findAll({
// //             where: { name: types },
// //         });
// //     }
// //     newPokemon.addType(typeDB);
// //     res.send('Great! You have created a Pokemon!');

// // });
// router.post("/pokemons", async (req, res, next) => {
//     const { name, hp, attack, defense, speed, height, weight, image, types
//     } = req.body;

//     if (!name || !image) {
//         res.send("Debe ingresar todos los datos")
//     };
//     let buscarPokeCreacion = await getPokemonByNameApi(name);
//     if (!buscarPokeCreacion) {
//         buscarPokeCreacion = await getPokemonByNameBD(name);
//     }
//     if (buscarPokeCreacion) {
//         return res.send("Pokemons already exists");
//     }

//     const pokePorCrear = await Pokemon.create({
//         name, hp, attack, defense, speed, height, weight, image
//     });
//     let buscarType = await Type.findAll({
//         where: { name: types },
//     });
//     if (!buscarType.length) {
//         await getPokeTypesApi();
//         buscarType = await Type.findAll({
//             where: { name: types },
//         });
//     }
//     pokePorCrear.addType(buscarType);
//     res.send("Congrats! You pokemon has been created");
// });

module.exports = router;



     //_isAttribute: [Function (anonymous)],
    //   getTypes: [Function (anonymous)],
    //   countTypes: [Function (anonymous)],
    //   hasType: [Function (anonymous)],
    //   hasTypes: [Function (anonymous)],
    //   setTypes: [Function (anonymous)], // para vincularlo como objeto
    //   addType: [Function (anonymous)],
    //   addTypes: [Function (anonymous)],
    //   removeType: [Function (anonymous)],
    //   removeTypes: [Function (anonymous)],
    //   createType: [Function (anonymous)]
