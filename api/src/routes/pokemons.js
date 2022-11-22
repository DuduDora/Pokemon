const { Router } = require('express');
const { Pokemon, Type } = require('../db');


const {
    getPokemonsDeApi,
    getPokemonesDeBD,
    getAllPokemons,
    getPokemonById,
    getPokemonByNameApi,
    getPokemonByNameBD,
    getPokeTypesApi, } = require('./utils');


const router = Router();

router.get("/", async (req, res, next) => {

    try {
        const { name } = req.query;
        if (name) {
            let pokemonName = await getPokemonByNameApi(name);
            if (pokemonName.error) {
                pokemonName = await getPokemonByNameBD(name);

                if (!pokemonName) {
                    return res.status(403).json({ "message": "Pokemon no encontrado" });
                }
            }
            return res.status(202).json(pokemonName);
        }
        const allPokemons = await getAllPokemons();
        console.log(allPokemons);
        return res.status(200).json(allPokemons);
    } catch (error) {
        console.log(error);
    }


    // const { name } = req.query;

    // if (!name) {
    //     const allPokemons = await getAllPokemons();
    //     allPokemons ? res.status(202).json(allPokemons) : console.log(error);
    // }
    // else {
    //     try {
    //         const pokeByNameApi = await getPokemonByName(name.trim().startsWith(name.toLowerCase()));
    //         if (pokeByNameApi) {
    //             return res.status(204).send([pokeByNameApi]);
    //         };
    //         const pokeBD = await getPokemonesDeBD();
    //         const pokeByNameDB = await pokeBD.filter((p) => p.name.trim().toLowerCase() === name.trim().toLowerCase());

    //         return pokeByNameDB.length ? res.status(206).send(pokeFoundBD) : res.status(403).send("name no existente")
    //     } catch (error) {
    //         console.log(error);
    //     }

    // }

});

router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
        let pokeById = await getPokemonById(id);
        if (id > 0 && id < 906 || id > 10000 && id < 10250) {

            res.status(202).json(pokeById);
        }
        if (!pokeById && id) {
            const pokeBD = await getPokemonesDeBD();
            const pokeFoundBD = pokeBD.filter(p => p.id === id);
            if (pokeFoundBD.length) return res.status(204).send(pokeFoundBD);
            else {
                return res.status(403).send("id no existente")
            }
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("We can not find the ID you are looking for")
    }
});

router.post("/", async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, image, types
    } = req.body;

    if (!name || !image) {
        res.send("Debe ingresar todos los datos")
    };
    let buscarPokeCreacion = await getPokemonByNameApi(name);
    if (!buscarPokeCreacion) {
        buscarPokeCreacion = await getPokemonByNameBD(name);
    }
    if (buscarPokeCreacion) {
        return res.send("Pokemons already exists");
    }

    const pokePorCrear = await Pokemon.create({
        name, hp, attack, defense, speed, height, weight, image
    });
    let buscarType = await Type.findAll({
        where: { name: types },
    });
    if (!buscarType.length) {
        await getPokeTypesApi();
        buscarType = await Type.findAll({
            where: { name: types },
        });
    }
    pokePorCrear.addType(buscarType);
    res.send("Congrats! You pokemon has been created");
});



module.exports = router;