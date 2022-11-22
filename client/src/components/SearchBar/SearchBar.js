import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokeByName } from '../../redux/actions';
import lupita from 'C:/Users/brend/GIT/Henry/CursoHenry/PI/PI 2 2/PI-Pokemon-main/client/src/images/lupita.png';


export default function SearchBar({ setInput, setPag, setSelected }) {
    // const dispatch = useDispatch();
    // const [name, setName] = useState("");
    // const [searchId, setSearchId] = useState("");

    // function nameHandler(e) {
    //     e.preventDefault();
    //     setName(e.target.value.replaceAll(/\s+/g, ''));
    //     setSearchId("");
    // }
    // function idHandler(e) {
    //     e.preventDefault();
    //     setSearchId(e.target.value);
    //     setName("");
    // }

    // function submitHandler(e) {
    //     e.preventDefault();
    //     dispatch(restaurar());

    //     if (!name && !searchId) {
    //         return (`Must add a name or id`);
    //     };
    //     if (name !== '') {
    //         dispatch(getPokeByName(name));
    //         setName('');
    //     };
    //     if (searchId !== '') {
    //         dispatch(getPokeById(searchId));
    //     }
    // };

    // return (
    //     <div>
    //         <form
    //             onSubmit={e => submitHandler(e)}>
    //             <input
    //                 type='text'
    //                 placeholder="Pokemon's name"
    //                 value={name}
    //                 onChange={(e) => nameHandler(e)}
    //             />
    //             <input
    //                 type='number'
    //                 placeholder="Pokemon's id"
    //                 value={searchId}
    //                 onChange={e => idHandler(e)}
    //             />
    //             <button
    //                 type='submit'
    //             >Search</button>
    //         </form>
    //         {/* <div>
    //             <Link
    //                 to='/createPokemon'
    //             >
    //                 Create a Pokemon!</Link>
    //         </div> */}
    //     </div>
    // )
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const inputHandler = (e) => {
        setName(e.target.value);
    };

    const clickHandler = () => {
        if (name !== "") {
            dispatch(getPokeByName(name)).then(info => {
                setInput(1);
                setPag(1);
            });
            setName("");
            setSelected(true);
        }
    };
    const oneKeyDown = (e) => {
        if (e.keyCode === 13) {
            if (name !== "") {
                dispatch(getPokeByName(name)).then(info => {
                    setInput(1);
                    setPag(1);
                });
                setName("");
                setSelected(true);
            }
        }
    };
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={name}
                oneKeyDown={(e) => oneKeyDown(e)}
                onChange={(e) => inputHandler(e)}
            />
            <button
                type="submit"
                onClick={(e) => clickHandler(e)}>
                <img src={lupita} alt="not found" />
            </button>
        </div>
    );
};