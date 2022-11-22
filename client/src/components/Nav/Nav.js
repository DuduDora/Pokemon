import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { restaurar } from '../../redux/actions';

export default function Nav() {
    const dispatch = useDispatch();
    const cards = useSelector(state => state.filteredPokemons);

    const handlerClick = () => {
        dispatch(restaurar());
    }
    return (
        <div>
            {/* <Link
                to='/pokemons'
                onClick={handlerClick}
            >Home</Link> */}
            <div>
                <h1>{cards.length} Cards</h1>
            </div>
            <Link to='/'>Back</Link>
        </div>
    )
};