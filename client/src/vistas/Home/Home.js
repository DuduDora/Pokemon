import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
import SearchBar from '../../components/SearchBar/SearchBar';
import { filterByOrigin, filterByType, getAllPokemon, getTypes, ordenAlfabetico, ordenPorAtaque } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card';
import Loading from '../../components/Loading/Loading';
import logo from 'C:/Users/brend/GIT/Henry/CursoHenry/PI/PI 2 2/PI-Pokemon-main/client/src/images/logo.png'

export default function Home() {
    // const dispatch = useDispatch();
    // const allPokemons = useSelector(state => state.allPokemons);
    // const types = useSelector(state => state.types);
    // const loadedPokemons = useState(allPokemons.length ? true : false);

    // const [order, setOrder] = useState('');
    // const [pagActual, setPagActual] = useState(1);
    // const [cantidadPokesPag] = useState(12);

    // const ultimoPoke = pagActual * cantidadPokesPag;
    // const primerPoke = ultimoPoke - cantidadPokesPag;
    // const currentPokes = allPokemons.slice(primerPoke, ultimoPoke);

    // // const paginacion = (numPag) => { setPagActual(numPag) };

    // useEffect(() => {
    //     dispatch(removeDetails());
    //     if (!loadedPokemons) {
    //         dispatch(getAllPokemon());
    //         dispatch(getTypes())
    //     }
    // }, [loadedPokemons, dispatch]);

    // useEffect(() => {
    //     setPagActual(1);
    // }, [allPokemons.length, setPagActual]);

    // function originHandler(e) {
    //     e.preventDefault();
    //     dispatch(filterByOrigin(e.target.value));
    //     setOrder(`filtered by origin: ${e.target.value}`);
    //     e.target.value = 'default';
    // }

    // return (
    //     <div>
    //         <Nav />
    //         <SearchBar />
    //         <form>
    //             <select
    //                 value='default'
    //                 onChange={e => originHandler(e)}>
    //                 <option
    //                     disabled value='default'
    //                 >filter by origin</option>
    //                 <option
    //                     value='all'
    //                 >all</option>
    //                 <option
    //                     value='original'
    //                 >original</option>
    //                 <option
    //                     value='created by user'
    //                 >created by user</option>
    //             </select>
    //             {order.length > 0 && (<span>{order}</span>)}
    //         </form>
    //         <div>
    //             {currentPokes.length ? currentPokes.map(p => {
    //                 return (
    //                     <div
    //                         key={p.id}>
    //                         <Link
    //                             to={`/pokemons/${p.id}`}>
    //                             <Card
    //                                 id={p.id}
    //                                 key={p.id}
    //                                 name={p.name}
    //                                 image={p.image}
    //                                 types={p.types}
    //                             />
    //                         </Link>
    //                     </div>
    //                 )
    //             })
    //                 :
    //                 <div>No pokemons.
    //                 </div>}
    //         </div>
    //         <div>

    //         </div>
    //     </div>
    // )
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.allPokemons);
    const types = useSelector(state => state.types);

    const [pag, setPag] = useState(1);
    const [perPag, setPerPag] = useState(12);
    const [input, setInput] = useState(1);
    const [order, setOrder] = useState("");
    const [selected, setSelected] = useState(false);

    const max = Math.ceil(allPokemons.length / perPag);
    const error = useSelector(state => state.error);

    useEffect(() => {
        dispatch(getAllPokemon());
        dispatch(getTypes());
    }, [dispatch]);

    const allPokesHandler = (e) => {
        e.preventDefault(e);
        dispatch(getAllPokemon());
        setInput(1);
        setPag(1);
        setSelected(true);
    };

    const typeHandler = (e) => {
        e.preventDefault(e);
        dispatch(filterByType(e.target.value));
        setInput(1);
        setPag(1);
    };

    const originHandler = (e) => {
        e.preventDefault(e);
        dispatch(filterByOrigin(e.target.value));
        setInput(1);
        setPag(1);
    };

    const alfOrderHandler = (e) => {
        e.preventDefault(e);
        dispatch(ordenAlfabetico(e.target.value));
        setOrder(`Ordered ${e.target.value}`);
        setInput(1);
        setPag(1);
    };

    const attackOrderHandler = (e) => {
        e.preventDefault(e);
        dispatch(ordenPorAtaque(e.target.value));
        setOrder(`Ordered ${e.target.value}`);
        setInput(1);
        setPag(1);
    };


    return (
        <div>
            <div>
                <div>
                    <img src={logo} alt='poke logo' />
                </div>
            </div>
            <div>
                <ul>
                    <li>
                        <Link
                            to={"/createPokemon"}>
                            <button>Create Pokemon</button>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/"}>
                            <button>Landing Page</button>
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={e => allPokesHandler(e)}>Reset
                        </button>
                    </li>
                    <li>

                        {/* <Nav /> */}
                        <SearchBar
                            setInput={setInput}
                            setPag={setPag}
                            setSelected={setSelected} />
                    </li>
                </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <select
                            defaultValue='title'
                            onChange={(e) => alfOrderHandler(e)}
                        >
                            <option
                                value='title'
                                selected={selected} disabled
                            >Order by : alphabet</option>
                            <option
                                value='asc'> A to Z</option>
                            <option
                                value='desc'>Z to A</option>
                        </select>
                    </li>
                    <li>
                        <select
                            defaultValue='title'
                            onChange={(e) => attackOrderHandler(e)}
                        >
                            <option
                                value='title'
                                selected={selected} disabled
                            >Order by : attack</option>
                            <option
                                value="powerful">Powerful</option>
                            <option
                                value="weak">Weak</option>
                        </select>
                    </li>
                    <li>
                        <select
                            onChange={e => typeHandler(e)}>
                            <option
                                value='title'
                                selected={selected}
                                disabled>Filter by: type</option>
                            <option>all</option>
                            {types?.map((t) => {
                                return (
                                    <option
                                        value={t.name}
                                        key={t.id}>
                                        {t.name}</option>
                                );
                            })}
                        </select>
                    </li>
                    <li>
                        <select
                            onChange={e => originHandler(e)}>
                            <option
                                value='title'
                                selected={selected}
                                disabled>Filter by: existing or created</option>
                            <option
                                value='api'>Existing</option>
                            <option
                                value='created'>Created</option>
                        </select>
                    </li>
                </ul>
            </div>
            {error ? (
                <div>
                    <h2>No match! Try again</h2>
                </div>
            ) : allPokemons.length > 0 ? (
                <div>
                    {allPokemons
                        .slice((pag - 1) * perPag, (pag - 1) * perPag + perPag)
                        .map(p => {
                            return (
                                <Fragment
                                    key={p.id}>
                                    <Card
                                        id={p.id}
                                        image={p.image}
                                        name={p.name}
                                        types={p.types}
                                    />
                                </Fragment>
                            )
                        })}
                </div>
            ) : (
                <div>
                    <Loading />
                </div>
            )}
        </div>
    )


};

