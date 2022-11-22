const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const { Sequelize } = require('sequelize');

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
        const pokeTypes = await getPokeTypesApi();
        res.status(202).send(pokeTypes);
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;